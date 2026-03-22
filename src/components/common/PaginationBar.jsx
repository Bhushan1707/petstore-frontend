import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {pages}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};

export default PaginationBar;
