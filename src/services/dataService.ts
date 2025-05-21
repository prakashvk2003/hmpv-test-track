
// Mock data to simulate a backend API
import { useState, useEffect } from 'react';

export type TestStatus = 'pending' | 'sample_collected' | 'processing' | 'completed' | 'cancelled';

export interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  preparationInfo?: string;
}

export interface TestAppointment {
  id: string;
  testId: string;
  testName: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  dateTime: string;
  address: string;
  status: TestStatus;
  assignedTo?: string;
  trackingId: string;
  reportId?: string;
  createdAt: string;
}

export interface Report {
  id: string;
  appointmentId: string;
  patientId: string;
  testId: string;
  testName: string;
  resultSummary: string;
  fileUrl?: string;
  date: string;
}

// Mock available tests
const availableTests: Test[] = [
  {
    id: "test-1",
    name: "HMPV PCR Test",
    description: "Detects Human Metapneumovirus genetic material using PCR technology",
    price: 120,
    preparationInfo: "No special preparation needed. Avoid food and drinks 30 minutes before the test."
  },
  {
    id: "test-2",
    name: "HMPV Antibody Test",
    description: "Detects antibodies against Human Metapneumovirus",
    price: 95,
    preparationInfo: "No special preparation needed."
  },
  {
    id: "test-3",
    name: "Respiratory Pathogen Panel",
    description: "Comprehensive test for multiple respiratory pathogens including HMPV",
    price: 200,
    preparationInfo: "No special preparation needed."
  },
  {
    id: "test-4",
    name: "HMPV Rapid Antigen Test",
    description: "Quick test for HMPV antigens using nasal swab",
    price: 75,
    preparationInfo: "No eating, drinking, or smoking 30 minutes before the test."
  }
];

// Mock test appointments
let testAppointments: TestAppointment[] = [
  {
    id: "app-1",
    testId: "test-1",
    testName: "HMPV PCR Test",
    patientId: "patient-123",
    patientName: "Test Patient",
    patientEmail: "patient@test.com",
    dateTime: "2025-05-25T10:00:00",
    address: "123 Test St, Test City",
    status: "pending",
    trackingId: "HMPV-1001",
    createdAt: "2025-05-20T08:30:00"
  },
  {
    id: "app-2",
    testId: "test-3",
    testName: "Respiratory Pathogen Panel",
    patientId: "patient-123",
    patientName: "Test Patient",
    patientEmail: "patient@test.com",
    dateTime: "2025-05-18T14:00:00",
    address: "123 Test St, Test City",
    status: "completed",
    assignedTo: "Lab Tech 1",
    trackingId: "HMPV-1002",
    reportId: "rep-1",
    createdAt: "2025-05-15T11:20:00"
  }
];

// Mock reports
let reports: Report[] = [
  {
    id: "rep-1",
    appointmentId: "app-2",
    patientId: "patient-123",
    testId: "test-3",
    testName: "Respiratory Pathogen Panel",
    resultSummary: "Negative for HMPV. No respiratory pathogens detected.",
    fileUrl: "/sample-report.pdf",
    date: "2025-05-19T09:15:00"
  }
];

// Utility to persist mock data to localStorage
const persistData = () => {
  localStorage.setItem('testAppointments', JSON.stringify(testAppointments));
  localStorage.setItem('reports', JSON.stringify(reports));
};

// Utility to load mock data from localStorage
const loadData = () => {
  const storedAppointments = localStorage.getItem('testAppointments');
  const storedReports = localStorage.getItem('reports');
  
  if (storedAppointments) {
    testAppointments = JSON.parse(storedAppointments);
  } else {
    persistData();
  }
  
  if (storedReports) {
    reports = JSON.parse(storedReports);
  }
};

// Mock API functions
export const useAvailableTests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTests(availableTests);
      setLoading(false);
    }, 500);
  }, []);
  
  return { tests, loading };
};

export const usePatientAppointments = (patientId: string | null) => {
  const [appointments, setAppointments] = useState<TestAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!patientId) {
      setAppointments([]);
      setLoading(false);
      return;
    }
    
    // Load data first
    loadData();
    
    // Filter appointments for this patient
    setTimeout(() => {
      const patientAppointments = testAppointments.filter(app => app.patientId === patientId);
      setAppointments(patientAppointments);
      setLoading(false);
    }, 500);
  }, [patientId]);
  
  return { appointments, loading };
};

export const useAllAppointments = () => {
  const [appointments, setAppointments] = useState<TestAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load data first
    loadData();
    
    // Return all appointments
    setTimeout(() => {
      setAppointments(testAppointments);
      setLoading(false);
    }, 500);
  }, []);
  
  return { appointments, loading };
};

export const bookTestAppointment = async (appointment: Omit<TestAppointment, 'id' | 'status' | 'trackingId' | 'createdAt'>) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newAppointment: TestAppointment = {
    ...appointment,
    id: `app-${Date.now()}`,
    status: 'pending',
    trackingId: `HMPV-${1000 + testAppointments.length + 1}`,
    createdAt: new Date().toISOString()
  };
  
  testAppointments.push(newAppointment);
  persistData();
  
  return newAppointment;
};

export const updateAppointmentStatus = async (id: string, status: TestStatus, assignedTo?: string) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const appointmentIndex = testAppointments.findIndex(app => app.id === id);
  if (appointmentIndex === -1) {
    throw new Error("Appointment not found");
  }
  
  testAppointments[appointmentIndex] = {
    ...testAppointments[appointmentIndex],
    status,
    ...(assignedTo ? { assignedTo } : {})
  };
  
  persistData();
  
  return testAppointments[appointmentIndex];
};

export const addReport = async (report: Omit<Report, 'id'>) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newReport: Report = {
    ...report,
    id: `rep-${Date.now()}`
  };
  
  reports.push(newReport);
  
  // Update the associated appointment to link to this report
  const appointmentIndex = testAppointments.findIndex(app => app.id === report.appointmentId);
  if (appointmentIndex !== -1) {
    testAppointments[appointmentIndex] = {
      ...testAppointments[appointmentIndex],
      status: 'completed',
      reportId: newReport.id
    };
  }
  
  persistData();
  
  return newReport;
};

export const getPatientReports = async (patientId: string) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return reports.filter(report => report.patientId === patientId);
};

export const getReportById = async (reportId: string) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const report = reports.find(rep => rep.id === reportId);
  if (!report) {
    throw new Error("Report not found");
  }
  
  return report;
};

export const trackTestByOrderNumber = async (trackingId: string) => {
  // Load data first
  loadData();
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const appointment = testAppointments.find(app => app.trackingId === trackingId);
  if (!appointment) {
    throw new Error("Test not found");
  }
  
  return appointment;
};
