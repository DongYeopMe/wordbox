import TopButtonImg from "../../image/top-button.png";
export default function ScrollToTop() {
  const handleTop = () => {
    console.log("클릭됨"); // 버튼 눌렀는지 확인용
    window.scrollTo({
      top: 0,
      behavior: "",
    });
  };

  return (
    <>
      <div className="">
        <button className="" onClick={handleTop}>
          <img
            src={TopButtonImg}
            alt="탑버튼 아이콘"
            className="w-[40px] h-[40px] hover:bg-gray-400 rounded-full"
          />
        </button>
      </div>
    </>
  );
}
