import React, {useState, useEffect, useCallback} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import axios from "axios";
import "../styles/Card.css"


const Card = () => {
    const [cards, setCards] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("TOTAL");
    const baseUrl = "http://localhost:8080";

    
    
    const responseCards = useCallback(async (selectedLanguage) =>{
        try{
            const response = await axios.get(baseUrl+"/card/getList",{
                params:{language : selectedLanguage}
            });
            setCards(response.data.data);
            console.log(cards);
    } catch (error){
        console.log("API 호출 중 에러 발생했습니다.:",error);
    }
    },[]);
    const handleSelectChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    useEffect(()=>{
        responseCards(selectedLanguage)
    },[responseCards,selectedLanguage])

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
                <Subject title={"추가한 \n단어"} quantity={"30"} />
            </div>
        </div>
    );
};

export default Card;