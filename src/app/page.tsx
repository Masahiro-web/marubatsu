'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Board from '../components/Board';
import GameStatus from '../components/GameStatus';
import GameSettings from '../components/GameSettings';
import { calculateWinner, isBoardFull } from '../utils/gameLogic';
import { calculateAIMove } from '../utils/aiPlayer';
import { type GameState, type GameMode, type AIDifficulty } from '../types';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    squares: Array(9).fill(null),
    currentPlayer: '○',
    winner: null,
    isGameOver: false,
    winningLine: null,
    gameMode: 'pvp',
    aiDifficulty: 'medium',
  });
  
  // AI対戦モードでAIのターンになった場合、自動的に手を選択
  useEffect(() => {
    if (
      gameState.gameMode === 'ai' && 
      gameState.currentPlayer === '×' && 
      !gameState.winner && 
      !gameState.isGameOver
    ) {
      // AIの手を少し遅らせる（より自然な感じにするため）
      const timer = setTimeout(() => {
        const aiMove = calculateAIMove(gameState.squares, gameState.aiDifficulty);
        handleClick(aiMove);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [
    gameState.currentPlayer, 
    gameState.gameMode, 
    gameState.isGameOver, 
    gameState.winner, 
    gameState.squares, 
    gameState.aiDifficulty, 
    handleClick
  ]);

  const handleClick = useCallback((i: number) => {
    setGameState(prevState => {
      // すでに埋まっている場合やゲームが終了している場合は何も変更しない
      if (prevState.squares[i] || prevState.winner || prevState.isGameOver) {
        return prevState;
      }

      // スクエアの状態を更新
      const newSquares = [...prevState.squares];
      newSquares[i] = prevState.currentPlayer;
      
      // 勝者判定
      const { winner, winningLine } = calculateWinner(newSquares);
      
      // 引き分け判定
      const boardFull = isBoardFull(newSquares);

      return {
        ...prevState,
        squares: newSquares,
        currentPlayer: prevState.currentPlayer === '○' ? '×' : '○',
        winner: winner,
        isGameOver: winner ? true : boardFull,
        winningLine: winningLine,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      squares: Array(9).fill(null),
      currentPlayer: '○',
      winner: null,
      isGameOver: false,
      winningLine: null,
    }));
  }, []);
  
  const handleGameModeChange = useCallback((mode: GameMode) => {
    setGameState(prevState => ({
      ...prevState,
      gameMode: mode,
      // ゲームモードを変更したときにボードをリセット
      squares: Array(9).fill(null),
      currentPlayer: '○',
      winner: null,
      isGameOver: false,
      winningLine: null,
    }));
  }, []);
  
  const handleAIDifficultyChange = useCallback((difficulty: AIDifficulty) => {
    setGameState(prevState => ({
      ...prevState,
      aiDifficulty: difficulty,
      // 難易度を変更したときにボードをリセット
      squares: Array(9).fill(null),
      currentPlayer: '○',
      winner: null,
      isGameOver: false,
      winningLine: null,
    }));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8">○×ゲーム</h1>
      
      <GameSettings
        gameMode={gameState.gameMode}
        aiDifficulty={gameState.aiDifficulty}
        onGameModeChange={handleGameModeChange}
        onAIDifficultyChange={handleAIDifficultyChange}
      />
      
      <Board 
        squares={gameState.squares} 
        onClick={handleClick} 
        winningLine={gameState.winningLine}
      />
      
      <GameStatus 
        currentPlayer={gameState.currentPlayer} 
        winner={gameState.winner} 
        isGameOver={gameState.isGameOver}
        onReset={resetGame}
      />
      
      <div className="h-6 mt-3">
        {gameState.gameMode === 'ai' && gameState.currentPlayer === '×' && !gameState.winner && !gameState.isGameOver && (
          <div className="text-blue-500 animate-pulse">AIが考え中...</div>
        )}
      </div>
    </main>
  );
}
