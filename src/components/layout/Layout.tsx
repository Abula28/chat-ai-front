import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { useUserCheckInReq } from "../../backend/requests/auth";
import useUserStore from "../../store/userStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, setData } = useUserStore();
  const { mutate: userCheckIn } = useUserCheckInReq();

  useEffect(() => {
    if (!data) {
      userCheckIn(undefined, {
        onSuccess: (data) => {
          setData(data.user);
        },
      });
    }
  }, [data]);

  return (
    <div className="flex h-screen w-screen overflow-hidden p-2 sm:p-3">
      <Sidebar />
      <div className="relative flex h-[calc(100vh-1rem)] w-full flex-col justify-between rounded-2xl bg-slate-950 sm:h-[96vh]">
        <Header />
        <div className="layer_blur"></div>
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
