import css from "./Pagination.module.css";

import ReactPaginate from "react-paginate";

interface PaginationProps {
    onPageChange: (page: number) => void,
    currentPage: number,
    totalNumberPages: number
}

export default function Pagination({ onPageChange, currentPage, totalNumberPages }: PaginationProps) {
    return (
        <ReactPaginate
          nextLabel="→"
          onPageChange={({ selected }) => onPageChange(selected + 1)}
          forcePage={currentPage - 1}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalNumberPages}
          previousLabel="←"
          containerClassName={css.pagination}
          activeClassName={css.active}
        />
    );
}