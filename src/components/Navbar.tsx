
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-medical-blue dark:text-blue-400 font-bold text-xl">HMPV</span>
            <span className="text-medical-green dark:text-green-400 ml-1 font-bold text-xl">Test</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/track-test" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
            Track Test
          </Link>
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
                Dashboard
              </Link>
              <Link to="/book-test" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
                Book Test
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
              Admin Dashboard
            </Link>
          )}
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-medical-blue dark:hover:text-blue-400 transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline text-sm text-gray-600 dark:text-gray-400">
                Hello, {user?.name}
              </span>
              <Button variant="outline" onClick={handleLogout} className="dark:text-gray-200 dark:hover:text-white dark:border-gray-600">
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild className="dark:text-gray-200 dark:hover:text-white dark:border-gray-600">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
