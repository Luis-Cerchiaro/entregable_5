const paginateData = (items, currentPage) => {
  //? Cantidad de items por pagina.
  const ITEMS_PER_PAGE = 20;

  //? los items de la pagina actual.
  const sliceEnd = ITEMS_PER_PAGE * currentPage;
  const sliceStart = sliceEnd - ITEMS_PER_PAGE;
  const itemsInCurrentPage = items.slice(sliceStart, sliceEnd);

  //? Ultima pagina
  const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE);

  //? BLOQUE ACTUAL
  const PAGE_PER_BLOCK = 5;
  const actualBlock = Math.ceil(currentPage / PAGE_PER_BLOCK);

  //? PAGINAS QUE SE VAN A MOSTRAR EN EL BLOQUE ACTUAL
  const pagesInCurrentBlock = [];
  const maxPage = actualBlock * PAGE_PER_BLOCK;
  const minPage = maxPage - PAGE_PER_BLOCK + 1;
  for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastPage) {
      pagesInCurrentBlock.push(i);
    }
  }

  return {
    itemsInCurrentPage,
    pagesInCurrentBlock,
    lastPage,
  };
};
export { paginateData };
