import React, { useEffect, useState, useRef } from "react";
import data from "../../data/directoryStub";
import { BsBoxSeam } from "react-icons/bs";
import { BiDotsVerticalRounded, BiPencil, BiSolidTrash } from "react-icons/bi";
function FolderListComponent(props) {
  const [modalInfo, setModalInfo] = useState(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  const toggleModal = (e, folderId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    buttonRef.current = e.currentTarget;
    const modalWidth = 150;
    setModalInfo({
      folderId,
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
    <div className="py-3">
      {data.map((folder) => (
        <div
          key={folder.id}
          className={` w-full border-2 h-[70px] rounded-[8px] flex items-center 
          hover:border-[#4f46e5] transition-colors duration-200 cursor-pointer
          gap-3 my-2 shadow-xl`}
        >
          <div className="px-4 py-3 w-full h-full flex flex-row justify-between">
            <div className="flex flex-row">
              <div className="h-full flex items-center">
                <BsBoxSeam size={24} />
              </div>
              <div className="pl-3 flex flex-col">
                <span className="font-bold">{folder.title}</span>
                <span className="font-light">{`카드 ${folder.count}개`}</span>
              </div>
            </div>
            <div className="h-full flex items-center justify-center">
              <div
                className="size-8 rounded-full flex items-center justify-center hover:bg-gray-400 cursor-pointer"
                onClick={(e) => toggleModal(e, folder.id)}
              >
                <BiDotsVerticalRounded size={24} />
              </div>
            </div>
          </div>
        </div>
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
                  <span className="ml-2">폴더 이름 수정</span>
                </div>
              </div>
            </button>
            <button className="">
              <div className=" hover:bg-gray-100 cursor-pointer">
                <div className="px-5 py-2 flex flex-row">
                  <BiSolidTrash size={20} />
                  <span className="ml-2">폴더 삭제</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FolderListComponent;
