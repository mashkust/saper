import React, { useEffect, useState } from "react";
import { smiles } from "../../const";
import { CounterProps, T } from "../../type";

const CounterComponent = (counterProps: CounterProps) => {
  const [sec, setSec] = useState(0);
  const { mines, smile } = counterProps;
  const finish = smile === "loser" || smile === "win";

  useEffect(() => {
    if (finish) return;
    const interval = setInterval(() => {
      setSec(sec + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sec, finish]);

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "solid 13px #d1cbcb",
        borderBottom: "0px",
        gap: "98px",
        backgroundColor: " #f2eeee",
        boxShadow: " 16px 15px 1px -12px rgba(119, 124, 128, 0.79) inset",
      }}
    >
      <div
        style={{
          color: "red",
          fontSize: "40px",
          fontWeight: 700,
          backgroundColor: " black",
          width: "80px",
          textAlign: "end",
          border: "solid 4px grey",
          margin: "5px",
        }}
      >
        {mines}
      </div>
      <button
        style={{
          width: "78px",
          fontSize: "40px",
          margin: "5px",
          borderRadius: "0px",
          boxShadow: "-16px -16px 0px -10px rgba(168, 172, 174, 0.44) inset",
        }}
        onClick={restartGame}
      >
        {smiles[smile as T]}
      </button>
      <div
        style={{
          color: "red",
          fontSize: "40px",
          fontWeight: 700,
          backgroundColor: " black",
          width: "80px",
          textAlign: "end",
          border: "solid 4px grey",
          margin: "5px",
          overflowX: "hidden",
        }}
      >
        {sec}
      </div>
    </div>
  );
};

export default CounterComponent;
