"use client";
import { DashboardAnalytics } from "./components/DashboardAnalytics";
import { PaymentHistory } from "./components/PaymentHistory";
import { PostManagement } from "./components/PostManagement";
import { UserManagement } from "./components/UseManagement";

function AdminDashboard() {
  return (
    <div className="flex min-h-screen mt-16 ">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main content */}
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Analytics Section */}
        <DashboardAnalytics />

        {/* Manage Users */}
        <UserManagement />

        {/* Manage Posts */}
        <PostManagement />

        {/* Payment History */}
        <PaymentHistory />
      </div>
    </div>
  );
}

export default AdminDashboard;
