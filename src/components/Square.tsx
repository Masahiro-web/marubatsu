import React from 'react';

type Player = '○' | '×' | null;

interface SquareProps {
  value: Player;
  onClick: () => void;
  isWinningSquare?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare = false }) => {  return (
    <button
      className={`w-full aspect-square flex items-center justify-center text-4xl font-bold border border-gray-300 focus:outline-none transition-all
        ${!value ? 'hover:bg-gray-100' : ''} 
        ${isWinningSquare ? 'bg-green-200' : 'bg-white'}
        ${value === '○' ? 'text-green-500' : ''}
        ${value === '×' ? 'text-red-500' : ''}`}
      onClick={onClick}
      disabled={!!value}
      aria-label={value ? `マス目: ${value}` : 'クリックして印をつける'}
    >
      {value}
    </button>
  );
};

export default Square;
