import stubData from "../../data/cardStub";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function CardComponentM2({ subject }) {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="max-w-full h-[200px]">
      <div className="h-full flex flex-col px-4 gap-y-2">
        <div className="">
          <span className="font-bold block">{subject}</span>
        </div>
        <div className=" h-full flex flex-row w-full gap-3">
          <Swiper
            modules={[Navigation, Pagination]}
            loop={false}
            spaceBetween={20}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
            slidesPerView={3}
            className=""
          >
            {stubData.map((card) => (
              <SwiperSlide key={card.id}>
                <NavLink to={card.id}>
                  <div className="flex flex-col box-border bg-[#4f46e5] h-full rounded-3xl text-white hover:ring-2 ring-emerald-400 max-w-[300px]">
                    <div className="p-4 flex flex-col h-full justify-between">
                      <div>
                        <span className="font-bold">{card.title}</span>
                      </div>
                      <div className="flex flex-row justify-between">
                        <span className="bg-gray-300 rounded-[4px] p-0.5">{`${card.count}단어`}</span>
                        <span>{card.language}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">{`크리에이터 ${card.owner.username}`}</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
export default CardComponentM2;
