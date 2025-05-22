import React from "react";
import Layout from "../components/common/Layout";
import stubData from "../data/voca";
import { BiCaretRight } from "react-icons/bi";
function QuizPage(props) {
  return (
    <Layout>
      <div className=" h-screen">
        <div className="max-w-[1000px] w-full mx-auto h-full">
          <div className="h-full flex items-center justify-center">
            <article className="border-0 h-2/3 w-full max-w-1/2 rounded-2xl px-2 shadow-xl">
              <div className="w-full h-1/2 p-4">
                <p className="text-2xl">dsadasdas</p>
              </div>
              <div className="w-full h-[40px] my-[100px] flex gap-4">
                <div className="border-1 w-full py-2 px-3">
                  <input className="outline-0 w-full"></input>
                </div>
                <button className="w-[40px] h-[40px] bg-amber-300 rounded-md px-2 py-1 ">
                  <BiCaretRight size={25} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QuizPage;
