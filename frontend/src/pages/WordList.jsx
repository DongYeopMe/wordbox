import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/common/Button";
import { useLocation } from 'react-router-dom';
import ScrollToTop from "../components/home/ScrollToTop.jsx"
import Pagination from "react-js-pagination";
import "../styles/WordList.css";
import axios from "axios";

const WordList = () => {
    const location = useLocation();
    const [selectedView, setselectedView] = useState("normal");
    const [page,setPage]= useState(1);
    const [wordList, setWordList] = useState([]);
    const { cardId, language, apiType } = location.state || { cardId: null, language: "TOTAL", apiType: "getList" };
    const [currentWords, setcurrentWords] = useState(wordList);
    
    const wordPageSize = 10;//페이지당 보여줄 단어 갯수
    // 현재 페이지의 단어 리스트 계산
    const indexOfLastWord = page* wordPageSize ;
    const indexOfFirstWord = indexOfLastWord- wordPageSize;
    const baseUrl = "http://localhost:8080"; 
    useEffect(() => {
        const getData = async () => {
            try {
                const endpoint = apiType === "getList" ? "/word/getList" : "/word/getMyList"; // API 종류 선택
                const params = apiType === "getList" ? { language, cardId } : { language };
                const response = await axios.get(`${baseUrl}${endpoint}`, {params});
                setWordList(response.data.data.content);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, [cardId, language,apiType]);
    useEffect(() => {
        setcurrentWords(wordList.slice(indexOfFirstWord,indexOfLastWord));
    },[wordList,page])
    

    const handlePageChange = (number) =>{
        setPage(number);
        window.scrollTo(0, 320);
    }

    const handleSelectChange = (event) => {
        setselectedView(event.target.value);
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header_inner">
                    <h1>카드 이름</h1>
                    <div className="nav">
                    <select name="view_control" value={selectedView} onChange={handleSelectChange}>
                    <option value="normal">기본</option>
                    <option value="hide_mean">단어</option>
                    <option value="hide_word">뜻</option>
                    </select>
                    <Button text={"단어 추가"} type={"text"} name={"addword"} />
                </div>
                </div>
            </header>
            <div className="content">
                {currentWords.length > 0 ? (
                    currentWords.map((item) => (
                        <div key={item.id} className="word_space">
                            <div className="word">
                                <span className={selectedView === "hide_word" ? "hide" : "title"}>
                                    {item.item}
                                </span>
                                <span className={selectedView === "hide_mean" ? "hide" : "mean"}>
                                    {item.mean}
                                </span>
                            </div>
                            <div className="example">
                                <p>{item.example}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-data">단어 목록이 없습니다.</p>
                )}
            </div>
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={wordPageSize} // 한 페이지에 보여줄 개수
                totalItemsCount={wordList.length} // 전체 데이터 개수
                pageRangeDisplayed={5} // 페이지 버튼 표시 개수
                onChange={handlePageChange} // 페이지 변경 이벤트
                innerClass="pagination" // ul 태그의 클래스
                itemClass="page-item" // li 태그의 클래스
                linkClass="page-link" // a 태그의 클래스
            />
            <ScrollToTop/>
        </div>
    );
};

export default WordList;
