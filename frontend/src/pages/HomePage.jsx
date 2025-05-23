import React from "react";
import Layout from "../components/common/Layout";
import CardComponentM1 from "../components/home/CardComponentM1";
import CardComponentM2 from "../components/home/CardComponentM2";
import stubData from "../data/cardStub";
import { NavLink } from "react-router-dom";

// BsJournal : 일반/ BsJournalCheck  : 추가한 / BsJournalBookmarkFill : 학습하고 있는
//우선순위 : 1. 학습 2. 추가한 3. 일반
// 최신, 내가 학습하고 있는 카드, 내가 최근 보고 잇는 언어의 카드들 , 공식 카드(언어 선택 필수),
function HomePage(props) {
  return (
    <Layout>
      <div className="px-8">
        <div className="my-4 flex flex-col gap-y-12">
          <CardComponentM1 subject="최신" />
          <div className="w-full h-[50px]"></div> {/* 비어 있는 컴포넌트 */}
          <CardComponentM2 subject={"구독 중인 카드"} />
          <CardComponentM2 subject={"요즘 보고 있는 언어들 카드 추천"} />
          <CardComponentM2 subject={"공식 단어 카드"} />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
