import React, { useState } from "react";
import "../../styles/AddDirectoryModal.css";
import axios from "axios";

const AddDirectoryModal = ({ isModal, setIsModal, fetchData }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [title, setTitle] = useState("");
  const url = "http://localhost:8080/directory/create";

  function onClickClose() {
    setIsModal(false);
  }

  function onClickCreate() {
    const data = {
      language: selectedLanguage,
      title: title,
    };
    axios
      .post(url, data)
      .then((response) => {
        fetchData();
        setIsModal(false);
      })
      .catch((error) => {
        console.error("새로운 폴더 생성 실패", error);
      });
  }
  if (!isModal) return null;

  return (
    <div className="directory-modal-overlay">
      <div className="directory-modal-content">
        <header className="modal-header">
          <h2 className="head">폴더 추가</h2>
        </header>
        <main>
          <input
            type="text"
            placeholder="새로운 카드 추가"
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </main>
        <footer className="footer">
          <button className="directory-create-btn" onClick={onClickCreate}>
            추가
          </button>
          <button className="directory-cancel-btn" onClick={onClickClose}>
            취소
          </button>
        </footer>
      </div>
    </div>
  );
};
export default AddDirectoryModal;
