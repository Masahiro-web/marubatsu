import React from 'react';
import Square from './Square';

type Player = '○' | '×' | null;

interface BoardProps {
  squares: Player[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine ? winningLine.includes(i) : false;
    
    return (
      <Square 
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
      />
    );
  };
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 gap-1">
        {Array(9).fill(null).map((_, i) => (
          <div key={i} className="aspect-square">
            {renderSquare(i)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
