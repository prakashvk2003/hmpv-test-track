
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">HMPV Test</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Providing accurate and reliable Human Metapneumovirus testing services to help maintain your health.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-medical-blue dark:hover:text-blue-400 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/track-test" className="text-gray-600 dark:text-gray-300 hover:text-medical-blue dark:hover:text-blue-400 text-sm transition-colors">
                  Track Test
                </Link>
              </li>
              <li>
                <Link to="/book-test" className="text-gray-600 dark:text-gray-300 hover:text-medical-blue dark:hover:text-blue-400 text-sm transition-colors">
                  Book Test
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Contact</h3>
            <address className="not-italic text-sm text-gray-600 dark:text-gray-300">
              <p>123 Medical Avenue</p>
              <p>Health City, HC 12345</p>
              <p className="mt-2">Email: contact@hmpvtest.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Hours</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 8:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} HMPV Test Labs. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
