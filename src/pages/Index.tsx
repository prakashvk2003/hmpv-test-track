
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Search, 
  FileCheck, 
  Clock, 
  Home, 
  Shield 
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-light-blue to-medical-light-green py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-medical-blue mb-6">
              Fast and Reliable HMPV Testing
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Get tested for Human Metapneumovirus with our convenient at-home sample collection service. Fast results, professional analysis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/book-test">Book a Test</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/track-test">Track Your Test</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-medical-light-blue rounded-full w-12 h-12 flex items-center justify-center">
                <Calendar className="text-medical-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Your Test</h3>
              <p className="text-gray-600">
                Select your preferred test and schedule a convenient time for sample collection from your home.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-medical-light-green rounded-full w-12 h-12 flex items-center justify-center">
                <Home className="text-medical-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Collection</h3>
              <p className="text-gray-600">
                Our trained lab assistant will visit your home to collect the sample safely and professionally.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4 bg-medical-light-blue rounded-full w-12 h-12 flex items-center justify-center">
                <FileCheck className="text-medical-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive your test results securely online, typically within 24-48 hours after sample collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-medical-light-blue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
                <Clock className="text-medical-blue h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Turnaround Time</h3>
                <p className="text-gray-600">
                  Get your results within 24-48 hours after sample collection, allowing for quick medical decisions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-medical-light-blue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
                <Home className="text-medical-blue h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">At-Home Collection</h3>
                <p className="text-gray-600">
                  No need to visit a clinic or lab. Our professionals come to your home for sample collection.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-medical-light-blue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
                <Shield className="text-medical-blue h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Accurate Results</h3>
                <p className="text-gray-600">
                  All tests are processed in our certified laboratory using state-of-the-art equipment.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-medical-light-blue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center mt-1">
                <Search className="text-medical-blue h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Test Tracking</h3>
                <p className="text-gray-600">
                  Track your test status at any time using our online portal or SMS updates.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What is Human Metapneumovirus (HMPV)?</h3>
              <p className="text-gray-600">
                Human Metapneumovirus (HMPV) is a respiratory virus that can cause upper and lower respiratory tract infections. Symptoms are similar to the common cold but can progress to more severe conditions in some cases.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Who should get tested for HMPV?</h3>
              <p className="text-gray-600">
                Testing is recommended for individuals experiencing respiratory symptoms, especially those at higher risk for complications, such as young children, older adults, and people with weakened immune systems.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How is the sample collected?</h3>
              <p className="text-gray-600">
                Sample collection is done via a nasal swab or throat swab. Our trained lab assistant will perform this procedure at your home, ensuring proper collection technique.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long does it take to get results?</h3>
              <p className="text-gray-600">
                Most test results are available within 24-48 hours after the sample reaches our laboratory. You'll be notified via email when your results are ready.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-medical-blue to-medical-green text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Tested?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Book your HMPV test today and take a step toward better health and peace of mind.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/book-test">Book a Test Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
