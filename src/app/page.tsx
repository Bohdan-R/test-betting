'use client';
import { BetTable } from '@/components/BetTable';
import Chip from '@/icons/chip.svg';

import { useEffect, useState } from 'react';
import { generateRandomBets, groupBetsByType, generateRandomWinningBets, groupWinningBets } from '@/helpers/index';
import { Bet, BetItem, EBetType } from '@/types/index';
import { LastTotalBet } from '@/components/LastTotalBet';
import { LastBetItems } from '@/components/LastBetItems';
import { SlotReel } from '@/components/SlotReel';

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [winningBets, setWinningBets] = useState<BetItem[]>([]);

  useEffect(() => {
    const randomBets = generateRandomBets(30);
    const randomWinningBets = generateRandomWinningBets(100);

    setBets(randomBets);
    setWinningBets(randomWinningBets);
  }, []);

  const groupedBets = groupBetsByType(bets);
  const groupedWinningBets = groupWinningBets(winningBets.slice(-100));

  const setNewWinningBet = (bet: BetItem) => {
    setWinningBets((prev) => [...prev, { ...bet, id: prev.length + 1 }]);
  };

  return (
    <div className="max-w-[1280px] w-full mx-auto py-5  px-5 xl:px-0 flex flex-col">
      <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-10 gap-4 md:gap-0">
        <LastTotalBet bets={groupedWinningBets} />
        <LastBetItems bets={winningBets.slice(-10)} />
      </div>
      <div className="mb-12">
        <SlotReel setNewWinningBet={setNewWinningBet} />
      </div>
      <div className="max-w-[500px] w-full flex justify-between items-center mx-auto mb-10">
        <Chip width={16} height={16} />
        <div className="flex">
          <div className="w-[51px] h-[36px] rounded-lg bg-dark4 mr-1"></div>
          <div className="w-[51px] h-[36px] rounded-lg bg-dark4 mr-1"></div>
          <div className="w-[51px] h-[36px] rounded-lg bg-dark4 "></div>
        </div>
      </div>
      <div className="w-[308px] md:w-[636px] lg:w-full mx-auto grid md:gap-5  lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(groupedBets).map((b) => {
          const betType = b[0] as EBetType;
          return <BetTable key={betType} betType={betType} bets={b[1]} />;
        })}
      </div>
    </div>
  );
}
