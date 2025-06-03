import { FC } from 'react';
import { EBetType, EBetIcon, EColor, BetItem } from '../types/index';
import { BetBar } from './BetBar';

type LastTotalBetProps = {
  bets: Record<EBetType, BetItem[]>;
};

export const LastTotalBet: FC<LastTotalBetProps> = ({ bets }) => {
  const orderedKeys: (keyof typeof bets)[] = [EBetType.RED, EBetType.BLACK, EBetType.GREEN, EBetType.JOKER];
  return (
    <div className="flex items-center text-sm leading-5 text-white font-bold">
      <span className="mr-2 text-white-shadow3 font-medium">LAST 100</span>
      <div className="w-[235px] flex justify-between">
        {orderedKeys.map((key) => {
          const amount = bets[key].length;
          const iconType = key === EBetType.JOKER ? EBetIcon.JOKER : EBetIcon.SLASH;
          const color = key === EBetType.JOKER ? EColor.PURPLE : (key as unknown as EColor);
          const iconSize = key === EBetType.JOKER ? { width: 14, height: 14 } : { width: 12, height: 6 };

          return (
            <div key={key} className="flex items-center">
              <BetBar iconType={iconType} color={color} size={24} iconSize={iconSize} />
              <span className="ml-2">{amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
