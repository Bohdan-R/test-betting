import _ from 'lodash';
import { EBetType, Bet, EBetTypeRate, EBetIcon, EColor, BetItem } from '@/types/index';

export const getRandomBetType = (): EBetType => {
  const rand = Math.random() * 100;

  if (rand < 40) return EBetType.RED;
  if (rand < 80) return EBetType.BLACK;
  if (rand < 95) return EBetType.JOKER;
  return EBetType.GREEN;
};

export const generateRandomBets = (length: number): Bet[] => {
  const bets: Bet[] = [];
  for (let i = 1; i <= length; i++) {
    const type = getRandomBetType();
    const randomSum = Math.random() * 200 + 1;
    const bet: Bet = {
      id: i,
      type: type,
      rate: EBetTypeRate[type.toUpperCase() as keyof typeof EBetTypeRate],
      sum: randomSum,
      name: `User ${i}`,
    };
    bets.push(bet);
  }
  return bets;
};

export const groupBetsByType = (bets: Bet[]): Record<EBetType, Bet[]> => {
  const grouped: Record<EBetType, Bet[]> = {
    [EBetType.RED]: [],
    [EBetType.BLACK]: [],
    [EBetType.GREEN]: [],
    [EBetType.JOKER]: [],
  };

  bets.forEach((bet) => {
    grouped[bet.type].push(bet);
  });

  grouped[EBetType.RED] = grouped[EBetType.RED].sort((a, b) => b.sum - a.sum);
  grouped[EBetType.BLACK] = grouped[EBetType.BLACK].sort((a, b) => b.sum - a.sum);
  grouped[EBetType.GREEN] = grouped[EBetType.GREEN].sort((a, b) => b.sum - a.sum);
  grouped[EBetType.JOKER] = grouped[EBetType.JOKER].sort((a, b) => b.sum - a.sum);

  return grouped;
};

export const getRandomWinningBetType = (): EBetIcon => {
  const rand = Math.random() * 100;

  if (rand < 85) return EBetIcon.SLASH;
  return EBetIcon.JOKER;
};

export const getRandomWinningBetColor = (): EColor => {
  const rand = Math.random() * 100;

  if (rand < 45) return EColor.RED;
  if (rand < 90) return EColor.BLACK;
  return EColor.GREEN;
};

export const generateRandomWinningBets = (length: number): BetItem[] => {
  const bets: BetItem[] = [];
  for (let i = 1; i <= length; i++) {
    const type = getRandomWinningBetType();
    const color = getRandomWinningBetColor();
    const bet: BetItem = {
      id: i,
      type: type,
      color: color,
    };
    bets.push(bet);
  }
  return bets;
};

export const groupWinningBets = (bets: BetItem[]): Record<EBetType, BetItem[]> => {
  return bets.reduce(
    (acc, bet) => {
      if (bet.type === EBetIcon.JOKER) {
        acc.joker.push(bet);
      } else {
        if (bet.color === EColor.GREEN) acc.green.push(bet);
        if (bet.color === EColor.RED) acc.red.push(bet);
        if (bet.color === EColor.BLACK) acc.black.push(bet);
      }
      return acc;
    },
    {
      [EBetType.JOKER]: [],
      [EBetType.GREEN]: [],
      [EBetType.RED]: [],
      [EBetType.BLACK]: [],
    } as Record<EBetType, BetItem[]>
  );
};
