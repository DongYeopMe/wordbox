import React, { useState } from "react";
import Layout from "../components/common/Layout";
import data from "../data/directoryStub";
import FolderListComponent from "../components/library/FolderListComponent";
import LearningCardComponent from "../components/library/LearningCardComponent";
function LibraryPage(chilren) {
  const [selected, setSelected] = useState("폴더");
  const headText = useState("라이브러리");

  const tablist = ["폴더", "학습중 카드"];
  const tabComponents = {
    폴더: <FolderListComponent />,
    "학습중 카드": <LearningCardComponent />,
  };

  return (
    <Layout>
      <div className="px-10 h-full">
        <div className="py-8 h-[100px] w-full flex justify-center items-center">
          <h2 className="text-[35px]">라이브러리</h2>
        </div>
        <div
          id="folders"
          className="flex flex-row justify-center items-center py-10"
        >
          {tablist.map((tab) => (
            <div
              key={tab}
              onClick={() => setSelected(tab)}
              className={`mx-4 border-b-[3px] border-transparent hover:border-[#4f46e5] transition-colors duration-200 cursor-pointer
            ${selected === tab ? "text-amber-900" : ""}`}
            >
              {tab}
            </div>
          ))}
        </div>
        <main>{tabComponents[selected]}</main>
      </div>
    </Layout>
  );
}

export default LibraryPage;
