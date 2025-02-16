import React, { useCallback, useEffect, useState, useMemo } from "react";
import Button from "../components/common/Button";
import { useLocation } from 'react-router-dom';
import ScrollToTop from "../components/home/ScrollToTop.jsx"
import Pagination from "react-js-pagination";
import UpdateWordModal from "../components/home/UpdateWordModal.jsx"
import "../styles/WordList.css";
import axios from "axios";
import ButtonToBack from "../components/home/ButtonToBack.jsx";

const WordList = () => {
    const location = useLocation();
    const [selectedView, setselectedView] = useState("normal");
    const [page,setPage]= useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [wordList, setWordList] = useState([]);
    const { cardId, language, apiType,title,cardtitles } = location.state || { cardId: null, language: "TOTAL", apiType: "getList",title: "내가 추가한 단어", cardtitles:[] };
    const [isUpdateWordModal,setIsUpdateWordModal] = useState(false);
    const [clickedWord,setClickedWord] = useState(null);

    
    const wordPageSize = 10;//페이지당 보여줄 단어 갯수
    // 현재 페이지의 단어 리스트 계산
    const indexOfLastWord = page* wordPageSize ;
    const indexOfFirstWord = indexOfLastWord- wordPageSize;
    const baseUrl = "http://localhost:8080"; 
    useEffect(() => {
        const getData = async () => {
            try {
                const endpoint = apiType === "getList" ? "/word/getList" : "/word/getMyList"; // API 종류 선택
                const params = apiType === "getList" ? 
                { language,
                  cardId,
                  page,
                  size: wordPageSize } :
                { language, 
                  page,
                  size: wordPageSize
                };
                const response = await axios.get(`${baseUrl}${endpoint}`, {params});
                setWordList(response.data.data.content);
                setTotalItems(response.data.data.totalElements);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, [page,cardId, language,apiType]);
    const refreshWordList = async () => {
    try {
        const endpoint = apiType === "getList" ? "/word/getList" : "/word/getMyList"; 
        const params = apiType === "getList" ? { language, cardId } : { language };
        const response = await axios.get(`${baseUrl}${endpoint}`, { params });
        setWordList(response.data.data.content);
        setTotalItems(response.data.data.totalElements);
    } catch (error) {
        console.error("단어 목록 갱신 실패:", error);
    }
    };

    
    const handleWordClick = async(word) => {
        try{
            const response = await axios.get(`${baseUrl}/word/getWordTitles`,{
                params : {wordId : word.id}
            });
            const exword = {...word, titles:response.data.data};
            setClickedWord(exword);
            setIsUpdateWordModal(true);
        } catch(error){
            console.error("titles 가져오기 실패했습니다.",error);
        }
    }

    const handlePageChange = (pageNumber) =>{
        setPage(pageNumber);
        window.scrollTo(0, 320);
    }

    const handleSelectChange = (event) => {
        setselectedView(event.target.value);
    };


    return (
        <div className="container">
            <header className="header">
                <div className="header_inner">
                    <h1>{title}</h1>
                    <div className="nav">
                        <select className="view_control" value={selectedView} onChange={handleSelectChange}>
                            <option value="normal">기본</option>
                            <option value="hide_mean">단어</option>
                            <option value="hide_word">뜻</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="content">
                {wordList.length > 0 ? (
                    wordList.map((word) => (
                        <div key={word.id} className="word_space">
                            <div className="word" onClick={() => handleWordClick(word)}>
                                <span className={selectedView === "hide_word" ? "hide" : "title"}>
                                    {word.item}
                                </span>
                                <span className={selectedView === "hide_mean" ? "hide" : "mean"}>
                                    {word.mean}
                                </span>
                            </div>
                            <div className="example">
                                <p>{word.example}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">단어 목록이 없습니다.</p>
                )}
            </div>
            {isUpdateWordModal && clickedWord && (
                <UpdateWordModal 
                isModal={isUpdateWordModal} 
                setIsModal={setIsUpdateWordModal}
                word={clickedWord}
                cardtitles={cardtitles}
                refreshWordList={refreshWordList}
                />
            )}
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={wordPageSize} // 한 페이지에 보여줄 개수
                totalItemsCount={totalItems} // 전체 데이터 개수
                pageRangeDisplayed={5} // 페이지 버튼 표시 개수
                onChange={handlePageChange} // 페이지 변경 이벤트
                innerClass="pagination" // ul 태그의 클래스
                itemClass="page-item" // li 태그의 클래스
                linkClass="page-link" // a 태그의 클래스
            />
            <ButtonToBack/>
            <ScrollToTop/>
        </div>
    );
};

export default WordList;
