import Layout from "../components/common/Layout";
import React, { useState, useEffect, useRef } from "react";
import {
  BsThreeDotsVertical,
  BsPencil,
  BsFillTrash3Fill,
  BsJournal,
} from "react-icons/bs";
import stubData from "../data/cardStub";
import { NavLink } from "react-router-dom";

function DirectoryPage(props) {
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
  return (
    <Layout>
      <div className="px-8">
        <div className="my-4 flex flex-col gap-y-12">
          <div className="px-10 py-10 flex flex-row justify-between">
            <h1 className="text-3xl">폴더 이름</h1>
            <div>
              <div
                ref={manageRef}
                className="flex items-center justify-center border-1 rounded-full w-[40px] h-full relative"
              >
                <button onClick={toggleManageModal}>
                  <BsThreeDotsVertical />
                </button>
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
          <div className="px-10">
            <button className="border-2 p-3 rounded-2xl hover:bg-gray-200 cursor-pointer">
              카드 추가
            </button>
          </div>
          <div className="px-10">
            <div className="flex flex-col pt-2">
              {stubData.slice(0, 4).map((card) => (
                <NavLink
                  key={card.id}
                  to={card.id}
                  className="w-1/2 hover:bg-gray-100 rounded-[13px] w-full"
                >
                  <div className="p-4">
                    <div className="flex flex-row">
                      <div className="flex items-center justify-center bg-sky-100 w-[40px] h-[40px] rounded-[9px]">
                        <BsJournal className="text-cyan-300" size={20} />
                      </div>
                      <div className="pl-2">
                        <div id="title" className="h-[20px] font-bold">
                          {card.title}
                        </div>
                        <div id="description" className="h-[20px]">{`${
                          card.count
                        }개 | 크리에이터 : ${
                          card.isMe ? "나" : card.owner.username
                        }`}</div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DirectoryPage;
