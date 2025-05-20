export type Player = '○' | '×' | null;
export type GameMode = 'pvp' | 'ai';
export type AIDifficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  squares: Player[];    // 9マスの状態を配列で管理
  currentPlayer: '○' | '×';
  winner: Player;
  isGameOver: boolean;
  winningLine: number[] | null;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
}
