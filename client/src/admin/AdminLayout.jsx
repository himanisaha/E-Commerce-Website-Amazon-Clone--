import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
