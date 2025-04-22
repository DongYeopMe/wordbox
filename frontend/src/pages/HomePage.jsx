import React from "react";
import Layout from "../components/common/Layout";
import stubData from "../data/cardStub";
import {
  BsJournal,
  BsJournalBookmarkFill,
  BsJournalCheck,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Icon from "../components/common/Icon";
// BsJournal : 일반/ BsJournalCheck  : 추가한 / BsJournalBookmarkFill : 학습하고 있는
//우선순위 : 1. 학습 2. 추가한 3. 일반
// 최신, 내가 학습하고 있는 카드, 내가 최근 보고 잇는 언어의 카드들, 추천 카드
function HomePage(props) {
  return (
    <Layout>
      <main className="">
        <div className="px-4">
          <div className="my-4">
            <div className="">
              <span>최신</span>
              <div className="">
                {stubData.map((card) => (
                  <NavLink key={card.id} to={card.id}>
                    <div className="">
                      <Icon
                        isStudying={card.isStudying}
                        isInMyDirectory={card.isInMyDirectory}
                        isMe={card.isMe}
                      />
                      <div id="title">{card.title}</div>
                      <div id="description">{`${card.count}개 | ${
                        card.isMe ? "나" : card.owner.username
                      }`}</div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default HomePage;
