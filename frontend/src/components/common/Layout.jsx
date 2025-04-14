import { FiAlignJustify } from "react-icons/fi";
import { PiAcorn, PiAddressBook } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleAside = () => setIsSidebarOpen(!isSidebarOpen);
  const outside = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        isSidebarOpen &&
        outside.current &&
        !outside.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutSide);

    return () => {
      window.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Header togglesideBar={toggleAside} />
      <Aside
        togglesideBar={toggleAside}
        isSidebarOpen={isSidebarOpen}
        outside={outside}
      />
    </>
  );
};
export default Layout;
