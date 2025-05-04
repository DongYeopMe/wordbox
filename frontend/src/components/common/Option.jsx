import { useState } from "react";
import TopButtonImg from "../../image/top-button.png";
function Option({ optionState, setOptionState }) {
  const toggleOption = (key) => {
    setOptionState((prev) => {
      const newState = {
        word: false,
        meaning: false,
      };
      if (prev[key]) return newState;
      newState[key] = true;
      return newState;
    });
  };

  const handleTop = () => {
    const el = document.getElementById("content");
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" }); // 1차 시도
      // el.scrollTop = 0; // ← 이건 마지막 강제 fallback 용
    }
  };
  return (
    <div className="fixed top-35 right-10 z-50 flex flex-col gap-2 items-end">
      {/* 상단 오른쪽 옵션 버튼 */}
      <button
        onClick={() => toggleOption("word")}
        className={`px-3 py-2 rounded shadow ${
          optionState.word ? "bg-blue-300" : "bg-gray-100"
        }`}
      >
        {`${optionState.word ? "단어 보기" : "단어 숨김"}`}
      </button>
      <button
        onClick={() => toggleOption("meaning")}
        className={`px-3 py-2 rounded shadow ${
          optionState.meaning ? "bg-blue-300" : "bg-gray-100"
        }`}
      >
        {`${optionState.meaning ? "뜻 보기" : "뜻 숨김"}`}
      </button>

      {/* 하단 오른쪽 탑버튼 */}
      <div className="fixed bottom-10 right-10 z-50">
        <button onClick={handleTop}>
          <img
            src={TopButtonImg}
            alt="탑버튼 아이콘"
            className="w-[40px] h-[40px] hover:bg-gray-400 rounded-full"
          />
        </button>
      </div>
    </div>
  );
}
export default Option;
