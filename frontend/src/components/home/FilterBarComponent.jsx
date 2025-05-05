import { useState, useEffect, useRef } from "react";

function FilterBarComponent() {
  const SORT = {
    ASC: "최신순",
    DESC: "오래된순",
  };

  const FILTER = {
    NOMAL: "전체",
    CHECKED: "암기",
    NOCHECKED: "미암기",
  };
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [IsSort, setIsSort] = useState("ASC");
  const [IsFilter, setIsFilter] = useState("NOMAL");
  //DOM 요소 접근(위치)
  const sortRef = useRef(null);
  const filterRef = useRef(null);
  //모달창 boolean
  const toggleSortModal = () => {
    setShowSortModal((prev) => !prev);
    setShowFilterModal(false); // 다른 쪽은 닫기
  };

  const toggleFilterModal = () => {
    setShowFilterModal((prev) => !prev);
    setShowSortModal(false); // 다른 쪽은 닫기
  };
  // 옵션 선택
  const handleSortSelect = (key) => {
    setIsSort(key);
    toggleSortModal();
  };

  const handleFilterSelect = (key) => {
    setIsFilter(key);
    toggleFilterModal();
  };

  // 외부 클릭(SORT)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  //외부 클릭 (FILTER)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilterModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav>
      <div className="w-full flex flex-row gap-2 text-xs">
        <div className="relative w-20">
          <div
            ref={sortRef}
            className="flex items-center justify-center hover:bg-gray-400 rounded-full"
          >
            <button
              onClick={toggleSortModal}
              className="px-3 py-1 w-full whitespace-nowrap text-center cursor-pointer"
            >
              {SORT[IsSort]}
            </button>
          </div>
          {showSortModal && (
            <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow z-50 w-full py-1">
              {Object.entries(SORT).map(([key, value]) => (
                <div
                  key={key}
                  className="hover:bg-gray-200 cursor-pointer px-3 py-1 text-center "
                >
                  <button
                    onClick={() => {
                      handleSortSelect(key);
                    }}
                    className="cursor-pointer py-1"
                  >
                    {value}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 전체,암기,미암기 */}
        <div className="relative w-20">
          <div
            ref={filterRef}
            className="flex items-center justify-center hover:bg-gray-400 rounded-full "
          >
            <button
              onClick={toggleFilterModal}
              className="px-3 py-1 cursor-pointer"
            >
              {FILTER[IsFilter]}
            </button>
          </div>
          {showFilterModal && (
            <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow z-50 w-full py-1">
              {Object.entries(FILTER).map(([key, value]) => (
                <div
                  key={key}
                  className="hover:bg-gray-200 cursor-pointer px-3 py-1 text-center"
                >
                  <button
                    onClick={() => {
                      handleFilterSelect(key);
                    }}
                    className="cursor-pointer py-1"
                  >
                    {value}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default FilterBarComponent;
