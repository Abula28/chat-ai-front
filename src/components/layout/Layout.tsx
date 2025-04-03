import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex p-3">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
