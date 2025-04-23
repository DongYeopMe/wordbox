import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [MyWordsCount, setMyWordCount] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("TOTAL");
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const [cardsResponse, myWordsResponse] = await Promise.all([
        axios.get(baseUrl + "/card/getList", {
          params: { language: selectedLanguage },
        }),
        axios.get(baseUrl + "/word/getMyWordCount", {
          params: { language: selectedLanguage },
        }),
      ]);
      setCards(cardsResponse.data.data);
      setMyWordCount(myWordsResponse.data.data);
    } catch (error) {
      console.log("API 호출 중 에러 발생했습니다.:", error);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCardClick = (card) => {
    const filteredTitles = cards
      .filter((c) => c.language === card.language)
      .map((c) => c.title);
    navigate("/wordlist", {
      state: {
        cardId: card.id,
        language: card.language,
        apiType: "getList",
        title: card.title,
        cardtitles: filteredTitles,
      },
    });
  };
  const handleMyWordListClick = (selectedLanguage) => {
    const filteredTitles = cards
      .filter((c) => c.language === selectedLanguage)
      .map((c) => c.title);

    navigate("/wordlist", {
      state: {
        language: selectedLanguage,
        apiType: "getMyList",
        cardtitles: filteredTitles,
      },
    });
  };
  const handleSelectChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const languages = {
    TOTAL: "전체",
    ENGLISH: "영어",
    JAPANESE: "일본어",
  };

  return (
    <div className="container">
      <div className="category_container">
        <select
          className="language_select"
          value={selectedLanguage}
          onChange={handleSelectChange}
        >
          {Object.entries(languages).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <div className="api_container">
          <Button
            text={"카드 추가"}
            type={"button"}
            name={"Add"}
            onClick={() => setIsCardModalOpen(true)}
          />
          {isCardModalOpen && (
            <AddCardModal
              isModal={isCardModalOpen}
              setIsModal={setIsCardModalOpen}
              fetchData={fetchData}
            />
          )}
          <Button
            text={"단어 추가"}
            type={"button"}
            name={"addword"}
            onClick={() => setIsWordModalOpen(true)}
          />
          {isWordModalOpen && (
            <AddWordModal
              isModal={isWordModalOpen}
              setIsModal={setIsWordModalOpen}
              checklist={cards}
              fetchData={fetchData}
            />
          )}
        </div>
      </div>
      <div className="card_container">
        {cards.map((card) => (
          <Subject
            key={card.id}
            title={`${card.title}`}
            quantity={`${card.count}`}
            onClick={() => handleCardClick(card)}
            language={card.language}
          />
        ))}
        {selectedLanguage !== "TOTAL" && (
          <Subject
            title={"추가한 \n단어"}
            quantity={MyWordsCount}
            onClick={() => handleMyWordListClick(selectedLanguage)}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
