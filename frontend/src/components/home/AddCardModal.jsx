import React, { useState } from 'react';
import "../../styles/modal.css";
import axios from 'axios';

const AddCardModal =({ isModal, setIsModal }) =>{
    const [selectedLanguage,setSelectedLanguage] = useState("");
    const [title,setTitle] = useState("");
    const url = "http://localhost:8080/card/create";

    
    
    function onClickClose() {
        setIsModal(false);
    }

    function onClickCreate() {
        const data = {
        language : selectedLanguage,
        title : title
    };
    console.log("📌 생성 요청 데이터:", data); // ✅ 디버깅용 로그

        axios.post(url,data)
        .then((response) => {
        console.log("요청 성공!!",response.data);
        setIsModal(false);
        })
        .catch((error)=> {
        console.error("새로운 카드 생성 실패",error);
        });
    }
    if (!isModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <header className='modal-header'>
                    <h2 className='head'>카드 추가</h2>
                </header>
                <main>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        <option value="">선택</option>
                        <option value="JAPANESE">일본어</option>
                        <option value="ENGLISH">영어</option>
                    </select>
                    <input 
                    type="text" 
                    placeholder="새로운 카드 추가" 
                    className="modal-input" 
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </main>
                <footer className='footer'>
                    <button className="create-btn" onClick={onClickCreate}>추가</button>
                    <button className="cancel-btn" onClick={onClickClose}>취소</button>
                </footer>
            </div>
        </div>
    );
}
export default AddCardModal;