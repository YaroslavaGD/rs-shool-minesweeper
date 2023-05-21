import { GRID_PARAMS } from "./app-params";

export const createCell = (id, rowIndex, columnIndex, value) => {
  const buttonCell = document.createElement('button');
  buttonCell.classList.add('cell');

  buttonCell.dataset.id = id;
  buttonCell.dataset.row = rowIndex;
  buttonCell.dataset.column = columnIndex;
  buttonCell.dataset.value = value;
  buttonCell.dataset.open = false;


  const number = document.createElement('span');
  number.classList.add('cell__number');

  switch (value) {
    case 'x' :
      buttonCell.classList.add('cell--bomb');
      buttonCell.dataset.type = 'bomb';
      break;
    case 0 :
      buttonCell.dataset.type = 'empty';
      break;
    default:
      buttonCell.dataset.type = 'number';
      number.innerText = value;
  }
    
  buttonCell.append(number);

  return buttonCell;
};

export const getCellParameters = (cell) => {
  return {
    id: cell.dataset.id,
    row: cell.dataset.row,
    column: cell.dataset.column,
    type: cell.dataset.type,
    open: (cell.dataset.open === 'true'),
  }
}

export const calculateAreaIndexes = (currentRow, currentColumn) => {
  let row = currentRow;
  let column = currentColumn;
  if ((typeof row) === 'string') row = Number(row);
  if ((typeof column) === 'string') column = Number(column);

  const cellAreaIndexes = {
    left: [row, column - 1],
    right: [row, column + 1],
    top: [row - 1, column],
    topLeft: [row - 1, column - 1],
    topRight: [row - 1, column + 1],
    bottom: [row + 1, column],
    bottomLeft: [row + 1, column - 1],
    bottomRight: [row + 1, column + 1]
  };

  for (let key in cellAreaIndexes) {
    let newRow = cellAreaIndexes[key][0];
    let newColumn = cellAreaIndexes[key][1];

    //-1 - incorrect value
    if ((newRow < 0) || (newRow >= GRID_PARAMS.numCells)) newRow = -1;
    if ((newColumn < 0) || (newColumn >= GRID_PARAMS.numCells)) newColumn = -1;

    cellAreaIndexes[key][0] = newRow;
    cellAreaIndexes[key][1] = newColumn;
  }

  return cellAreaIndexes;
}

export const openCell = (cell, isOpen) => {
  cell.dataset.open = isOpen;
  cell.classList.add('cell--active');
}