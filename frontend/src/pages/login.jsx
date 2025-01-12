import { useState } from "react";
import Logo from "../image/언어나무.png";
import Button from "../components/common/Button";
import "../styles/Login.css";

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
        <div className="container">
            <img src={Logo} width={300} height={300}/>
            <form className="login-input">
                <input className="id-input"
                type="text"
                id="userid"
                value={userId}
                onChange={handleInputId}
                placeholder="아이디"
                />
                <input className="pw-input"
                type="password"
                id="password" 
                value={password}
                onChange={handleInputpw}
                placeholder="비밀번호"/>
                <Button text={"로그인"} type={"text"}name={"login"}
                ></Button>
            </form>
        </div>
    );
}
export default login;