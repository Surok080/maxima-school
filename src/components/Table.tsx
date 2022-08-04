import React, { useEffect, useState } from 'react';
import usePagination from '../app/hooks/usePagination';
import { useSelector, useDispatch } from 'react-redux';
import { idDeletePerson } from '../store';

const Table = ({ data }: any) => {
  const [resultDataPeople, setDataPeople] = useState<any>(data.data);
  const [filterDataPeople, setFilterDataPeople] = useState(resultDataPeople);
  const [loading, setLoading] = useState(true);
  const [directionSort, setDirectionSort] = useState(true);
  const [modalDelete, setModalDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [numberPagination, setNumberPagination] = useState('5');

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
    contentPerPage: numberPagination,
    count: data.data.length,
  });




  const filterBooks = (text: string) => {
    let copyData = resultDataPeople.concat();

    console.log(searchText);
    if (searchText) {
      copyData = filterDataPeople.filter(({ first_name }: any) =>
        first_name.toLowerCase().includes(searchText.toLowerCase())
      )
      setDataPeople(copyData)
    } else {

    }
  }

  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.counter.length) {
      deleteItem(state.counter)
    }
    setLoading(false)
  }, []);



  useEffect(() => {
    const Debounce = setTimeout(() => {
      filterBooks(searchText);
    }, 200);

    return () => clearTimeout(Debounce);
  }, [searchText]);

  const sortData = (event: string) => {
    const copyData = resultDataPeople.concat();
    let sortDataPeople;

    if (directionSort) {
      sortDataPeople = copyData.sort(
        (a: any, b: any) => a[event] > b[event] ? 1 : -1)
    } else {
      sortDataPeople = copyData.reverse(
        (a: any, b: any) => a[event] > b[event] ? 1 : -1)
    }
    setDataPeople(sortDataPeople);
    setDirectionSort(!directionSort);
  }

  const deleteItem = (id: any) => {
    let arrayDeleteId: any = [];
    if (!id.length) {
      arrayDeleteId.push(id)
    } else {
      arrayDeleteId = id;
    }

    if (arrayDeleteId.length >= 1) {
      let copyData = resultDataPeople.concat();
      let resulDeletItem = copyData;
      arrayDeleteId.forEach((element: number) => {
        resulDeletItem = copyData.filter(function (item: any) {
          return item.id !== element;
        });
        dispatch(idDeletePerson(id));
        copyData = resulDeletItem;
      });
      setDataPeople(resulDeletItem)
    }
    setModalDelete(false);
  }

  return (
    <>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="App">
          {modalDelete ? <div className='modal'>
            <div className='modal__window'>
              <p>Вы уверены что хотите удалить?</p>
              <div className='buttonsContent'>
                <button
                  onClick={() => deleteItem(modalDelete)}
                >Да</button>
                <button
                  onClick={() => setModalDelete(false)}
                > Нет</button>
              </div>
            </div>
          </div> : null}


          <h1 className="title">Pagination</h1>
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
            <h3 className="title">Удаленные id хранятся в redux: {state.counter.join()}</h3>
            <div className="items">
              <form className='searchForm'>
                <label>
                  Поиск по имени:
                  <input type="text" name="name" onChange={(event) => setSearchText(event.target.value)} />
                </label>
              </form>
              <select
                  onChange={(event) => setNumberPagination(event.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                Элементов на странице
              <div className="categories">
                {data.structure.map((element: string, key: number) => {
                  return (
                    <div key={key} className='tableColumn'>
                      <div
                        className='category'
                        onClick={() => sortData(element)}
                      >{element}</div>
                      {resultDataPeople
                        .slice(firstContentIndex, lastContentIndex)
                        .map((item: any, key: number) => {
                          return (
                            <div key={key} className='item'>{item[element]}
                              {(element === 'id') ?
                                <button
                                  className='deleteButton'
                                  onClick={() => setModalDelete(item.id)}
                                >
                                  x
                                </button> : null}
                            </div>
                          )
                        }
                        )}
                    </div>
                  )
                })
                }
              </div>

            </div>
          </>
        </div>
      )}
    </>
  );
}

export default Table;
