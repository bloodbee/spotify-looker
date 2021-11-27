import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination(props) {
  // How many pagination elements do we need ?
  const pageCount = Math.ceil(parseFloat(props.total / props.limit))

  // Last page ?
  const isEndPage = parseFloat(props.total / (props.offset + props.limit)) <= 1.0 ? true : false

  // calculate the paginate forced index
  let paginateIndex = 0
  if (isEndPage) {
    paginateIndex = pageCount - 1
  } else {
    paginateIndex = ((props.offset + props.limit) / 50) - 1
  }

  /**
   * Called when user invoke a click on a pagination element
   * @param {Event} event 
   */
  const handlePageClick = (event) => {
    // call parent indexClicked method
    props.indexClicked(event.selected)
  }
  
  return (
    <div className="w-full bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <span className="text-sm">Showing {props.offset + 1} to {isEndPage ? props.total : (props.offset + props.limit)} of {props.total} results</span>
      <ReactPaginate
        containerClassName="sm:flex-1 sm:flex sm:items-center sm:justify-center"
        breakLabel="..."
        breakClassName="bg-gray-50 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        breakLinkClassName="hover:cursor-not-allowed"
        nextLabel=">"
        nextClassName="group relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:cursor-pointer"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageClassName="group bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:cursor-pointer"
        activeClassName="group z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:cursor-pointer"
        previousLabel="<"
        previousClassName="group relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:cursor-pointer"
        renderOnZeroPageCount={null}
        forcePage={paginateIndex}
      />
    </div>
  )
}
