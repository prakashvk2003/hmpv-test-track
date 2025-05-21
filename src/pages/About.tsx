
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">About HMPV Test</h1>
        
        <div className="space-y-8">
          {/* Project Overview */}
          <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="bg-medical-light-blue dark:bg-blue-900/30">
              <CardTitle className="text-xl text-medical-blue dark:text-blue-400">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 dark:text-gray-200">
              <p className="mb-4">
                The Human Metapneumovirus (HMPV) Testing Management System is a comprehensive web application designed to streamline the process of medical test booking, tracking, and result management for both patients and healthcare administrators.
              </p>
              <p>
                Our platform bridges the gap between patients and healthcare providers, offering a seamless experience from test booking to result delivery, all while maintaining the highest standards of data security and patient privacy.
              </p>
            </CardContent>
          </Card>

          {/* Developer Profile */}
          <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="bg-medical-light-green dark:bg-green-900/30">
              <CardTitle className="text-xl text-medical-green dark:text-green-400">Developer Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-8 dark:text-gray-200">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Lead Developer</h3>
                <p className="mb-4">
                  Jane Doe is a full-stack developer specializing in healthcare applications with over 5 years of experience building secure, efficient, and user-friendly medical platforms.
                </p>
                <div className="flex space-x-2">
                  <a href="https://github.com/janedoe" target="_blank" rel="noopener noreferrer" className="text-sm text-medical-blue dark:text-blue-400 hover:underline">GitHub</a>
                  <span>•</span>
                  <a href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer" className="text-sm text-medical-blue dark:text-blue-400 hover:underline">LinkedIn</a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Technical Skills</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>React.js & TailwindCSS</li>
                  <li>Node.js & Express.js</li>
                  <li>MongoDB Database</li>
                  <li>JWT Authentication</li>
                  <li>REST API Design</li>
                  <li>Healthcare Data Security</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Project Objectives */}
          <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="bg-medical-light-blue dark:bg-blue-900/30">
              <CardTitle className="text-xl text-medical-blue dark:text-blue-400">Project Objectives</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 dark:text-gray-200">
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-medical-light-green dark:bg-green-900">
                    <span className="text-medical-green dark:text-green-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-gray-100">Simplify Test Booking</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Enable patients to easily book HMPV tests online, reducing administrative burden and improving access to healthcare.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-medical-light-green dark:bg-green-900">
                    <span className="text-medical-green dark:text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-gray-100">Enhance Test Tracking</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Provide real-time updates on test status, improving transparency and reducing patient anxiety through the testing process.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-medical-light-green dark:bg-green-900">
                    <span className="text-medical-green dark:text-green-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-gray-100">Streamline Result Delivery</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Deliver test results securely and promptly, with options for digital access and download of reports.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-medical-light-green dark:bg-green-900">
                    <span className="text-medical-green dark:text-green-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-gray-100">Optimize Administrative Workflow</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Provide healthcare administrators with tools to efficiently manage test scheduling, sample collection, and result reporting.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="overflow-hidden border dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="bg-medical-light-green dark:bg-green-900/30">
              <CardTitle className="text-xl text-medical-green dark:text-green-400">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 dark:text-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Support</h3>
                  <p className="mb-1">Email: support@hmpvtest.com</p>
                  <p className="mb-1">Phone: +1 (555) 123-4567</p>
                  <p>Hours: Monday-Friday, 9am-5pm EST</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Business Inquiries</h3>
                  <p className="mb-1">Email: info@hmpvtest.com</p>
                  <p className="mb-1">Address: 123 Health Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
