import stubData from "../../data/cardStub";
import { NavLink } from "react-router-dom";
import Icon from "../common/Icon";

function CardsComponentM1({ subject }) {
  return (
    <div className="w-full">
      <span className="font-bold pl-4 w-full block">{subject}</span>
      <div className="flex flex-wrap">
        {stubData.slice(0, 4).map((card) => (
          <NavLink
            key={card.id}
            to={card.id}
            className="w-1/2 hover:bg-gray-400 rounded-[13px]"
          >
            <div className="flex flex-row p-4 ">
              <Icon
                isStudying={card.isStudying}
                isInMyDirectory={card.isInMyDirectory}
                isMe={card.isMe}
              />
              <div className="pl-2">
                <div id="title" className="h-[20px] font-bold">
                  {card.title}
                </div>
                <div id="description" className="h-[20px]">{`${
                  card.count
                }개 | 크리에이터 : ${
                  card.isMe ? "나" : card.owner.username
                }`}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default CardsComponentM1;
