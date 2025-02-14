import axios from "axios";
import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import "../../styles/UpdateWordModal.css";

const UpdateWordModal = ({isModal,setIsModal,word,cardtitles,refreshWordList}) =>{
    const [item,setItem] = useState(word.item);
    const [mean,setMean] = useState(word.mean);
    const [example,setExample] = useState(word.example);
    const [language,setLanguage] = useState(word.language);
    const [titles,setTitles] = useState(word.titles);
    const [allcardtitles,setallcardtitles] = useState(cardtitles);
    const editurl = "http://localhost:8080/word/edit";
    const deleteurl = "http://localhost:8080/word/delete";
    function onClickClose(){
        setIsModal(false);
    }
    function onClickUpdate(){
        try{
            const request = {
            item : item,
            mean : mean,
            example : example,
            language : language,
            titles : titles
            };
            axios.patch(editurl,request,{
            params : {wordId : word.id}
        })
        .then((response) =>{
            setIsModal(false);
            refreshWordList();
        })
            
        } catch(error){
            console.error("단어 수정하기 실패",error)
        }
    }

    const handleCheckboxChange = (title) => {
        setTitles((prevTitles) =>
            prevTitles.includes(title)
                ? prevTitles.filter((t) => t !== title) // 체크 해제 시 제거
                : [...prevTitles, title] // 체크 시 추가
        );
    };
    const handledelete = (word) =>{
        if (window.confirm("삭제 하시겠습니까??")) {
            try{
                axios.delete(deleteurl,{params : {wordId : word.id}})
            .then((response) =>{
                setIsModal(false);
                refreshWordList();
            })
            } catch(error){
                console.error("단어 삭제 실패",error);
            }
        }
    }

    return (
        <div className="word-modal-overlay">
            <div className="word-modal-content">
                <header className="modal-header">
                    <h2 className="head">단어 수정</h2>
                    <button className="delete_btn" onClick={()=>handledelete(word)}>삭제</button>
                </header>
                <main>
                    <select className="word-select" value={language} disabled>
                        <option value="">선택</option>
                        <option value="JAPANESE">일본어</option>
                        <option value="ENGLISH">영어</option>
                    </select>
                    <input type="text" placeholder="단어" className="word-input" value={item} onChange={(e)=> setItem(e.target.value)}/>
                    <input type="text" placeholder="뜻" className="mean-input" value={mean} onChange={(e)=> setMean(e.target.value)}/>
                    <input type="text" placeholder="예문" className="example-input" value={example} onChange={(e)=> setExample(e.target.value)}/>
                    <label className="card-title">선택할 카드</label>
                    <div className="checkbox-container">
                        {allcardtitles.map((title) =>(
                        <div key={title}>
                            <input
                                type="checkbox"
                                id={title}
                                className="check_title"
                                checked={titles.includes(title)}
                                onChange={() => handleCheckboxChange(title)}
                            />
                            <label htmlFor={title}>{title}</label>
                        </div>
                        ))}
                    </div>
                </main>
                <footer className='footer'>
                    <button className="word-create-btn" onClick={onClickUpdate}>수정</button>
                    <button className="word-cancel-btn" onClick={onClickClose}>취소</button>
                </footer>
            </div>
        </div>
    );
}

UpdateWordModal.propTypes={
    
    isModal: PropTypes.bool.isRequired,
    setIsModal : PropTypes.func.isRequired,
    word: PropTypes.shape({
        id: PropTypes.number.isRequired,
        language: PropTypes.oneOf(['JAPANESE','ENGLISH']),
        item : PropTypes.string.isRequired,
        mean: PropTypes.string.isRequired,
        example : PropTypes.string.isRequired,
        titles : PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    cardtitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default UpdateWordModal;