export type Coordinates = {
  x: number;
  y: number;
};

export enum Mask {
  Hidden,
  Default,
  Flag,
  Question,
}

export type Smile = "start" | "win" | "error" | "loser";

export type FieldProps = {
  setMines: React.Dispatch<React.SetStateAction<number>>;
  setSmile: React.Dispatch<React.SetStateAction<Smile>>;
};

export type CounterProps = {
  smile: Smile;
  mines: number;
  setSmile: React.Dispatch<React.SetStateAction<Smile>>;
};

export const mapMask: Record<Mask, React.ReactNode> = {
  [Mask.Hidden]: true,
  [Mask.Default]: "",
  [Mask.Flag]: "🚩",
  [Mask.Question]: "?",
};

interface Smiles {
  start: string;
  win: string;
  error: string;
  loser: string;
}

export type T = keyof Smiles;
