import Pagination from "react-js-pagination";
function PageNationComponent({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) {
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        onChange={onPageChange}
        prevPageText="‹"
        nextPageText="›"
        firstPageText="«"
        lastPageText="»"
        innerClass="flex gap-2"
        itemClass="rounded-2xl"
        linkClass="w-8 h-8 flex items-center justify-center text-gray-700 rounded-full transition-colors duration-200 hover:bg-gray-200"
        activeClass="bg-[#4f46e5]"
        activeLinkClass="text-white"
      />
    </div>
  );
}
export default PageNationComponent;
