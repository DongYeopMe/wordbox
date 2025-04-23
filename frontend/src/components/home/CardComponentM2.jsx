import stubData from "../../data/cardStub";
import { NavLink } from "react-router-dom";

function CardComponentM2({ subject }) {
  return (
    <div className="max-w-full h-[200px]">
      <div className="h-full flex flex-col px-4 gap-y-2">
        <div className="">
          <span className="font-bold block">{subject}</span>
        </div>
        <div className=" h-full flex flex-row w-full gap-3">
          {stubData.slice(0, 3).map((card) => (
            <NavLink key={card.id} to={card.id} className="w-1/3">
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
          ))}
        </div>
      </div>
    </div>
  );
}
export default CardComponentM2;
