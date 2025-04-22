import React from "react";
import {
  BsJournal,
  BsJournalBookmarkFill,
  BsJournalCheck,
} from "react-icons/bs";
// BsJournal : 일반/ BsJournalCheck  : 추가한 / BsJournalBookmarkFill : 학습하고 있는
//우선순위 : 1. 학습 2. 추가한 3. 일반
const Icon = ({ isStudying, isInMyDirectory, isMe }) => {
  if (isStudying) {
    return (
      <div>
        <BsJournalBookmarkFill className="text-red-500" />
      </div>
    );
  } else if (isInMyDirectory) {
    return (
      <div>
        <BsJournalCheck className={isMe ? "text-blue-500" : "text-green-500"} />
      </div>
    );
  } else {
    return (
      <div>
        <BsJournal className="text-black" />
      </div>
    );
  }
};

export default Icon;
