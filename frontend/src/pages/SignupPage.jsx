import React, { useState } from "react";
import Logo from "@image/brand(white).png";
import { MdOutlinePersonOutline, MdLockOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
/* userid,password,username */
function SignupPage() {
  const [userId, setuserId] = useState();
  const [passWord, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [IsIDValidation, setIDValidation] = useState(false);
  const [IsPWValidation, setPWValidation] = useState(false);
  const [IsUserNameValidation, setuserNameValidation] = useState(false);

  return (
    <div className="h-screen ">
      <header className="flex flex-row justify-between items-center bg-[#4f46e5] h-[40px] ">
        <div className="flex h-[40px] items-center pl-5 gap-5">
          <div></div>
          <NavLink key="home" to="/" className="">
            <img src={Logo} alt="logo" width={100} />
          </NavLink>
        </div>
      </header>
      <div className="h-full flex justify-center items-center">
        <div className="flex flex-col w-[500px] py-10">
          <div className="mx-7">
            <form className="flex flex-col items-center py-10 px-10">
              <h1 className="text-2xl font-bold text-center mb-2 text-[#4f46e5]">
                회원가입
              </h1>
              <div className="w-full">
                <div className="border h-[50px] flex flex-row items-center focus-within:outline focus-within:outline-2 focus-within:bg-gray-100">
                  <div className="w-[40px] h-[30px] flex items-center">
                    <MdOutlinePersonOutline size={30} />
                  </div>
                  <input
                    type="text"
                    id="userid"
                    className="w-full focus:outline-none"
                    value={userId}
                    placeholder="아이디"
                  />
                  <div className="w-[40px] h-[50px]"></div>
                </div>
                <div id="Validation" className="h-[30px]"></div>
              </div>
              <div className="w-full">
                <div className="border-1 h-[50px] flex flex-row items-center focus-within:outline focus-within:outline-2 focus-within:bg-gray-100">
                  <div className="w-[40px] h-[30px] flex items-center">
                    <MdLockOutline size={30} />
                  </div>
                  <input
                    type="text"
                    id="passowrd"
                    className="w-full focus:outline-none"
                    value={passWord}
                    placeholder="비밀번호"
                  />
                  <div className="w-[40px] h-[50px]"></div>
                </div>
              </div>
              <div id="Validation" className="h-[30px]"></div>
              <div className="w-full">
                <div className="w-full border-1 h-[50px] flex flex-row items-center focus-within:outline focus-within:outline-2 focus-within:bg-gray-100">
                  <div className="w-[40px] h-[30px] flex items-center">
                    <MdLockOutline size={30} />
                  </div>
                  <input
                    type="text"
                    id="username"
                    className="w-full focus:outline-none"
                    value={userName}
                    placeholder="유저명"
                  />
                  <div className="w-[40px] h-[50px]"></div>
                </div>
              </div>
              <div id="Validation" className="h-[30px]"></div>
              <div className="w-full flex justify-between">
                <button className="w-1/2 py-2 bg-[#4f46e5] hover:bg-[#4338CA] text-white font-semibold rounded-md transition">
                  확인
                </button>
                <button className="w-1/2 py-2 bg-gray-300  font-semibold rounded-md transition">
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
