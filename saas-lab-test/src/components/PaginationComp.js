import React from 'react'
import classnames from 'classnames';
import { DOTS, pageCountUtil } from '../utils';

const PaginationComp = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = pageCountUtil({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

 
  if (currentPage === 0 || paginationRange?.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <ul
      className='pagination-container'
    >
       
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
     
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        disabled= {currentPage === lastPage}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default PaginationComp;



