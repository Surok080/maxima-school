import React from 'react';
import usePagination from '../app/hooks/usePagination';



const Table = ({data}: any)=>  {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 20,
    count: data.data.length,
  });
    return (
      <div className="App">
      <h1 className="title">usePagination()</h1>
      
        <>
          <div className="pagination">
            <p className="text">
              {page}/{totalPages}
            </p>
            <button
              onClick={prevPage}
              className={`page ${page === 1 && "disabled"}`}
            >
              &larr;
            </button>
            <button
              onClick={() => setPage(1)}
              className={`page ${page === 1 && "disabled"}`}
            >
              1
            </button>
            {gaps.before ? "..." : null}
            {gaps.paginationGroup.map((el) => (
              <button
                onClick={() => setPage(el)}
                key={el}
                className={`page ${page === el ? "active" : ""}`}
              >
                {el}
              </button>
            ))}
            {gaps.after ? "..." : null}
            <button
              onClick={() => setPage(totalPages)}
              className={`page ${page === totalPages && "disabled"}`}
            >
              {totalPages}
            </button>
            <button
              onClick={nextPage}
              className={`page ${page === totalPages && "disabled"}`}
            >
              &rarr;
            </button>
          </div>
          <div className="items">
            {data.data
              .slice(firstContentIndex, lastContentIndex)
              .map((el: any) => (
                <div className="item" key={el.uid}>
                  {/* <img
                    src={`https://avatars.dicebear.com/api/big-smile/${el.first_name}.svg`}
                    alt={`${el.username} profile`}
                    className="item__img"
                  /> */}
                  <div className="item__info">
                    <p className="name">
                      {el.blend_name} {el.origin}{" "}
                      <span className="username">(@{el.variety})</span>
                    </p>
                    <p className="job">{el.notes}</p>
                    {/* <p
                      className={`status ${
                        el.subscription.status.toLowerCase() === "active"
                          ? "success"
                          : el.subscription.status.toLowerCase() === "blocked"
                          ? "danger"
                          : "warn"
                      }`}
                    >
                      {el.subscription.status}
                    </p> */}
                  </div>
                </div>
              ))}
          </div>
        </>
    </div>
    );
}

export default Table;
