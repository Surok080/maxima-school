import React, { useState, useEffect } from "react";
interface Gap {
  before: boolean;
  paginationGroup: number[];
  after: boolean;
}
const usePagination: UsePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  // Три точки не вмещающихся номер страниц
  const [gaps, setGaps] = useState<Gap>({
    before: false,
    paginationGroup: [],
    after: true,
  });
  // общее количество страниц (общее количество элементов / контента на каждой странице)
  const pageCount = Math.ceil(count / contentPerPage);
  // index of last item of current page
  const lastContentIndex = page * contentPerPage;
  // индекс последнего элемента текущей страницы
  const firstContentIndex = lastContentIndex - contentPerPage;
  //Страницы между первой и последней страницами  
  const [pagesInBetween, setPagesInBetween] = useState<number[]>([]);

  useEffect(() => {
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2);
      setPagesInBetween(temp);
    }
  }, [pageCount]);

  // для установки промежутков между страницами в зависимости от положения текущей страницы
  ////и для установки пробелов в зависимости от положения текущей страницы
  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(page);
    let paginationGroup = [];
    let before = false;
    let after = false;
    if (page === 1) {
      paginationGroup = pagesInBetween.slice(0, 3);
    } else if (
      page === pageCount ||
      page === pageCount - 1 ||
      page === pageCount - 2
    ) {
      paginationGroup = pagesInBetween.slice(-3, pageCount);
    } else if (page === 2) {
      paginationGroup = pagesInBetween.slice(
        currentLocation,
        currentLocation + 3
      );
    } else {
      paginationGroup = [page - 1, page, page + 1];
    }
    if (pageCount <= 5) {
      before = false;
      after = false;
    } else {
      before = false;
      after = false;
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[2] < pageCount - 1) {
        after = true;
      }
    }
    setGaps({ paginationGroup, before, after });
  }, [page, pagesInBetween, pageCount]);

  // изменение страницы в зависимости от направления вперед или назад
  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        // если страница является последней страницей, ничего не делайте        
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        // если страница - это первая страница, ничего не делайте
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = (num: number) => {
    // если число больше, чем количество страниц, установите значение последняя страница
    if (num > pageCount) {
      setPage(pageCount);
      // если число меньше 1, установите страницу на первую страницу    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    gaps,
  };
};

export default usePagination;
