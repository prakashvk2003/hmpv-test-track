
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePatientAppointments } from "@/services/dataService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Clock, FileCheck, Plus } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { appointments, loading } = usePatientAppointments(user?.id || null);

  const upcomingAppointments = appointments.filter(app => app.status === "pending");
  const completedAppointments = appointments.filter(app => app.status === "completed");
  const inProgressAppointments = appointments.filter(
    app => app.status === "sample_collected" || app.status === "processing"
  );

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/book-test">
              <Plus className="h-4 w-4 mr-2" />
              Book New Test
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-blue"></div>
        </div>
      ) : (
        <>
          {/* Quick Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Tests</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressAppointments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
                <FileCheck className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedAppointments.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tests */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tests</h2>
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">No upcoming tests scheduled.</p>
                  <div className="mt-4 flex justify-center">
                    <Button asChild variant="outline">
                      <Link to="/book-test">Book a Test</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{appointment.testName}</CardTitle>
                        <StatusBadge status={appointment.status} />
                      </div>
                      <CardDescription>Tracking ID: {appointment.trackingId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(appointment.dateTime)}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Address:</span> {appointment.address}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Link to={`/track-test?id=${appointment.trackingId}`} className="text-medical-blue hover:underline text-sm">
                        Track this test
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* In Progress Tests */}
          {inProgressAppointments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Tests in Progress</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inProgressAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{appointment.testName}</CardTitle>
                        <StatusBadge status={appointment.status} />
                      </div>
                      <CardDescription>Tracking ID: {appointment.trackingId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(appointment.dateTime)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Link to={`/track-test?id=${appointment.trackingId}`} className="text-medical-blue hover:underline text-sm">
                        Track this test
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tests */}
          {completedAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed Tests</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {completedAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{appointment.testName}</CardTitle>
                        <StatusBadge status={appointment.status} />
                      </div>
                      <CardDescription>Tracking ID: {appointment.trackingId}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(appointment.dateTime)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <Link to={`/reports/${appointment.reportId}`} className="text-medical-blue hover:underline text-sm">
                        View Report
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
