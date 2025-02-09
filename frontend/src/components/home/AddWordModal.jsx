import axios from "axios";
import { useState } from "react";
import "../../styles/addVocamodal.css";
const AddWordModal = ({isModal, setIsModal, checklist}) => {
    const [item,setItem] = useState("");
    const [mean,setMean] = useState("");
    const [example,setExample] = useState("");
    const [language,setLanguage] = useState("");
    const [titles,setTitles] = useState([]);
    const url = "http://localhost:8080/word/create";

    function onClickClose(){
        setIsModal(false);
    }
    function onClickCreate(){
        const data = {
            item : item,
            mean : mean,
            example : example,
            language : language,
            titles : titles
        };
        axios.post(url,data).then((response) =>{
            setIsModal(false);
        }).catch((error)=>{
            console.error("새로운 카드 생성 실패",error);
        });
    }
    const handleCheckboxChange = (title) => {
        setTitles((prevTitles) =>
            prevTitles.includes(title)
                ? prevTitles.filter((t) => t !== title) // 체크 해제 시 제거
                : [...prevTitles, title] // 체크 시 추가
        );
    };
    if(!isModal) return null;


    return (
        <div className="word-modal-overlay">
            <div className="word-modal-content">
                <header className='modal-header'>
                    <h2 className='head'>단어 추가</h2>
                </header>
                <main>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="word-select"
                    >
                        <option value="">선택</option>
                        <option value="JAPANESE">일본어</option>
                        <option value="ENGLISH">영어</option>
                    </select>
                    <input type="text" placeholder="단어" className="word-input" value={item} onChange={(e)=> setItem(e.target.value)}/>
                    <input type="text" placeholder="뜻" className="mean-input" value={mean} onChange={(e)=> setItem(e.target.value)}/>
                    <input type="text" placeholder="예문" className="example-input" value={example} onChange={(e)=> setItem(e.target.value)}/>
                    <label className="card-title">선택할 카드</label>
                    {checklist.map((card) => (
                        <div key={card.id} className="checkbox-container">
                            <input 
                                type="checkbox"
                                id={card.title}
                                className="check_title"
                                checked={titles.includes(card.title)}
                                onChange={() => handleCheckboxChange(card.title)}
                            />
                            <label htmlFor={card.title}>{card.title}</label>
                        </div>
                    ))}

                </main>
                <footer className='footer'>
                    <button className="word-create-btn" onClick={onClickCreate}>추가</button>
                    <button className="word-cancel-btn" onClick={onClickClose}>취소</button>
                </footer>
            </div>
        </div>
    );
}
export default AddWordModal;