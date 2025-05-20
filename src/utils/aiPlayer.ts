import { Player } from '../types';
import { calculateWinner, isBoardFull, WINNING_PATTERNS } from './gameLogic';

/**
 * AIプレイヤーが次の最適な手を計算する関数
 * 簡単なMiniMax戦略アルゴリズムを使用
 */
export const calculateAIMove = (squares: Player[], difficulty: 'easy' | 'medium' | 'hard' = 'medium'): number => {
  // 簡単モード: ランダムな位置を選ぶ (時々)
  if (difficulty === 'easy' && Math.random() < 0.6) {
    return getRandomMove(squares);
  }

  // 中級モード: 勝てるなら勝つ、負けそうならブロック、それ以外はMiniMaxか中央/角を優先
  if (difficulty === 'medium') {
    // まず勝てる手があるか確認
    const winMove = findWinningMove(squares, '×');
    if (winMove !== -1) return winMove;

    // 次に相手の勝ちをブロックする手
    const blockMove = findWinningMove(squares, '○');
    if (blockMove !== -1) return blockMove;

    // 中央が空いていれば中央を取る (○×ゲームでは中央は戦略的に重要)
    if (squares[4] === null) return 4;
    
    // 角が空いていれば角を取る
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => squares[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // それ以外はランダム
    return getRandomMove(squares);
  }

  // 難しいモード: Minimaxアルゴリズムを使用
  return getBestMove(squares);
};

/**
 * Minimaxアルゴリズムを使用して最適な手を見つける
 */
const getBestMove = (squares: Player[]): number => {
  // 空いているマス目を探す
  const availableMoves = squares
    .map((square, index) => (square === null ? index : -1))
    .filter(index => index !== -1);
    
  let bestScore = -Infinity;
  let bestMove = availableMoves[0]; // デフォルト値

  // それぞれの可能な手についてスコアを計算
  for (const move of availableMoves) {
    const newSquares = [...squares];
    newSquares[move] = '×'; // AIは×とする
    
    // この手を選んだ場合のスコアを計算
    const score = minimax(newSquares, 0, false);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  
  return bestMove;
};

/**
 * Minimaxアルゴリズム - 再帰的に最適な手を探索
 */
const minimax = (squares: Player[], depth: number, isMaximizing: boolean): number => {
  const { winner } = calculateWinner(squares);
  
  // 終了条件：勝者がいる場合
  if (winner === '×') return 10 - depth; // AIの勝ち (深さが浅いほど良い)
  if (winner === '○') return depth - 10; // プレイヤーの勝ち (深さが深いほど良い)
  if (isBoardFull(squares)) return 0;    // 引き分け
  
  if (isMaximizing) {
    // AIのターン (×): スコアを最大化
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newSquares = [...squares];
        newSquares[i] = '×';
        const score = minimax(newSquares, depth + 1, false);
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    // プレイヤーのターン (○): スコアを最小化
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newSquares = [...squares];
        newSquares[i] = '○';
        const score = minimax(newSquares, depth + 1, true);
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
};

/**
 * 勝てる手を見つける関数
 * @param squares 現在のゲームボード
 * @param player どのプレイヤーの勝ちを探すか
 * @returns 勝てる手の位置、なければ-1
 */
const findWinningMove = (squares: Player[], player: '○' | '×'): number => {
  // すべての勝利パターンをチェック
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;
    // 2つが埋まっていて、1つが空いているパターンを探す
    if (
      squares[a] === player &&
      squares[b] === player &&
      squares[c] === null
    ) {
      return c;
    }
    if (
      squares[a] === player &&
      squares[b] === null &&
      squares[c] === player
    ) {
      return b;
    }
    if (
      squares[a] === null &&
      squares[b] === player &&
      squares[c] === player
    ) {
      return a;
    }
  }
  return -1; // 勝てる手がない
};

/**
 * ランダムな空いている位置を選ぶ
 */
const getRandomMove = (squares: Player[]): number => {
  const availableMoves = squares
    .map((square, index) => (square === null ? index : -1))
    .filter(index => index !== -1);
  
  if (availableMoves.length === 0) return -1;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};
