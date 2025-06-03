import { FC } from 'react';
import { EBetType, EBetIcon, EColor, BetItem } from '../types/index';
import { BetBar } from './BetBar';

type LastTotalBetProps = {
  bets: Record<EBetType, BetItem[]>;
};

export const LastTotalBet: FC<LastTotalBetProps> = ({ bets }) => {
  return (
    <div className="flex items-center text-sm leading-5 text-white font-bold">
      <span className="mr-2 text-white-shadow3 font-medium">LAST 100</span>
      <div className="w-[235px] flex justify-between">
        {Object.entries(bets).map((b) => {
          const amount = b[1].length;
          const iconType = b[0] === EBetIcon.JOKER ? EBetIcon.JOKER : EBetIcon.SLASH;
          const color = b[0] === EBetIcon.JOKER ? EColor.PURPLE : (b[0] as EColor);
          const iconSize = b[0] === EBetIcon.JOKER ? { width: 14, height: 14 } : { width: 12, height: 6 };
          return (
            <div key={b[0]} className="flex items-center">
              <BetBar iconType={iconType} color={color} size={24} iconSize={iconSize} />
              <span className="ml-2">{amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
