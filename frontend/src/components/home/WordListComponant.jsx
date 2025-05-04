import { useState } from "react";
import stubData from "../../data/voca";

import { BsCheckSquare } from "react-icons/bs";
function WordListComponant({ optionState }) {
  const [ischecked, setIsChecked] = useState(false);

  const studyCheck = (id) => {
    setIsChecked(!ischecked);
  };
  return (
    <div id="content" className="w-full min-h-screen">
      <div className="bg-gray-200 p-4 ">
        <div className="">
          <nav className="flex justify-between">
            <div>
              <h2>이 카드의 단어</h2>
            </div>
            <div>
              <nav className="w-full flex flex-row gap-2">
                <div>
                  <button>최신순</button>
                </div>
                {/* 전체,암기,미암기 */}
                <div>
                  <button>전체</button>
                </div>
              </nav>
            </div>
          </nav>
          <div className="flex flex-col gap-3">
            {stubData.map((word) => (
              <div key={word.id} className="border-2 bg-gray-100 rounded-2xl">
                <div className="py-5">
                  <div className="flex flex-row">
                    <div
                      id="word"
                      className={`flex flex-wrap border-r-1 w-2/6 pl-15 pr-5 ${
                        optionState.word ? "bg-blue-200" : ""
                      }`}
                    >
                      <span className={optionState.word ? "invisible" : ""}>
                        {word.word}
                      </span>
                    </div>
                    <div
                      id="meaning"
                      className={`flex flex-wrap w-3/6 pl-13 ${
                        optionState.meaning ? "bg-blue-200" : ""
                      }`}
                    >
                      <span className={optionState.meaning ? "invisible" : ""}>
                        {word.meaning}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={studyCheck}
                        className="cursor-pointer pl-3"
                      >
                        <BsCheckSquare
                          color={`${ischecked ? "white" : "gray"}`}
                          className={`${ischecked ? "bg-amber-400" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="example"
                  className="flex flex-col items-center border-t-1 "
                >
                  <span className={optionState.word ? "invisible" : ""}>
                    {word.example}
                  </span>
                  <span className={optionState.meaning ? "invisible" : ""}>
                    {word.exampleMeaning}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="page"></div>
      </div>
    </div>
  );
}
export default WordListComponant;
