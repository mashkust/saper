import { bomb, countBombs, size } from "./const";

const inc = (field: number[], size: number, x: number, y: number) => {
  if (x >= 0 && y >= 0 && x < size && y < size) {
    if (field[y * size + x] !== bomb) {
      field[y * size + x] = 1 + field[y * size + x];
    }
  }
};

const getCells = (field: number[], size: number, x: number, y: number) => {
  inc(field, size, x + 1, y);
  inc(field, size, x - 1, y);
  inc(field, size, x, y + 1);
  inc(field, size, x, y - 1);
  inc(field, size, x + 1, y - 1);
  inc(field, size, x - 1, y - 1);
  inc(field, size, x + 1, y + 1);
  inc(field, size, x - 1, y + 1);
};

export const getField = () => {
  const field: number[] = new Array(size * size).fill(0);

  for (let i = 0; i < countBombs; ) {
    //рандомно расставляет бомбы
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    //если нет бомбы, добавить
    if (field[y * size + x] !== bomb) {
      field[y * size + x] = bomb;
      i = i + 1;
      //определеяет ячейки вокруг бомбы
      getCells(field, size, x, y);
    }
  }

  return field;
};
