
import React, { useState } from "react";
import { useAllAppointments, updateAppointmentStatus, TestStatus, addReport } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, FileCheck, Filter, Plus } from "lucide-react";

const AdminDashboard = () => {
  const { appointments, loading } = useAllAppointments();
  const { toast } = useToast();
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [newStatus, setNewStatus] = useState<TestStatus>("sample_collected");
  
  const [isUploadReportOpen, setIsUploadReportOpen] = useState(false);
  const [reportData, setReportData] = useState({
    resultSummary: "",
    isUploading: false
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  const pendingAppointments = appointments.filter(app => app.status === "pending");
  const inProgressAppointments = appointments.filter(
    app => app.status === "sample_collected" || app.status === "processing"
  );
  const completedAppointments = appointments.filter(app => app.status === "completed");
  
  const filteredAppointments = statusFilter === "all" 
    ? appointments 
    : appointments.filter(app => app.status === statusFilter);
  
  const handleUpdateStatus = async () => {
    if (!selectedAppointment) return;
    
    try {
      setUpdatingStatus(true);
      await updateAppointmentStatus(selectedAppointment.id, newStatus, assignedTo || undefined);
      
      toast({
        title: "Status updated",
        description: `Test status has been updated to ${newStatus.replace("_", " ")}.`,
      });
      
      // Reset form
      setSelectedAppointment(null);
      setAssignedTo("");
      setNewStatus("sample_collected");
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update test status.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  const handleUploadReport = async () => {
    if (!selectedAppointment) return;
    
    try {
      setReportData(prev => ({ ...prev, isUploading: true }));
      
      await addReport({
        appointmentId: selectedAppointment.id,
        patientId: selectedAppointment.patientId,
        testId: selectedAppointment.testId,
        testName: selectedAppointment.testName,
        resultSummary: reportData.resultSummary,
        date: new Date().toISOString()
      });
      
      toast({
        title: "Report uploaded",
        description: "The test report has been uploaded successfully.",
      });
      
      // Reset form and close dialog
      setReportData({
        resultSummary: "",
        isUploading: false
      });
      setIsUploadReportOpen(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error uploading report:", error);
      toast({
        title: "Error",
        description: "Failed to upload test report.",
        variant: "destructive",
      });
      setReportData(prev => ({ ...prev, isUploading: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAppointments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressAppointments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments.length}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Appointments Tab View */}
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sample_collected">Sample Collected</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all">
          {renderAppointmentsTable(filteredAppointments)}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderAppointmentsTable(pendingAppointments)}
        </TabsContent>
        
        <TabsContent value="in-progress">
          {renderAppointmentsTable(inProgressAppointments)}
        </TabsContent>
        
        <TabsContent value="completed">
          {renderAppointmentsTable(completedAppointments)}
        </TabsContent>
      </Tabs>
      
      {/* Status Update Dialog */}
      <Dialog open={!!selectedAppointment && !isUploadReportOpen} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Test Status</DialogTitle>
            <DialogDescription>
              Update the status of the selected test.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Test ID:</span>
                <span>{selectedAppointment.trackingId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Patient:</span>
                <span>{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Test Type:</span>
                <span>{selectedAppointment.testName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Current Status:</span>
                <StatusBadge status={selectedAppointment.status} />
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="new-status">New Status</Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as TestStatus)}>
                  <SelectTrigger id="new-status">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sample_collected">Sample Collected</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Input
                  id="assigned-to"
                  placeholder="Lab technician name"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={updatingStatus}>
              {updatingStatus ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Upload Report Dialog */}
      <Dialog open={isUploadReportOpen} onOpenChange={(open) => !open && setIsUploadReportOpen(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Test Report</DialogTitle>
            <DialogDescription>
              Upload the results for this test.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Test ID:</span>
                <span>{selectedAppointment.trackingId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Patient:</span>
                <span>{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Test Type:</span>
                <span>{selectedAppointment.testName}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="result-summary">Result Summary</Label>
                <Textarea
                  id="result-summary"
                  placeholder="Enter the test results summary"
                  value={reportData.resultSummary}
                  onChange={(e) => setReportData(prev => ({ ...prev, resultSummary: e.target.value }))}
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-file">Upload Report File (Optional)</Label>
                <Input id="report-file" type="file" />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, JPG, PNG (Max size: 5MB)
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsUploadReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadReport} disabled={reportData.isUploading || !reportData.resultSummary}>
              {reportData.isUploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Complete Test & Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
  
  function renderAppointmentsTable(appointmentsList: any[]) {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-blue"></div>
        </div>
      );
    }
    
    if (appointmentsList.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Test</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointmentsList.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {appointment.trackingId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {appointment.testName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(appointment.dateTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={appointment.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {appointment.status !== "completed" && appointment.status !== "cancelled" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsUploadReportOpen(false);
                        }}
                      >
                        Update Status
                      </Button>
                    )}
                    
                    {(appointment.status === "processing" || appointment.status === "sample_collected") && (
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsUploadReportOpen(true);
                        }}
                      >
                        <FileCheck className="h-4 w-4 mr-2" />
                        Upload Report
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AdminDashboard;
