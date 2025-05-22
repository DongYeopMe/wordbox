import React from "react";
import {
  BsJournal,
  BsJournalBookmarkFill,
  BsJournalCheck,
} from "react-icons/bs";
// BsJournal : 일반/ BsJournalCheck  : 추가한 / BsJournalBookmarkFill : 학습하고 있는
//우선순위 : 1. 학습 2. 추가한 3. 일반
const Icon = ({ isStudying, isInMyDirectory, isMe }) => {
  let icon;

  if (isStudying) {
    icon = <BsJournalBookmarkFill className="text-red-500" size={20} />;
  } else if (isInMyDirectory) {
    icon = (
      <BsJournalCheck
        className={isMe ? "text-blue-500" : "text-green-500"}
        size={20}
      />
    );
  } else {
    icon = <BsJournal className="text-black" size={20} />;
  }

  return (
    <div className="flex items-center justify-center bg-gray-400 w-[40px] h-[40px] rounded-[9px]">
      {icon}
    </div>
  );
};

export default Icon;
