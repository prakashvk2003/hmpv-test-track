
import React from "react";
import { TestStatus } from "@/services/dataService";

interface StatusBadgeProps {
  status: TestStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "sample_collected":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "processing":
        return "bg-purple-100 text-purple-800 border border-purple-200 animate-pulse";
      case "completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "pending":
        return "Pending";
      case "sample_collected":
        return "Sample Collected";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 ${getStatusStyles()}`}>
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
