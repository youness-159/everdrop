import { Outlet } from "react-router-dom";
import Navbar from "../../features/admin/Navbar";
import Sidebar from "../../features/admin/Sidebar.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/userContextAPI.jsx";
import { isEmptyObject } from "../../utils/helpers.js";

function AdminLayout() {
  const { user } = useContext(UserContext);

  if (user.role !== "admin")
    return <div>You do not have permission to enter admin pages</div>;

  if (isEmptyObject(user)) return <div>You must login with admin account</div>;

  return (
    <div className="grid grid-cols-6 ">
      <Navbar />
      <Sidebar />
      <div className="col-span-5 px-44 relative py-24 overflow-y-scroll h-[90vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
