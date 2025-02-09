import React, { useState } from 'react';
import "../../styles/addCardmodal.css";
import axios from 'axios';

const AddCardModal =({ isModal, setIsModal,fetchData }) =>{
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
        axios.post(url,data)
        .then((response) => {
        fetchData();
        setIsModal(false);
        })
        .catch((error)=> {
        console.error("새로운 카드 생성 실패",error);
        });
    }
    if (!isModal) return null;

    return (
        <div className="card-modal-overlay">
            <div className="card-modal-content">
                <header className='modal-header'>
                    <h2 className='head'>카드 추가</h2>
                </header>
                <main>
                    <select
                        value={selectedLanguage}
                        className='card-language'
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
                    <button className="card-create-btn" onClick={onClickCreate}>추가</button>
                    <button className="card-cancel-btn" onClick={onClickClose}>취소</button>
                </footer>
            </div>
        </div>
    );
}
export default AddCardModal;