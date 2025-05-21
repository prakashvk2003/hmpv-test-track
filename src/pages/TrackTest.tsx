import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { trackTestByOrderNumber, TestAppointment } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Search, FileCheck } from "lucide-react";

const TrackTest = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState<TestAppointment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  // Extract tracking ID from URL query params if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("id");
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      handleTrack(idFromUrl);
    }
  }, [location]);
  
  const handleTrack = async (id: string = trackingId) => {
    if (!id) {
      toast({
        title: "Input required",
        description: "Please enter a tracking ID",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const testData = await trackTestByOrderNumber(id);
      setTest(testData);
      
      if (!testData) {
        setError("No test found with this tracking ID");
      }
    } catch (error) {
      setError("No test found with this tracking ID");
      console.error("Error tracking test:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
  
  interface StepInfo {
    status: string;
    label: string;
    completed?: boolean;
    active?: boolean;
  }
  
  const getStatusSteps = (): StepInfo[] => {
    const steps = [
      { status: "pending", label: "Appointment Confirmed" },
      { status: "sample_collected", label: "Sample Collected" },
      { status: "processing", label: "Processing in Lab" },
      { status: "completed", label: "Results Ready" }
    ];
    
    if (!test) return steps as StepInfo[];
    
    let currentStepIndex = 0;
    
    if (test.status === "sample_collected") {
      currentStepIndex = 1;
    } else if (test.status === "processing") {
      currentStepIndex = 2;
    } else if (test.status === "completed") {
      currentStepIndex = 3;
    }
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStepIndex,
      active: index === currentStepIndex
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Track Your Test</h1>
      
      <Card className="mb-8 transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle>Enter Tracking Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="tracking-id">Tracking ID</Label>
              <Input
                id="tracking-id"
                placeholder="e.g., HMPV-1001"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-medical-blue focus:border-medical-blue"
              />
            </div>
            <div className="self-end">
              <Button 
                onClick={() => handleTrack()} 
                disabled={isLoading || !trackingId}
                className="w-full sm:w-auto transition-transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Tracking...
                  </span>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track Test
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm animate-fade-in">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
      
      {test && (
        <>
          {/* Test Details */}
          <Card className="mb-8 transition-all duration-300 hover:shadow-md animate-fade-in">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Test Information</CardTitle>
                <StatusBadge status={test.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Test Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">Test Name:</span>
                      <span>{test.testName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">Tracking ID:</span>
                      <span>{test.trackingId}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">Scheduled Date:</span>
                      <span>{formatDate(test.dateTime)}</span>
                    </div>
                    {test.assignedTo && (
                      <div className="flex justify-between border-b pb-1">
                        <span className="text-gray-600">Lab Technician:</span>
                        <span>{test.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Patient Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">Name:</span>
                      <span>{test.patientName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-600">Collection Address:</span>
                      <span className="text-right">{test.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {test.status === "completed" && test.reportId && (
                <div className="mt-6 border-t pt-4 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-green-700">Results are ready!</h3>
                      <p className="text-sm text-gray-600">Your test results are now available.</p>
                    </div>
                    <Button asChild className="transition-transform hover:scale-105 active:scale-95">
                      <Link to={`/reports/${test.reportId}`}>
                        <FileCheck className="h-4 w-4 mr-2" />
                        View Report
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Progress Tracker */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Test Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200"></div>
                
                {/* Progress Steps */}
                <div className="space-y-8">
                  {getStatusSteps().map((step, index) => (
                    <div key={step.status} className="relative flex gap-x-4">
                      <div 
                        className={cn(
                          "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300",
                          step.completed 
                            ? "bg-medical-green border-medical-green" 
                            : "bg-white border-gray-300"
                        )}
                      >
                        {step.completed && (
                          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {step.active && !step.completed && (
                          <div className="h-3 w-3 rounded-full bg-medical-blue animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pt-0.5 pl-9">
                        <h4 className={cn(
                          "font-medium transition-colors duration-200",
                          step.active ? "text-medical-blue" : 
                          step.completed ? "text-medical-green" : "text-gray-500"
                        )}>
                          {step.label}
                        </h4>
                        
                        {step.active && step.status !== "completed" && (
                          <p className="text-sm text-gray-500 mt-1 animate-fade-in">
                            {step.status === "pending" && "Awaiting sample collection"}
                            {step.status === "sample_collected" && "Sample has been collected"}
                            {step.status === "processing" && "Your sample is being analyzed"}
                          </p>
                        )}
                        
                        {step.completed && step.status === "completed" && (
                          <p className="text-sm text-gray-500 mt-1">
                            Your results are ready to view
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default TrackTest;
