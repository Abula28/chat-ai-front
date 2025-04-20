import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router";
import useUserStore from "../../store/userStore";
import { BiHome, BiLogOut } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TextView } from "../common";
import { useUserCheckInReq } from "../../backend/requests/auth";

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data, setData } = useUserStore();
  const { mutate: userCheckIn } = useUserCheckInReq();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setData(null);
    navigate("/");
  };

  useEffect(() => {
    if (!data) {
      userCheckIn(undefined, {
        onSuccess: (data) => {
          setData(data.user);
        },
      });
    }
  }, [data]);

  if (!data) return <p>Loading...</p>;

  if (data.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-650">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#4B5268] bg-neutral-650">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <nav className="mt-6 space-y-1">
          <Link
            to="/admin/system-prompts"
            className={`block px-6 py-3 text-sm ${
              isActive("system-prompts")
                ? "bg-blue-600 font-medium text-white"
                : "text-[#4B5268] hover:text-[#6B7280]"
            }`}
          >
            System Prompts
          </Link>
          <Link
            to="/admin/sessions"
            className={`block px-6 py-3 text-sm ${
              isActive("sessions")
                ? "bg-blue-600 font-medium text-white"
                : "text-[#4B5268] hover:text-[#6B7280]"
            }`}
          >
            Chat Sessions
          </Link>
          <Link
            to="/admin/messages"
            className={`block px-6 py-3 text-sm ${
              isActive("messages")
                ? "bg-blue-600 font-medium text-white"
                : "text-[#4B5268] hover:text-[#6B7280]"
            }`}
          >
            Messages
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex w-full items-center justify-end px-8 py-3">
          <div
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm font-medium"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <TextView type="display-2" className="text-black">
              {data?.username.charAt(0).toUpperCase()}
            </TextView>

            {dropdownOpen && (
              <div className="absolute right-0 top-full z-[100] flex flex-col gap-2 rounded-md bg-neutral-650 p-2 shadow-md">
                <Link to={"/"} className="flex items-center gap-2">
                  <TextView type="paragraph-small">Home</TextView>
                  <BiHome />
                </Link>
                {data?.role === "admin" && (
                  <Link to={"/admin"} className="flex items-center gap-2">
                    <TextView type="paragraph-small">Admin</TextView>
                    <MdOutlineAdminPanelSettings />
                  </Link>
                )}
                <div className="flex items-center gap-2" onClick={handleLogout}>
                  <TextView type="paragraph-small">Logout</TextView>
                  <BiLogOut />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
