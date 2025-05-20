import { type Player } from '../types';

// 勝利パターン: 横3列、縦3列、斜め2パターン
export const WINNING_PATTERNS = [
  [0, 1, 2], // 横一列目
  [3, 4, 5], // 横二列目
  [6, 7, 8], // 横三列目
  [0, 3, 6], // 縦一列目
  [1, 4, 7], // 縦二列目
  [2, 5, 8], // 縦三列目
  [0, 4, 8], // 斜め（左上から右下）
  [2, 4, 6], // 斜め（右上から左下）
];

// 勝者を判定する関数
export const calculateWinner = (squares: Player[]): { winner: Player; winningLine: number[] | null } => {
  for (const [a, b, c] of WINNING_PATTERNS) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: [a, b, c],
      };
    }
  }
  return {
    winner: null,
    winningLine: null,
  };
};

// 引き分けを判定する関数
export const isBoardFull = (squares: Player[]): boolean => {
  return !squares.includes(null);
};
