import { useEffect, useState } from "react";
import { PiAddressBook } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { MdHomeFilled, MdEditSquare } from "react-icons/md";
function Aside({ isSidebarOpen }) {
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    let timer;
    if (isSidebarOpen) {
      timer = setTimeout(() => setShowLabels(true), 200);
    } else {
      setShowLabels(false);
    }
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  const navItems = [
    {
      id: "home",
      label: "홈",
      icon: <MdHomeFilled size="30" color="white" />,
      to: "/",
    },
    {
      id: "library",
      label: "라이브러리",
      icon: <PiAddressBook size="30" color="white" />,
      to: "/user/name/library",
    },
    {
      id: "create",
      label: "단어카드",
      icon: <MdEditSquare size="30" color="white" />,
      to: "/create",
    },
  ];
  return (
    <>
      <aside
        className={`h-full left-0 bg-[#4f46e5] transform-all duration-300 ease-in-out
      ${isSidebarOpen ? "w-48" : "w-18"} overflow-hidden`}
      >
        <div className="flex flex-col px-5 py-2 gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className=" rounded-[7px] hover:bg-gray-400"
            >
              <div>
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-[30px] flex justify-center">
                    {item.icon}
                  </div>
                  {(isSidebarOpen || showLabels) && (
                    <span
                      className={`
                        text-white transition-opacity duration-200 whitespace-nowrap
                        ${showLabels ? "opacity-100" : "opacity-0"}
                      `}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Aside;
