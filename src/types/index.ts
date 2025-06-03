export enum EColor {
  RED = 'red',
  BLACK = 'black',
  GREEN = 'green',
  PURPLE = 'purple',
}

export enum EBetIcon {
  SLASH = 'slash',
  JOKER = 'joker',
}

export enum EBetType {
  RED = 'red',
  BLACK = 'black',
  GREEN = 'green',
  JOKER = 'joker',
}

export enum EBetTypeRate {
  RED = '2X',
  BLACK = '2X',
  GREEN = '14X',
  JOKER = '7X',
}

export type BetItem = {
  id: number;
  type: EBetIcon;
  color: EColor;
};

export type Bet = {
  id: number;
  type: EBetType;
  rate: EBetTypeRate;
  sum: number;
  name: string;
};
