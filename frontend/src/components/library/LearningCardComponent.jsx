import React, { useEffect, useState, useRef } from "react";
import stubData from "../../data/cardStub";
import { NavLink } from "react-router-dom";
import Icon from "../common/Icon";
import { BiPencil, BiSolidTrash, BiDotsVerticalRounded } from "react-icons/bi";
function LearningCardComponent() {
  const [modalInfo, setModalInfo] = useState(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  const toggleModal = (e, cardId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    buttonRef.current = e.currentTarget;
    const modalWidth = 150;
    setModalInfo({
      cardId,
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX - modalWidth,
    });
  };
  const closeModal = () => {
    setModalInfo(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (modalInfo && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const modalWidth = 150;
        setModalInfo((prev) => ({
          ...prev,
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX - modalWidth,
        }));
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [modalInfo]);

  useEffect(() => {
    const closeOnResizeOrScroll = () => {
      if (modalInfo) {
        closeModal();
      }
    };

    const handleClickOutside = (e) => {
      if (
        modalInfo &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closeModal();
      }
    };

    window.addEventListener("resize", closeOnResizeOrScroll);
    window.addEventListener("scroll", closeOnResizeOrScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", closeOnResizeOrScroll);
      window.removeEventListener("scroll", closeOnResizeOrScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalInfo]);

  return (
    <div className="flex flex-wrap py-3">
      {stubData.map((card) => (
        <NavLink
          key={card.id}
          to={card.id}
          className="w-1/2 hover:bg-gray-400 rounded-[13px]"
        >
          <div className="flex flex-row justify-between p-4">
            <div className="flex flex-row">
              <Icon
                isStudying={card.isStudying}
                isInMyDirectory={card.isInMyDirectory}
                isMe={card.isMe}
              />
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
            <div className="flex items-center justify-center">
              <div
                className="size-8 rounded-full flex items-center justify-center hover:bg-gray-900 cursor-pointer"
                onClick={(e) => toggleModal(e, card.id)}
              >
                <BiDotsVerticalRounded size={24} />
              </div>
            </div>
          </div>
        </NavLink>
      ))}
      {modalInfo && (
        <div
          ref={modalRef}
          className="absolute bg-white border-2 rounded-xl shadow-lg z-50 w-[200px] py-2"
          style={{
            top: modalInfo.top,
            left: modalInfo.left,
          }}
        >
          <div className="flex flex-col">
            <button>
              <div className=" hover:bg-gray-100 cursor-pointer">
                <div className="px-5 py-2 flex flex-row">
                  <BiPencil size={20} />
                  <span className="ml-2">학습 종료</span>
                </div>
              </div>
            </button>
            <button>
              <div className=" hover:bg-gray-100 cursor-pointer">
                <div className="px-5 py-2 flex flex-row">
                  <BiSolidTrash size={20} />
                  <span className="ml-2">카드 삭제</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningCardComponent;
