import "./App.css";
import FieldComponent from "./ components/field-map/field-map";
import CounterComponent from "./ components/counter/counter";
import { useState } from "react";
import { Smile } from "./type";

function App() {
  const [mines, setMines] = useState(40);
  const [smile, setSmile] = useState<Smile>("start");

  return (
    <div className="App">
      <CounterComponent smile={smile} mines={mines} setSmile={setSmile} />
      <FieldComponent setMines={setMines} setSmile={setSmile} />
    </div>
  );
}

export default App;
