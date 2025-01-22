import Button from "../components/common/Button";
import "../styles/addVoca.css"

const EditVoca = () => {
    return (
        <div className="container">
            <div className="header">
                <span>단어 수정</span>
            </div>
            <div className="body">
                <form className="Fill_detail"action="">
                    <p>
                        <label>언어</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label>단어</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label>뜻</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label>예문</label>
                        <input type="text"/>
                    </p>
                    <p>
                        <label>카드</label>
                        <input type="text"/>
                    </p>
                </form>
                <Button text={"수정"} type={"text"}name={"editWord"}
                ></Button>
                <Button text={"취소"} type={"text"}name={"cancel"}
                ></Button>
            </div>
        </div>
    )
}
export default EditVoca; 