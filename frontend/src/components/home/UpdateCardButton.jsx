import "../../styles/UpdateCardButton.css"
import Img from "../../image/설정.png";

const UpdateCardButton = () =>{
    return (
        <button className="update_btn">
        <img
        src={Img}
        alt="설정 아이콘"
        style={{ width: "30px", height: "30px" }}/>
    </button>
    )
}
export default UpdateCardButton;