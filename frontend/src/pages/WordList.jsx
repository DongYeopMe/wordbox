import React, { useState } from "react";
import Button from "../components/common/Button";
import stubData from "../data/voca.js";
import "../styles/WordList.css";

const WordList = () => {
    const [selectedView, setselectedView] = useState("normal");

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
                {stubData.map((item) => (
                    <div key={item.id} className="word_space">
                        <div className="word">
                            <span className={selectedView === "hide_word" ? "hide" : "title"}>
                                {item.word}
                            </span>
                            <span className={selectedView === "hide_mean" ? "hide" : "mean"}>
                                {item.meaning}
                            </span>
                        </div>
                        <span>{item.example}</span>
                    </div>
                ))}
            </div>
            <button>맨위로</button>
        </div>
    );
};

export default WordList;
