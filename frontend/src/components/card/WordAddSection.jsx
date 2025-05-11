import React, { useState } from "react";
import WordAddComponent from "./WordAddComponent";
import { BiPlusCircle } from "react-icons/bi";

function WordAddSection({ wordCount, setWordCount }) {
  const handleAddWord = () => {
    setWordCount((prev) => prev + 1);
  };

  return (
    <section className="px-8 py-8">
      <div className="py-5">
        <div className="w-full flex flex-col gap-6">
          {Array.from({ length: wordCount }).map((_, i) => (
            <WordAddComponent key={i} index={i + 1} />
          ))}
          <div
            className="border-1 border-gray-50 rounded-xl bg-white shadow-2xl flex justify-center py-3 cursor-pointer"
            onClick={handleAddWord}
          >
            <button>
              <BiPlusCircle />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WordAddSection;
