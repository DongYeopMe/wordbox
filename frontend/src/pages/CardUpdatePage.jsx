import React, { useState } from "react";
import Layout from "../components/common/Layout";
import WordAddComponent from "../components/card/WordAddComponent";
import WordAddSection from "../components/card/WordAddSection";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function CardUpdatePage(props) {
  const [wordCount, setWordCount] = useState(2);
  const navigate = useNavigate();

  const release = {
    Myself: "나만 보기",
    All: "전체공개",
  };

  return (
    <Layout>
      <div className="bg-gray-200 min-h-screen ">
        <div className="max-w-[1000px] w-full mx-auto">
          <div className="w-full">
            <div className="py-6 px-8 flex flex-row justify-between">
              <div>
                <button
                  className="py-3 px-2 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <BiArrowBack size={20} />
                </button>
              </div>
              <div className="pr-3">
                <button
                  className="border-2 py-2 px-4 rounded-2xl"
                  onClick={() => navigate(-1)}
                >
                  <span>수정</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div id="input" className="px-8 flex flex-col gap-5">
              <div>
                <div className="w-full h-[48px] bg-white flex justify-center border border-white rounded-xl py-1 px-3 focus-within:border-indigo-500">
                  <input
                    className="w-full focus:outline-none"
                    placeholder="제목을 입력하세요."
                  />
                </div>
              </div>
              <div className="w-full h-[60px] bg-white flex justify-center border border-white rounded-xl py-1 px-3 focus-within:border-indigo-500">
                <input
                  className="w-full focus:outline-none"
                  placeholder="설명"
                />
              </div>
            </div>
            <div
              id="option"
              className="px-8 mt-7 flex flex-row justify-between"
            >
              <div className="border-1 rounded-md bg-white">
                <button className="px-4 py-1">
                  <span>불러오기</span>
                </button>
              </div>
              <div className="border-1 rounded-md bg-white">
                <button className="px-4 py-1">{release.All}</button>
              </div>
            </div>
          </div>
          <WordAddSection wordCount={wordCount} setWordCount={setWordCount} />
          <div className="flex gap-3 justify-end px-8">
            <div className="border-2 py-3 px-5 rounded-2xl bg-blue-400">
              <button>
                <span>수정</span>
              </button>
            </div>
            <div className="border-2 py-3 px-5 rounded-2xl">
              <button className=" cursor-pointer" onClick={() => navigate(-1)}>
                <span>취소</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CardUpdatePage;
