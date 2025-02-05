import React, {useState, useEffect, useCallback} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import axios from "axios";
import "../styles/Card.css"


const Card = () => {
    const [cards, setCards] = useState([]);
    const [MyWordsCount, setMyWordCount] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState("TOTAL");
    const baseUrl = "http://localhost:8080";

    
    
    const fetchData = useCallback(async () =>{
        try{
            const [cardsResponse, myWordsResponse] = await Promise.all([
               axios.get(baseUrl + "/card/getList", {params : { language : selectedLanguage} }),
               axios.get(baseUrl + "/word/getMyWordCount", {params : {language : selectedLanguage}})
            ]);
            setCards(cardsResponse.data.data);
            setMyWordCount(myWordsResponse.data.data)

    } catch (error){
        console.log("API 호출 중 에러 발생했습니다.:",error);
    }
    },[selectedLanguage]);
    const handleSelectChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    useEffect(()=>{
        fetchData()
    },[fetchData])

    const languages = {
        TOTAL: "전체",
        ENGLISH: "영어",
        JAPANESE: "일본어"
    };

    return (
        <div className="container">
            <div className="category_container">
                <select value={selectedLanguage} onChange={handleSelectChange}>
                    {Object.entries(languages).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                <Button text={"+"} type={"button"} name={"Add"} />
            </div>
            <div className="card_container">
                {cards.map((item, index) => (
                    <Subject key={index} title={`${item.title}`} quantity={`${item.count}`} />
                ))}
                <Subject title={"추가한 \n단어"} quantity={MyWordsCount} />
            </div>
        </div>
    );
};

export default Card;