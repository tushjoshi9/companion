export function usePagination(listItem: any, todosPerPage: number, currentPage: number) {
  let noOfPages = Math.floor(listItem.length / todosPerPage);
  let itemsToLoad = listItem.slice(todosPerPage * currentPage, (todosPerPage * currentPage) + todosPerPage)
  return {
    noOfPages,
    itemsToLoad
  }
}