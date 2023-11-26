'use client'
import classNames from "classnames";

export default function Pagination(props: {
  maxPage: number,
  currentPage: number,
}) {
  const { maxPage, currentPage } = props;
  
  if(maxPage < 5) {
    // ページ数が5未満の場合、全ページ表示
    // 例：[1][2][3][4]
    const pages = Array.from({length: maxPage}, (_, i) => i+1)
    return(
      <nav className="pagination">
        <ul className="pagination-list">
          {pages.map((page) => (
            <PaginationLink
              currentPage={ currentPage }
              page={ page }
            />
          ))}
        </ul>
      </nav>
    )
  } else if(currentPage <= 3) {
    // 最初から3ページ以内を表示中の場合、
    // 最初の3ページを表示し、最後のみ省略
    // 例：[1][2][3]...[10]
    const pages = [1, 2, 3]
    return(
      <nav className="pagination">
        <ul className="pagination-list">
          {pages.map((page) => (
            <PaginationLink
              currentPage={ currentPage }
              page={ page }
            />
          ))}

          <li><span className="pagination-ellipsis">&hellip;</span></li>
        
          <PaginationLink
            currentPage={ currentPage }
            page={ maxPage }
          />
        </ul>
      </nav>
    )
  } else if (maxPage-2 <= currentPage) {
    // 最後から3ページ以内を表示中の場合、
    // 最後の3ページを表示し、最初だけ省略
    // 例：[1]...[8][9][10]
    const pages = [maxPage-2, maxPage-1, maxPage]
    return(
      <nav className="pagination">
        <ul className="pagination-list">
          <PaginationLink
            currentPage={ currentPage }
            page={ 1 }
          />

          <li><span className="pagination-ellipsis">&hellip;</span></li>

          {pages.map((page) => (
            <PaginationLink
              currentPage={ currentPage }
              page={ page }
            />
          ))}
        </ul>
      </nav>
    )
  } else {
    // 前後3ページを表示し、最初と最後を省略
    // 例：[1]...[4][5][6]...[10]
    const pages = [currentPage-1, currentPage, currentPage+1]
    return(
      <nav className="pagination">
        <ul className="pagination-list">
          <PaginationLink
            currentPage={ currentPage }
            page={ 1 }
          />

          <li><span className="pagination-ellipsis">&hellip;</span></li>

          {pages.map((page) => (
            <PaginationLink
              currentPage={ currentPage }
              page={ page }
            />
          ))}

          <li><span className="pagination-ellipsis">&hellip;</span></li>

          <PaginationLink
            currentPage={ currentPage }
            page={ maxPage }
          />
        </ul>
      </nav>
    )
  }
}

function PaginationLink(props: {
  currentPage: number,
  page: number
}) {
  const { currentPage, page } = props;
  return(
    <li>
      <a
        className={classNames(
          "pagination-link",
          { "is-current": page===currentPage }
        )}
        href={`?page=${page}`}
      >
        { page }
      </a>
    </li>
  )
}