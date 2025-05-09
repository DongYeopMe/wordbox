import React, { useState } from "react";
import WordAddComponent from "./WordAddComponent";

function WordAddSection(props) {
  const [wordCount, setWordcount] = useState(2);
  const handleAddWord = () => {
    setWordCount((prev) => prev + 1);
  };

  return (
    <section id="word" className="px-12 py-8">
      <div className="py-5">
        <div className="w-full flex flex-col gap-6">
          {Array.from({ length: wordCount }).map((_, i) => (
            <WordAddComponent key={i} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WordAddSection;
