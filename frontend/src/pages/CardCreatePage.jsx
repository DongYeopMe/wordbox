import React, { useState } from "react";
import Layout from "../components/common/Layout";
import WordAddComponent from "../components/card/WordAddComponent";
import WordAddSection from "../components/card/WordAddSection";

function CardCreatePage() {
  const release = {
    Myself: "나만 보기",
    All: "전체공개",
  };

  return (
    <Layout>
      <div className="bg-gray-200 min-h-screen">
        <div className="w-full">
          <div className="py-6 px-12 flex flex-row justify-between">
            <div>
              <h1 className="text-3xl">새로운 단어카드 만들기</h1>
            </div>
            <div className="pr-3">
              <div>
                <button className="border-2 py-2 px-4 rounded-2xl">
                  <span>만들기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="input" className="px-12 flex flex-col gap-5">
            <div>
              <div className="w-full h-[48px] bg-white flex justify-center border border-white rounded-xl py-1 px-3 focus-within:border-indigo-500">
                <input
                  className="w-full focus:outline-none"
                  placeholder="제목을 입력하세요."
                />
              </div>
            </div>
            <div className="w-full h-[60px] bg-white flex justify-center border border-white rounded-xl py-1 px-3 focus-within:border-indigo-500">
              <input className="w-full focus:outline-none" placeholder="설명" />
            </div>
          </div>
          <div id="option" className="px-12 mt-7 flex flex-row justify-between">
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
        <WordAddSection />
      </div>
    </Layout>
  );
}

export default CardCreatePage;
