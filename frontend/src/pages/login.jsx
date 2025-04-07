import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../image/언어나무.png";
import Button from "../components/common/Button";
import "../styles/Login.css";
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
      console.log(accessToken);
      localStorage.setItem("access_token", accessToken);
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
        className="w-[360px] p-5 bg-white border border-gray-300 rounded-[10px] shadow-[0_5px_6px_rgba(0,0,0,0.1)]"
        onSubmit={handleLogin}
      >
        <input
          className="w-full p-3 my-[10px] border border-gray-300 rounded-[7px] text-[13px] focus:outline-none focus:placeholder:text-[12px] focus:placeholder:font-[Arial,sans-serif]"
          type="text"
          id="userid"
          value={userId}
          onChange={handleInputId}
          placeholder="아이디"
        />
        <input
          className="w-full p-3 mb-[10px] border border-gray-300 rounded-[7px] text-[13px] focus:outline-none focus:placeholder:text-[12px] focus:placeholder:font-[Arial,sans-serif]"
          type="password"
          id="password"
          value={password}
          onChange={handleInputpw}
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-[#bdfcc9] text-white text-[16px] font-bold rounded cursor-pointer"
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default login;
