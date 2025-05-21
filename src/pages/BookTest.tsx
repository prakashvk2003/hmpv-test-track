
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAvailableTests, bookTestAppointment } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const BookTest = () => {
  const { user } = useAuth();
  const { tests, loading: testsLoading } = useAvailableTests();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedTest, setSelectedTest] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("09:00");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  
  const handleTimeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTest || !date || !address || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const selectedTestObj = tests.find(test => test.id === selectedTest);
      if (!selectedTestObj) {
        throw new Error("Selected test not found");
      }
      
      const dateTimeString = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(time.split(":")[0]),
        parseInt(time.split(":")[1])
      ).toISOString();
      
      const appointment = await bookTestAppointment({
        testId: selectedTest,
        testName: selectedTestObj.name,
        patientId: user?.id || "",
        patientName: user?.name || "",
        patientEmail: user?.email || "",
        dateTime: dateTimeString,
        address,
      });
      
      toast({
        title: "Test booked successfully",
        description: `Your appointment has been scheduled for ${format(new Date(dateTimeString), 'MMMM dd, yyyy')} at ${time}. Tracking ID: ${appointment.trackingId}`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking test:", error);
      toast({
        title: "Error booking test",
        description: "There was a problem booking your test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedTestDetails = () => {
    if (!selectedTest) return null;
    return tests.find(test => test.id === selectedTest);
  };
  
  const selectedTestDetails = getSelectedTestDetails();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Book a Test</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Test Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select a Test</CardTitle>
              <CardDescription>Choose the test you would like to book</CardDescription>
            </CardHeader>
            <CardContent>
              {testsLoading ? (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-medical-blue"></div>
                </div>
              ) : (
                <RadioGroup value={selectedTest} onValueChange={setSelectedTest} className="space-y-4">
                  {tests.map((test) => (
                    <div key={test.id} className="flex items-start space-x-3 border rounded-md p-4 hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={test.id} id={test.id} />
                      <div className="flex-1">
                        <Label htmlFor={test.id} className="text-base font-medium cursor-pointer flex justify-between">
                          <span>{test.name}</span>
                          <span className="text-medical-blue font-semibold">${test.price}</span>
                        </Label>
                        <p className="text-gray-500 mt-1">{test.description}</p>
                        {test.preparationInfo && (
                          <p className="text-sm text-gray-500 mt-2 italic">
                            <span className="font-medium">Preparation: </span>
                            {test.preparationInfo}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>
          
          {selectedTest && (
            <>
              {/* Date and Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Select Date & Time</CardTitle>
                  <CardDescription>Choose when you'd like the test to be conducted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date picker */}
                  <div className="space-y-2">
                    <Label>Appointment Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select appointment date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          disabled={(date) => 
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||  // Disable past dates
                            date > new Date(new Date().setMonth(new Date().getMonth() + 1)) // Disable dates more than a month in the future
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Time picker */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <select
                      id="time"
                      value={time}
                      onChange={handleTimeSelect}
                      className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-medical-blue"
                    >
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              {/* Address and Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Collection Details</CardTitle>
                  <CardDescription>Provide the address for sample collection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Collection Address</Label>
                    <Textarea 
                      id="address"
                      placeholder="Enter full address for sample collection"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Additional Information (optional)</Label>
                    <Textarea 
                      id="additional-info"
                      placeholder="Any specific instructions or health information we should know"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Summary and Submit */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Confirm Booking</CardTitle>
                  <CardDescription>Review your test booking details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Selected Test:</span>
                      <span className="font-medium">{selectedTestDetails?.name}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${selectedTestDetails?.price}</span>
                    </div>
                    
                    {date && (
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Appointment Date:</span>
                        <span className="font-medium">{format(date, "MMMM dd, yyyy")}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Appointment Time:</span>
                      <span className="font-medium">{time}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Collection Address:</span>
                      <span className="font-medium text-right max-w-[60%]">{address}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookTest;
