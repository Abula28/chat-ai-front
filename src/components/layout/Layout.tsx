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
    <div className="flex overflow-hidden p-3">
      <Sidebar />
      <div className="relative flex h-[96vh] w-full flex-col justify-between rounded-2xl bg-slate-950">
        <Header />
        <div className="layer_blur"></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
