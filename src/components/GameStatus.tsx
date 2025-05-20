import React from 'react';

type Player = '○' | '×' | null;

interface GameStatusProps {
  currentPlayer: '○' | '×';
  winner: Player;
  isGameOver: boolean;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ currentPlayer, winner, isGameOver, onReset }) => {
  const renderPlayer = (player: Player) => {
    if (player === '○') {
      return <span className="text-green-500">{player}</span>;
    } else if (player === '×') {
      return <span className="text-red-500">{player}</span>;
    }
    return player;
  };

  let status: React.ReactNode;

  if (winner) {
    status = <>勝者: {renderPlayer(winner)}</>;
  } else if (isGameOver) {
    status = '引き分け';
  } else {
    status = <>次のプレイヤー: {renderPlayer(currentPlayer)}</>;
  }

  return (
    <div className="mt-4 text-center">
      <div className="text-xl font-bold mb-4">{status}</div>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={onReset}
      >
        ゲームをリセット
      </button>
    </div>
  );
};

export default GameStatus;
