import { useState } from "react";
import Logo from "../image/logotest.png";
import Button from "../components/common/Button";

const login = () =>{
    const [userId,setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [loginCheck,setLoginCheck] = useState(false);

    const handleInputId = e =>{
        setuserId(e.target.value);
    }
    const handleInputpw = e =>{
        setPassword(e.target.vlaue);
    }
    const pwdRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,12}$/;

    const pwdresult = pwdRegEx.test(password);

    const goToSignUp = () =>{
        navigator('/signup');
    }

    return (
        <div className="login-container">
            <img src={Logo} width={300} height={300}/>
            <form className="login-input">
                <label htmlFor="userId">아이디</label>
                <input className="id-input"
                type="text"
                id="userid"
                value={userId}
                onChange={handleInputId}
                />

                <label htmlFor="password">비밀번호</label>
                <input className="pw-input"
                type="password"
                id="password" 
                value={password}
                onChange={handleInputpw}/>
                <p> 입력됏어 : !{userId}!</p>
                <p> 입력됏어 : !{password}!</p>
                <Button text={"로그인"} type="submit" className="login_btn"/>
            </form>
        </div>
    );
}
export default login;