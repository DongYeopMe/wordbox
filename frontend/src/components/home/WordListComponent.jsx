import { useState } from "react";
import stubData from "../../data/voca";
import { BsCheckSquare } from "react-icons/bs";
import FilterBarComponent from "./FilterBarComponent";

function WordListComponent({ optionState }) {
  const [ischecked, setIsChecked] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleSortModal = () => {
    setShowSortModal((prev) => !prev);
    setShowFilterModal(false); // 다른 쪽은 닫기
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
    setShowSortModal(false); // 다른 쪽은 닫기
  };

  const studyCheck = (id) => {
    setIsChecked(!ischecked);
  };
  return (
    <div id="content" className="w-full min-h-screen">
      <div className="bg-gray-200 p-4 ">
        <nav className="flex justify-between py-4">
          <div className="">
            <h2>이 카드의 단어</h2>
          </div>
          <div>
            <FilterBarComponent />
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
        <div id="page"></div>
      </div>
    </div>
  );
}
export default WordListComponent;
