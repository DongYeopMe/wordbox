import React from "react";
import Layout from "../components/common/Layout";

function HomePage(props) {
  return (
    <Layout>
      <div className="">
        <h1 className="text-xl font-bold">홈 페이지입니다!</h1>
        <p>여기에 원하는 콘텐츠를 작성하세요.</p>
      </div>
    </Layout>
  );
}

export default HomePage;
