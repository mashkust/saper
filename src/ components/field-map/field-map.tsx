import React, { useEffect, useState } from "react";
import { bomb, size } from "../../const";
import { FieldProps, mapMask, Mask } from "../../type";
import { getField } from "../../utils";

const FieldMap = (fieldProps: FieldProps): JSX.Element => {
  const [loser, setLoser] = useState(false);
  //запоминаем созданное поле
  const [field, setField] = useState<number[]>(() => getField());
  //скрываем значения  по дефолту
  const [mask, setMask] = useState<Mask[]>(
    new Array(size * size).fill(Mask.Default)
  );

  const { setMines, setSmile } = fieldProps;
  const table = new Array(size).fill(true);

  const win = React.useMemo(
    //победа, когда нет мин, которые скрыты
    () => {
      const winArray = field.filter(
        (el, i) => el !== bomb && mask[i] !== Mask.Hidden
      );
      return winArray.length === 0 ? true : false;
    },
    [field, mask]
  );

  useEffect(() => {
    win && setSmile("win");
  }, [win]);

  const mouseDownHandler = () => {
    if (win || loser) return;
    setSmile("error");
  };

  const clickHandler = (x: number, y: number) => {
    //записываем на удаление маски
    const clear = (x: number, y: number) => {
      if (x >= 0 && x < size && y >= 0 && y < size) {
        if (mask[y * size + x] !== Mask.Hidden) {
          clearing.push([x, y]);
        }
      }
    };

    if (win || loser) return;

    //клик на бомбу
    if (field[y * size + x] === bomb) {
      //проверка на первый клик
      const defaultField = mask
        .slice()
        .filter((el, i) => mask[i] !== Mask.Default);
      if (defaultField.length === 0) {
        setField(() => getField());
        setSmile("start");
      } else {
        mask.forEach((el, i) => (mask[i] = Mask.Hidden));
        setLoser(true);
        setSmile("loser");
      }
      return;
    }

    setSmile("start");

    //если маски уже нет
    if (mask[y * size + x] === Mask.Hidden) return;

    const clearing: [number, number][] = [];

    clear(x, y);

    for (let j = 0; j < clearing.length; j++) {
      const [x, y] = clearing.pop() as [number, number];

      if (mask[y * size + x] === Mask.Flag) {
        setMines((prev) => prev + 1);
      }

      //убираем маску
      mask[y * size + x] = Mask.Hidden;

      if (field[y * size + x] === 0) {
        clear(x + 1, y);
        clear(x - 1, y);
        clear(x, y + 1);
        clear(x, y - 1);
      }
    }
    setMask((prev) => [...prev]);
  };

  const contextHandler = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    x: number,
    y: number
  ) => {
    evt.preventDefault();

    if (win || loser) return;
    setSmile("start");
    //расставляем флаг, вопрос
    if (mask[y * size + x] !== Mask.Hidden) {
      if (mask[y * size + x] === Mask.Default) {
        mask[y * size + x] = Mask.Flag;
        setMines((prev) => prev - 1);
      } else if (mask[y * size + x] === Mask.Flag) {
        mask[y * size + x] = Mask.Question;
        setMines((prev) => prev + 1);
      } else if (mask[y * size + x] === Mask.Question) {
        mask[y * size + x] = Mask.Default;
      }
      setMask((prev) => [...prev]);
    }
  };

  const getPicture = (x: number, y: number) => {
    return mask[y * size + x] !== Mask.Hidden
      ? mapMask[mask[y * size + x]]
      : field[y * size + x] === bomb
      ? "💣"
      : field[y * size + x];
  };

  return (
    <div
      style={{
        display: "flex",
        border: "solid 13px #d1cbcb",
      }}
    >
      {table.map((el, y) => {
        return (
          <div key={y} className="field">
            {table.map((el, x) => {
              return (
                <button
                  key={x}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "0px",
                    boxShadow:
                      "-13px -14px 0px -10px rgba(168, 172, 174, 0.44) inset",
                  }}
                  onMouseDown={mouseDownHandler}
                  onClick={() => clickHandler(x, y)}
                  onContextMenu={(evt) => contextHandler(evt, x, y)}
                >
                  {getPicture(x, y)}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default FieldMap;
