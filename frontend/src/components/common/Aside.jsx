import { FiAlignJustify } from "react-icons/fi";
import { PiAddressBook } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { MdHomeFilled, MdEditSquare } from "react-icons/md";
import Logo from "@image/brand(white).png";
function Aside({ isSidebarOpen, outside, togglesideBar }) {
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
      to: "/library",
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
      <aside className="h-full w-18 bg-[#4f46e5]">
        <div className="flex flex-col items-center px-5 py-2 gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className=" rounded-[7px] hover:bg-gray-400"
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className={`
      fixed top-0 left-0 w-48 h-full bg-[#4f46e5] z-50
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      transform transition-transform duration-300 ease-in-out`}
          ref={outside}
        >
          <header className="flex flex-row items-center h-[40px] pl-5 gap-5 ">
            <button
              onClick={togglesideBar}
              className="hover:bg-gray-400 cursor-pointer rounded-[7px]"
            >
              <FiAlignJustify size="30" color="white" />
            </button>
            <NavLink key="home" to="/" className="">
              <img src={Logo} alt="logo" width={100} />
            </NavLink>
          </header>
          <aside>
            <div className="flex flex-col px-5 py-2 gap-2 ">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className=" hover:bg-gray-400 rounded-[7px]"
                >
                  <div className="">
                    <div className="flex flex-row gap-3 items-center">
                      {item.icon}
                      <span className="text-white">{item.label}</span>
                    </div>
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
