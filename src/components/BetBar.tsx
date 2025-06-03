import { FC } from 'react';
import Slash from '@/icons/slash.svg';
import Joker from '@/icons/joker.svg';
import { EBetIcon, EColor } from '../types/index';

type BetBarProps = {
  iconType: EBetIcon;
  color: EColor;
  size: number;
  iconSize: {
    width: number;
    height: number;
  };
};

export const BetBar: FC<BetBarProps> = ({ iconType, color, iconSize, size }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex justify-center items-center rounded-sm border-t border-solid border-white-shadow2
              ${color === EColor.RED ? 'bg-primary-red' : ''}
              ${color === EColor.BLACK ? 'bg-dark4' : ''}
              ${color === EColor.GREEN ? 'bg-primary-green' : ''}
              ${color === EColor.PURPLE ? 'bg-primary-purple' : ''}`}
    >
      {iconType === EBetIcon.JOKER ? (
        <Joker
          width={iconSize.width}
          height={iconSize.height}
          fill={`${color === EColor.RED ? '#14151C' : '#FFFFFF'}`}
        />
      ) : (
        <Slash
          width={iconSize.width}
          height={iconSize.height}
          fill={`${color === EColor.RED ? '#14151C' : '#FFFFFF'}`}
        />
      )}
    </div>
  );
};
