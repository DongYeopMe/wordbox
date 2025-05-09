import React, { useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
function WordAddComponent({ index }) {
  const [word, setWord] = useState(""); // 단어
  const [meaning, setMeaning] = useState(""); //뜻

  return (
    <div className="border-1 border-gray-50 rounded-xl bg-white">
      <div className="flex flex-row border-b-2 border-gray-50 justify-between items-center p-4">
        <span className="pl-4">{index}</span>
        <div className="flex flex-row gap-6 pr-5">
          <button>언어</button>
          <div>
            <BiSolidTrashAlt />
          </div>
        </div>
      </div>
      <div className="flex flex-row px-4 py-8">
        <div className="w-1/2 px-4">
          <div className="w-full border-b-2 hover:border-b-indigo-400">
            <p>endsfsd</p>
          </div>
          <span className="text-xs">단어</span>
        </div>
        <div className="w-1/2 px-4">
          <div className="w-full border-b-2 hover:border-b-indigo-400">
            <p>감자</p>
          </div>
          <span className="text-xs">뜻</span>
        </div>
      </div>
    </div>
  );
}

export default WordAddComponent;
