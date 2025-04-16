import { FiAlignJustify } from "react-icons/fi";
import { PiAcorn, PiAddressBook } from "react-icons/pi";
import { NavLink } from "react-router-dom";
function Aside({ isSidebarOpen, outside, togglesideBar }) {
  const navItems = [
    { id: "home", label: "홈", icon: <PiAddressBook size="30" />, to: "/" },
    {
      id: "library",
      label: "라이브러리",
      icon: <PiAddressBook size="30" />,
      to: "/library",
    },
    {
      id: "create",
      label: "단어카드",
      icon: <PiAddressBook size="30" />,
      to: "/create",
    },
  ];
  return (
    <>
      <aside className="h-full w-15 bg-[#4f46e5]">
        <div className="flex flex-col ">
          {navItems.map((item) => (
            <NavLink key={item.id} to={item.to} className=" hover:bg-gray-400">
              {item.icon}
            </NavLink>
          ))}
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className={`
      fixed top-0 left-0 w-64 h-full bg-indigo-500 z-50
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      transform transition-transform duration-300 ease-in-out`}
          ref={outside}
        >
          <header className="flex flex-row items-center- h-[40px] gap-5">
            <button onClick={togglesideBar} className="hover:bg-gray-400">
              <FiAlignJustify size="30" />
            </button>
            <NavLink key="home" to="/" className=" hover:bg-gray-400">
              <PiAcorn size="30" />
            </NavLink>
          </header>
          <aside>
            <div className="flex flex-col ">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className=" hover:bg-gray-400"
                >
                  <div className="flex flex-row">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Aside;
