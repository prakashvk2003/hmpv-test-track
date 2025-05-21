
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth token on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // This would be a real API call in a production app
          // For demo purposes, we're simulating a successful auth check
          setTimeout(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setError("Authentication check failed");
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function - in a real app this would call your backend API
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users for demo purposes
      if (email === "admin@test.com" && password === "password") {
        const adminUser = {
          id: "admin-123",
          name: "Admin User",
          email: "admin@test.com",
          role: "admin" as const
        };
        
        localStorage.setItem("authToken", "mock-jwt-token");
        localStorage.setItem("user", JSON.stringify(adminUser));
        setUser(adminUser);
      } else if (email === "patient@test.com" && password === "password") {
        const patientUser = {
          id: "patient-123",
          name: "Test Patient",
          email: "patient@test.com",
          role: "patient" as const
        };
        
        localStorage.setItem("authToken", "mock-jwt-token");
        localStorage.setItem("user", JSON.stringify(patientUser));
        setUser(patientUser);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app this would call your API to register the user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "patient" as const
      };
      
      localStorage.setItem("authToken", "mock-jwt-token");
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
