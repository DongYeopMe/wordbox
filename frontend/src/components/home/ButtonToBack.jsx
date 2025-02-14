import {useNavigate} from 'react-router-dom';
import "../../styles/ButtonToBack.css"
import BackButtonImg from "../../image/back-button.png";
const ButtonToBack = () =>{
    const navigate = useNavigate();
    const handleBack = () => {
    navigate(-1);
    };
    return(
        <button 
     className="back-btn" onClick={handleBack}>
        <img
        src={BackButtonImg}
        alt="뒤로가기 아이콘"
        style={{ width: "30px", height: "30px" }}/>
    </button>
    )
}
export default ButtonToBack;