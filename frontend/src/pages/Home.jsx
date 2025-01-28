import React, {useState, useEffect, useMemo, useCallback} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import axios from "axios";
import "../styles/Voca.css"


const Home = () => {
    const [cards, setCards] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("total");

    const fetchCards = useCallback(async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/card/getList");
            setCards(data);
        } catch (error) {
            console.log("API 호출 중 에러 발생했습니다:", error);
        }
    }, []);

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

    const categories = useMemo(() => ["total", ...new Set(cards.map(item => item.category))], [cards]);

    const filteredData = useMemo(() => {
        return selectedCategory === "total" || selectedCategory === ""
            ? cards
            : cards.filter((item) => item.category === selectedCategory);
    }, [cards, selectedCategory]);

    const handleSelectChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="container">
            <div className="category_container">
                <select value={selectedCategory} onChange={handleSelectChange}>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category === "total" ? "전체" : category}
                        </option>
                    ))}
                </select>
                <Button text={"+"} type={"button"} name={"Add"} />
            </div>
            <div className="card_container">
                {filteredData.map((item, index) => (
                    <Subject key={index} title={`${item.title}`} quantity={`${item.count}`} />
                ))}
                <Subject title={"추가한 \n단어"} quantity={"30"} />
                <div className="card">{"오답\n 문제"}</div>
            </div>
        </div>
    );
};

export default Home;