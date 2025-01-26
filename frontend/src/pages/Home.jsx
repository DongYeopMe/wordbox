import React, {useState} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import stubData from "../data/categoryStub.js";
import "../styles/Voca.css"
const Home = () =>{
    const [selectedCategory, setSelectedCategory] = useState("total");
    const categories = ["total", ...new Set(stubData.map(item => item.category))];

    const filteredData = 
        selectedCategory ==="total" || selectedCategory ===""
        ? stubData
        : stubData.filter((item) => item.category === selectedCategory);

    const handleSelectChange  =(event) =>{
        setSelectedCategory(event.target.value);
    }
    return (
        <div className="container">
            <div className="category_container">
            <select value={selectedCategory} onChange={handleSelectChange}>
                {categories.map((category,index) => (
                    <option key={index} value={category}>
                        {category === "total" ? "전체" : category}
                    </option>
                ))}
            </select>
            <Button text={"+"} type={"button"} name={"Add"} 
            ></Button>
        </div>
            <div className="card_container">
                {filteredData.map((item,index)=>(
                    <Subject key={index} title={`${item.title}`} quantity={`${item.count}`}/>
                ))}
                <Subject title={"추가한 \n단어"} quantity={"30"}/>
                <div className="card">{"오답\n 문제"}</div>
            </div>
            
        </div>
    );
}
export default Home;