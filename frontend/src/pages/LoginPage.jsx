import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@image/logo(slogan).png";
import Button from "../components/common/Button";
import axios from "axios";
const login = () => {
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅

  const handleLogin = async () => {
    const request = {
      userid: userId,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/member/login",
        request,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 서버에서 JWT를 응답하면 localStorage에 저장
      const accessToken = response.headers["authorization"]; // 헤더에서 JWT 가져오기
      localStorage.setItem("access_token", accessToken);
      navigate("/");
    } catch {
      console.log("다시 요청보내주세요.");
    }
  };

  const handleInputId = (e) => {
    setuserId(e.target.value);
  };
  const handleInputpw = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#f8f9fa] font-[Arial,sans-serif]">
      <img src={Logo} alt="logo" width={200} height={200} />
      <form
        className="w-[370px] p-6 bg-white border border-gray-300 rounded-[10px] shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          className="w-full p-3 my-[8px] border border-gray-300 rounded-[7px] text-[13px] focus:border-black focus:text-[12px]"
          type="text"
          id="userid"
          value={userId}
          onChange={handleInputId}
          placeholder="아이디"
        />
        <input
          className="w-full p-3 my-[8px] border border-gray-300 rounded-[7px] text-[13px] focus:border-black focus:text-[12px]"
          type="password"
          id="password"
          value={password}
          onChange={handleInputpw}
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#4f46e5] text-white text-[17px] font-bold rounded cursor-pointer"
        >
          로그인
        </button>
        <div className="flex justify-between text-[10px] px-15 pt-2">
          <NavLink className="cursor-pointer" to="/sign-up">
            회원가입
          </NavLink>
          <a className="cursor-pointer">비밀번호 찾기</a>
        </div>
      </form>
    </div>
  );
};
export default login;
