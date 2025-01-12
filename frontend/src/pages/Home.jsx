import React, {useState} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import stubData from "../data/categoryStub.js";
import "../styles/Voca.css"
const Home = () =>{
    const [selectedCategory, setSelectedCategory] = useState("English");
    const filteredData = stubData.filter((item) => item.category === selectedCategory);

    const handleseletEng =() =>{
        setSelectedCategory("English");
    }
    const handleseletJap =() =>{
        setSelectedCategory("日本語");
    }

    return (
        <div className="container">
            <div className="category_container">
            <Button text={"English"} type={"text"}name={"ENG"}
            onClick={handleseletEng}></Button>
            <Button text={"日本語"} type={"text"} name={"JPN"} 
            onClick={handleseletJap}></Button>
        </div>
            <div className="card_container">
                {filteredData.map((item,index)=>(
                    <Subject key={index} title={`${item.title}`} quantity={`${item.count}`}/>
                ))}
            </div>
        </div>
    );
}
export default Home;