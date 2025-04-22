import { FiAlignJustify } from "react-icons/fi";
import { PiAcorn, PiAddressBook } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleAside = () => setIsSidebarOpen(!isSidebarOpen);
  const outside = useRef(null);

  return (
    <div className="h-screen flex flex-col">
      <Header togglesideBar={toggleAside} />
      <div className="flex flex-1 overflow-hidden">
        <Aside
          togglesideBar={toggleAside}
          isSidebarOpen={isSidebarOpen}
          outside={outside}
        />
        <main className="overflow-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
export default Layout;
