import React, { useCallback, useState } from "react";
import Button from "../components/common/Button";
import stubData from "../data/voca.js";
import ScrollToTop from "../components/home/ScrollToTop.jsx"
import Pagination from "react-js-pagination";
import "../styles/WordList.css";
import axios from "axios";

const WordList = () => {
    const [selectedView, setselectedView] = useState("normal");
    const [page,setPage]= useState(1);
    const wordPageSize = 10;//페이지당 보여줄 단어 갯수
    // 현재 페이지의 단어 리스트 계산
    const indexOfLastWord = page* wordPageSize ;
    const indexOfFirstWord = indexOfLastWord- wordPageSize;
    const currentWords = stubData.slice(indexOfFirstWord,indexOfLastWord);//현재 페이지 데이터
    

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
                {currentWords.map((item) => (
                    <div key={item.id} className="word_space">
                        <div className="word">
                            <span className={selectedView === "hide_word" ? "hide" : "title"}>
                                {item.word}
                            </span>
                            <span className={selectedView === "hide_mean" ? "hide" : "mean"}>
                                {item.meaning}
                            </span>
                        </div>
                        <div className="example">
                            <p>{item.example}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={wordPageSize} // 한 페이지에 보여줄 개수
                totalItemsCount={stubData.length} // 전체 데이터 개수
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
