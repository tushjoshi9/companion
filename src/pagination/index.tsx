export function usePagination(listItem: any, todosPerPage: number, currentPage: number) {
  let noOfPages = Math.ceil(listItem.length / todosPerPage);
  let itemsToLoad =
    noOfPages === 1 ? listItem :
      listItem.slice(todosPerPage * currentPage, (todosPerPage * currentPage) + todosPerPage)
  return {
    noOfPages,
    itemsToLoad
  }
}