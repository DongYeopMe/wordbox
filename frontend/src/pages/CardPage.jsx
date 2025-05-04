import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Option from "../components/common/Option";
import {
  BsFolderMinus,
  BsFolderPlus,
  BsJournal,
  BsJournalBookmarkFill,
} from "react-icons/bs";
import stubData from "../data/voca";
import WordListComponant from "../components/home/WordListComponant";
//모달창?
// 문제 : 주관식 (객관식 추후 추가)
// 학습 : 단어 카드, 뜻or단어 숨기기
function CardPage() {
  const [isStudying, setIsStudying] = useState(false);
  const [isInMyDirectory, setIsInMyDirectory] = useState(false);
  const [optionState, setOptionState] = useState({
    word: false,
    meaning: false,
  });

  let Studying;
  let Adding;
  if (isStudying) {
    Studying = (
      <>
        <BsJournal />
        <span className="ml-2 text-sm font-bold text-[#586380]">빼기</span>
      </>
    );
  } else {
    Studying = (
      <>
        <BsJournalBookmarkFill />
        <span className="ml-2 text-sm font-bold text-[#586380]">학습</span>
      </>
    );
  }
  if (isInMyDirectory) {
    Adding = (
      <>
        <BsFolderMinus />
        <span className="ml-2 text-sm font-bold text-[#586380]">삭제</span>
      </>
    );
  } else {
    Adding = (
      <>
        <BsFolderPlus />
        <span className="ml-2 text-sm font-bold text-[#586380]">저장</span>
      </>
    );
  }
  return (
    <Layout>
      <div className="py-8 px-10 h-screen">
        <div className="min-w-[670px] max-w-[930px]">
          <div className="px-4">
            <div id="header">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl">카드 이름</h1>
                </div>
                {/* 저장및 카드 학습 버튼 */}
                <div className="flex flex-row">
                  <div className="border-2 rounded-3xl">
                    <button className="flex flex-row px-[6px] py-[10px]">
                      {Adding}
                    </button>
                  </div>
                  <div className="border-2 rounded-3xl">
                    <button className="flex flex-row px-[6px] py-[10px]">
                      {Studying}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <WordListComponant optionState={optionState} />
          </div>
        </div>
      </div>
      <Option optionState={optionState} setOptionState={setOptionState} />
    </Layout>
  );
}

export default CardPage;
