import React, {useState} from "react";
import Button from "../components/common/Button";
import Subject from "../components/home/Subject.jsx";
import stubData from "../data/categoryStub.js";
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
        <div>
            <div className="category">
            <Button text={"English"} type={"text"} 
            onClick={handleseletEng}></Button>
            <Button text={"日本語"} type={"text"} 
            onClick={handleseletJap}></Button>
        </div>
            <div className="stuff">
                {filteredData.map((item,index)=>(
                    <Subject key={index} title={`${item.title}`} quantity={`${item.count}`}/>
                ))}
            </div>
        </div>
    );
}
export default Home;