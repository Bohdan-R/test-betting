import { FC } from 'react';
import Chip from '@/icons/chip.svg';
import Diamond from '@/icons/diamond.svg';
import { EBetType, EBetTypeRate, Bet } from '@/types/index';

type BetTableProps = {
  betType: EBetType;
  bets: Bet[];
};

export const BetTable: FC<BetTableProps> = ({ betType, bets }) => {
  const rate = EBetTypeRate[betType.toUpperCase() as keyof typeof EBetTypeRate];
  const betsLength = bets.length;
  const betsTotal = bets.reduce((total, b) => total + b.sum, 0).toFixed(2);

  const betTypeString = `BET ON ${betType.toUpperCase()}`;
  const rateString = `PAYS ${rate}`;
  const betsLengthString = `${betsLength} Bets total`;

  return (
    <div className="flex flex-col max-w-[308px] w-full ">
      <div
        className={`flex justify-between w-full h-11 py-3 px-4 text-white text-sm leading-5 font-bold rounded-lg border-t border-solid border-white-shadow2
          ${betType === EBetType.RED ? 'bg-primary-red' : ''}
          ${betType === EBetType.BLACK ? 'bg-dark4' : ''}
          ${betType === EBetType.GREEN ? 'bg-primary-green' : ''}
          ${betType === EBetType.JOKER ? 'bg-primary-purple' : ''}`}
      >
        <span>{betTypeString}</span>
        <span>{rateString}</span>
      </div>
      <div className="flex justify-between p-3 text-primary-80 font-medium text-sm leading-5">
        <span>{betsLengthString}</span>
        <div className="flex items-center">
          <Chip width={18} height={18} />
          <span className="ml-2 text-primary">{betsTotal}</span>
        </div>
      </div>
      <div className="flex flex-col text-primary-80 font-medium text-sm leading-5">
        {bets.map((b) => (
          <div
            key={b.id}
            className="flex justify-between p-3 bg-dark2 hover:bg-dark3 first:rounded-t-lg last:rounded-b-lg"
          >
            <div className="flex items-center ml-4">
              <Diamond width={10} height={16} />
              <span className="ml-2">{b.name}</span>
            </div>
            <div className="flex items-center">
              <Chip width={18} height={18} />
              <span className="ml-2">{b.sum.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
