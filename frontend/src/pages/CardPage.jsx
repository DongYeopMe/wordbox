import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/common/Layout";
import Option from "../components/common/Option";
import {
  BsFolderMinus,
  BsFolderPlus,
  BsJournal,
  BsJournalBookmarkFill,
  BsThreeDotsVertical,
  BsFolder,
  BsPencil,
  BsFillTrash3Fill,
} from "react-icons/bs";
import WordListComponent from "../components/home/WordListComponent";
import { NavLink } from "react-router-dom";
// 문제 : 주관식 (객관식 추후 추가)
// 학습 : 단어 카드, 뜻or단어 숨기기
function CardPage() {
  const [isStudying, setIsStudying] = useState(false);
  const [isInMyDirectory, setIsInMyDirectory] = useState(false);
  const [optionState, setOptionState] = useState({
    word: false,
    meaning: false,
  });
  const [showManageModal, setshowManageModal] = useState(false);
  const manageRef = useRef(null);
  const toggleManageModal = () => {
    setshowManageModal((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (manageRef.current && !manageRef.current.contains(e.target)) {
        setshowManageModal(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

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
              <div className="flex justify-between py-5">
                <div className="flex items-center">
                  <NavLink className="flex flex-row">
                    <BsFolder />
                    <span className=" ml-2 text-sm">폴더 이름</span>
                  </NavLink>
                </div>
                {/* 저장및 카드 학습 버튼 */}
                <div className="flex flex-row gap-3 h-[40px] items-center">
                  <div className="border-1 rounded-3xl w-[92px] flex items-center justify-center">
                    <button className="flex flex-row px-[6px] py-[9px]">
                      {Adding}
                    </button>
                  </div>
                  <div className="border-1 rounded-3xl w-[92px] flex items-center justify-center">
                    <button className="flex flex-row px-[6px] py-[9px]">
                      {Studying}
                    </button>
                  </div>
                  <div
                    ref={manageRef}
                    className="flex items-center justify-center border-1 rounded-full w-[40px] h-full relative"
                  >
                    <button onClick={toggleManageModal}>
                      <BsThreeDotsVertical />
                    </button>
                    {/* manageModal 자기가 만든 카드일경우만*/}
                    {showManageModal && (
                      <div className="absolute mt-1 top-full right-0 bg-white border rounded shadow z-50 py-1 w-[150px] text-sm">
                        <NavLink>
                          <div className="py-2 px-6 hover:bg-gray-200 cursor-pointer w-full">
                            <div className="flex flex-row gap-3 items-center">
                              <BsPencil />
                              <span>수정</span>
                            </div>
                          </div>
                        </NavLink>
                        <button className="w-full">
                          <div className="hover:bg-gray-200 cursor-pointer py-2 px-6">
                            <div className="flex flex-row gap-3 items-center text-red-600">
                              <BsFillTrash3Fill />
                              <span>삭제</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <h1 className="text-3xl">카드 이름</h1>
              {/* 퀴즈,학습,*/}
            </div>
            <WordListComponent optionState={optionState} />
          </div>
        </div>
      </div>
      <Option optionState={optionState} setOptionState={setOptionState} />
    </Layout>
  );
}

export default CardPage;
