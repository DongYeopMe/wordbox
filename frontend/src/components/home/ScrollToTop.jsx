import TopButtonImg from "../../image/top-button.png";
import "../../styles/ScrollToTop.css"
export default function ScrollToTop(){
    const handleTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return(
        <>
            <div className="top-btn-container">
                <button
                className="top-btn"
                onClick={handleTop} // 버튼 클릭시 함수 호출
                >
                <img
                src={TopButtonImg}
                alt="탑버튼 아이콘"
                style={{ width: "30px", height: "30px" }}
                />
                </button>
            </div>
        </>
    )
}