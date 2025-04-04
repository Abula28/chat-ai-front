import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
