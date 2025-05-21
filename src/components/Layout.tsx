
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const Layout = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="hmpv-ui-theme">
      <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow animate-fade-in">
          <div className="transition-all duration-300 ease-in-out">
            <Outlet />
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
