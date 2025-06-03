import React, { FC, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BetBar } from './BetBar';
import { EColor, EBetIcon, BetItem } from '@/types';

const betBar: BetItem[] = [
  { id: 1, type: EBetIcon.SLASH, color: EColor.RED },
  { id: 2, type: EBetIcon.SLASH, color: EColor.BLACK },
  { id: 3, type: EBetIcon.SLASH, color: EColor.RED },
  { id: 4, type: EBetIcon.SLASH, color: EColor.BLACK },
  { id: 5, type: EBetIcon.SLASH, color: EColor.RED },
  { id: 6, type: EBetIcon.JOKER, color: EColor.BLACK },
  { id: 7, type: EBetIcon.SLASH, color: EColor.GREEN },
  { id: 8, type: EBetIcon.JOKER, color: EColor.RED },
  { id: 9, type: EBetIcon.SLASH, color: EColor.BLACK },
  { id: 10, type: EBetIcon.SLASH, color: EColor.RED },
  { id: 11, type: EBetIcon.SLASH, color: EColor.BLACK },
  { id: 12, type: EBetIcon.SLASH, color: EColor.RED },
  { id: 13, type: EBetIcon.SLASH, color: EColor.BLACK },
];

type SlotReelProps = {
  setNewWinningBet: (bet: BetItem) => void;
};

export const SlotReel: FC<SlotReelProps> = ({ setNewWinningBet }) => {
  const controls = useAnimation();

  const cardWidth = 108;
  const visibleCount = 13;
  const loopCount = 20;
  const extendedCards = Array(loopCount).fill(betBar).flat();
  const totalCards = extendedCards.length;

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(Math.floor(totalCards / 2));

  const centerOffset = Math.floor(visibleCount / 2);
  const initialX = -1 * (currentIndexRef.current - centerOffset) * cardWidth;

  const lastXRef = useRef(initialX);

  const [spinning, setSpinning] = useState(false);
  const [margin, setMargin] = useState<number | null>(null);
  const [nextSpinTime, setNextSpinTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateMargin = () => {
      if (slotRef.current) {
        const containerWidth = slotRef.current.offsetWidth;
        const totalWidth = visibleCount * cardWidth;
        const newMargin = (totalWidth - containerWidth) / 2;
        setMargin(newMargin > 0 ? newMargin : 0);
      }
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, []);

  useEffect(() => {
    scheduleNextSpin();

    intervalIdRef.current = setInterval(() => {
      spin();
      scheduleNextSpin();
    }, 60000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const scheduleNextSpin = () => {
    const nextTime = new Date(Date.now() + 60000);
    setNextSpinTime(nextTime);
  };

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}.${m}`;
  };

  const spin = async () => {
    if (spinning) return;

    if (currentIndexRef.current > totalCards - betBar.length * 10) {
      const midpoint = Math.floor(totalCards / 2);
      currentIndexRef.current = midpoint;
      lastXRef.current = -1 * (midpoint - centerOffset) * cardWidth;
      await controls.set({ x: lastXRef.current });
    }
    setSpinning(true);

    const randomOffset = Math.floor(Math.random() * betBar.length);
    const targetIndex = currentIndexRef.current + betBar.length * 3 + randomOffset;
    currentIndexRef.current = targetIndex;
    const centerIndex = targetIndex;
    const centeredItem = extendedCards[centerIndex];

    setTimeout(() => {
      setNewWinningBet(centeredItem);
      setSpinning(false);
    }, 3000);

    const targetX = -1 * (targetIndex - centerOffset) * cardWidth;

    await controls.start({
      x: targetX,
      transition: {
        duration: 3,
        ease: [0.1, 0.6, 0.3, 1],
      },
    });

    lastXRef.current = targetX;
    setSpinning(false);
  };

  return (
    <>
      {!margin && <div className="w-[1280px] h-[100px] bg-gray-200 animate-pulse rounded-lg"></div>}
      <div ref={slotRef} className="relative max-w-[1280px] w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,_#151619_0%,_rgba(20,21,28,0.5)_10%,_rgba(20,21,28,0.5)_90%,_#151619_100%)]" />
        {!spinning && nextSpinTime && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col text-white pointer-events-none ">
            <span className="font-medium text-sm leading-5">ROLLING IN:</span>
            <span className="font-bold text-xl leading-7 text-center">{formatTime(nextSpinTime)}</span>
          </div>
        )}
        {margin !== null && (
          <motion.div
            className="flex"
            animate={controls}
            initial={{ x: initialX }}
            style={{ marginLeft: `-${margin}px`, width: extendedCards.length * cardWidth }}
          >
            {extendedCards.map((b, i) => {
              const iconSize = b.type === EBetIcon.JOKER ? { width: 56, height: 56 } : { width: 50, height: 22 };
              return (
                <div key={i} className="mx-1" style={{ width: `${cardWidth}px` }}>
                  <BetBar color={b.color} iconType={b.type} size={100} iconSize={iconSize} />
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </>
  );
};
