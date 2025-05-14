import React, { useRef, useState } from "react";
import Layout from "../components/common/Layout";
import stubData from "../data/voca";
import {
  BiCaretLeft,
  BiCaretRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import WordcardComponent from "../components/quiz/WordcardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
function WordCardPage(props) {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  return (
    <Layout>
      <div className=" h-screen">
        <div className="max-w-[1000px] w-full mx-auto h-full">
          <div className="h-full flex items-center justify-center">
            <div className="border-0 h-2/3 w-full max-w-1/2 rounded-2xl px-2 shadow-xl">
              <Swiper
                modules={[Navigation, Pagination]}
                loop={false}
                spaceBetween={30}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
                slidesPerView={1}
                className="h-[70%]"
              >
                {stubData.map((word) => (
                  <SwiperSlide key={word.id}>
                    <WordcardComponent
                      word={word.word}
                      meaning={word.meaning}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex flex-row items-center justify-center gap-3 mt-4">
                <button
                  className="border-2 p-2 w-[76px] h-[48px] flex items-center justify-center rounded-2xl "
                  onClick={() => swiperRef.current?.slideTo(0)}
                >
                  <BiChevronsLeft size={32} />
                </button>
                <button
                  className="border-2 p-2 w-[76px] h-[48px] flex items-center justify-center rounded-2xl cursor-pointer hover:bg-gray-200"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <BiCaretLeft size={32} />
                </button>
                <div className="text-xl">
                  {current + 1} / {stubData.length}
                </div>

                <button
                  className="border-2 p-2 w-[76px] h-[48px] flex items-center justify-center rounded-2xl cursor-pointer hover:bg-gray-200"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <BiCaretRight size={32} />
                </button>
                <button
                  className="border-2 p-2 w-[76px] h-[48px] flex items-center justify-center rounded-2xl cursor-pointer hover:bg-gray-200"
                  onClick={() => swiperRef.current?.slideTo(stubData.length)}
                >
                  <BiChevronsRight size={32} />
                </button>
              </div>
              <div>
                <button
                  className="border-2 p-2 w-full h-[48px] flex items-center justify-center rounded-xl mt-5 cursor-pointer hover:bg-gray-200 font-bold"
                  onClick={() => navigate(-1)}
                >
                  그만하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default WordCardPage;
