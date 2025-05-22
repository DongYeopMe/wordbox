import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Logo from "@image/brand(white).png";
import { NavLink } from "react-router-dom";
function Header({ togglesideBar }) {
  return (
    <>
      <header className="flex flex-row justify-between items-center bg-[#4f46e5] h-[40px]  ">
        <div className="flex h-[40px] items-center pl-5 gap-5">
          <button
            onClick={togglesideBar}
            className="hover:bg-gray-400 cursor-pointer rounded-[7px]"
          >
            <FiAlignJustify size="30" color="white" />
          </button>
          <NavLink key="home" to="/" className="">
            <img src={Logo} alt="logo" width={100} />
          </NavLink>
        </div>
        <div className="bg-gray-400 rounded-[3px] w-96 flex justify-between text-white focus-within:outline focus-within:outline-2 focus-within:outline-[#4338CA] focus-within:bg-[#4f46e5] transition-all duration-200">
          <form className="flex w-full " action="" method="get">
            <input
              className="flex-1 focus:outline-none "
              type="text"
              name=""
              placeholder="검색어를 입력하세요."
            />
            <button className="pl-2 pr-2" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="flex gap-2 text-white">
          <a>로그인</a>
          <div>프로필</div>
        </div>
      </header>
    </>
  );
}
export default Header;
