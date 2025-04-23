import React from "react";
import Layout from "../components/common/Layout";
import CardsComponentM1 from "../components/home/CardsComponentM1";
import stubData from "../data/cardStub";
import { NavLink } from "react-router-dom";

// BsJournal : 일반/ BsJournalCheck  : 추가한 / BsJournalBookmarkFill : 학습하고 있는
//우선순위 : 1. 학습 2. 추가한 3. 일반
// 최신, 내가 학습하고 있는 카드, 내가 최근 보고 잇는 언어의 카드들
function HomePage(props) {
  return (
    <Layout>
      <div className="px-8">
        <div className="my-4">
          <CardsComponentM1 subject="최신" />
          <div className="w-full">
            <span className="font-bold pl-4 block">학습 중인 카드</span>
            <div className="flex flex-row">
              {stubData.slice(0.1).map((card) => (
                <NavLink key={card.id} to={card.id}>
                  <div className="flex "></div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
