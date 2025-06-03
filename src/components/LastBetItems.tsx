import { FC } from 'react';
import { EBetIcon, EColor, BetItem } from '../types/index';
import { BetBar } from './BetBar';

type LastBetItemsProps = {
  bets: BetItem[];
};

export const LastBetItems: FC<LastBetItemsProps> = ({ bets }) => {
  return (
    <div className="flex ">
      {bets.map((b) => {
        const iconSize = b.type === EBetIcon.JOKER ? { width: 18, height: 18 } : { width: 16, height: 7 };
        return (
          <div key={b.id} className="mr-1 last:mr-0">
            <BetBar color={b.color as EColor} iconType={b.type} size={32} iconSize={iconSize} />
          </div>
        );
      })}
    </div>
  );
};
