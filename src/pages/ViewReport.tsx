
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getReportById } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Download, ArrowLeft } from "lucide-react";

const ViewReport = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const reportData = await getReportById(id);
        setReport(reportData);
      } catch (error) {
        console.error("Error fetching report:", error);
        setError("Failed to load the report. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load the report",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReport();
  }, [id, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleDownload = () => {
    // In a real application, this would download the actual report file
    // For this demo, we'll just show a toast message
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-blue"></div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Report</h2>
              <p className="mb-4">{error || "Report not found"}</p>
              <Button asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-4">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Test Report</h1>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Report Details</CardTitle>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border-b pb-4 mb-6">
            <div className="flex justify-between mb-2">
              <h2 className="text-xl font-semibold text-medical-blue">{report.testName}</h2>
              <span className="text-gray-500">{formatDate(report.date)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Test Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Test Name:</span>
                  <span>{report.testName}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-gray-600">Report Date:</span>
                  <span>{formatDate(report.date)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Result Summary</h3>
            <p className="text-gray-800">{report.resultSummary}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md border border-green-100 flex items-start">
            <FileCheck className="text-green-600 mr-3 h-5 w-5 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Report Verified</h4>
              <p className="text-sm text-green-700">
                This report has been verified by our laboratory professionals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notes & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-1">Test Information</h3>
              <p className="text-gray-600 text-sm">
                Human Metapneumovirus (HMPV) is a respiratory virus that can cause upper and lower respiratory tract infections. 
                Symptoms are similar to the common cold but can progress to more severe conditions in some cases.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-1">Follow-up Recommendations</h3>
              <p className="text-gray-600 text-sm">
                If you have any concerns about your results, we recommend discussing them with your healthcare provider. 
                Your healthcare provider can help interpret the results in the context of your overall health.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-1">Contact Information</h3>
              <p className="text-gray-600 text-sm">
                If you have any questions about this report, please contact our laboratory at: <br />
                <span className="text-medical-blue">lab@hmpvtest.com</span> or call <span className="text-medical-blue">(123) 456-7890</span>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewReport;
