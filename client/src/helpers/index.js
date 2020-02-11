export const paginator = (items, currentPage, itemsPerPage) => {
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  return items.slice(indexOfFirstTask, indexOfLastTask);
};
