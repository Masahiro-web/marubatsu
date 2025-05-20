import React, { useState } from 'react';
import { GameMode, AIDifficulty } from '../types';
import Modal from './Modal';

interface GameSettingsProps {
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  onGameModeChange: (mode: GameMode) => void;
  onAIDifficultyChange: (difficulty: AIDifficulty) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  gameMode,
  aiDifficulty,
  onGameModeChange,
  onAIDifficultyChange
}) => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <p className="font-medium mb-2 text-black">プレイモード：</p>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${gameMode === 'pvp' ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
            onClick={() => onGameModeChange('pvp')}
          >
            2人プレイ
          </button>
          <button
            className={`px-3 py-1 rounded ${gameMode === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
            onClick={() => onGameModeChange('ai')}
          >
            AI対戦
          </button>
        </div>
      </div>
      
      {gameMode === 'ai' && (
        <div>
          <div className="flex items-center mb-2">
            <p className="font-medium text-black mr-2">難易度：</p>
            <button
              className="text-blue-500 hover:text-blue-700 flex items-center"
              onClick={() => setIsHelpModalOpen(true)}
              aria-label="難易度についての説明"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="ml-1">ヘルプ</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${aiDifficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-400'}`}
              onClick={() => onAIDifficultyChange('easy')}
            >
              簡単
            </button>
            <button
              className={`px-3 py-1 rounded ${aiDifficulty === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-400'}`}
              onClick={() => onAIDifficultyChange('medium')}
            >
              普通
            </button>
            <button
              className={`px-3 py-1 rounded ${aiDifficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-gray-400'}`}
              onClick={() => onAIDifficultyChange('hard')}
            >
              難しい
            </button>
          </div>

          <Modal
            isOpen={isHelpModalOpen}
            onClose={() => setIsHelpModalOpen(false)}
            title="難易度について"
          >
            <div className="text-gray-700">
              <div className="mb-4">
                <h4 className="font-bold text-green-500 mb-1">簡単</h4>
                <p>AIはほぼランダムに手を選びます。初心者や子供向けの難易度です。</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-yellow-500 mb-1">普通</h4>
                <p>AIは基本的な戦略で手を選びます。勝てる場面では勝ちを狙い、負けそうな場面では防御します。カジュアルなプレイに最適な難易度です。</p>
              </div>
              
              <div>
                <h4 className="font-bold text-red-500 mb-1">難しい</h4>
                <p>AIは最善の手を選びます。Minimaxアルゴリズムを使用して、先読みにより常に最適な手を打ちます。チャレンジしたい上級者向けの難易度です。</p>
              </div>
            </div>
          </Modal>        </div>
      )}
    </div>
  );
};

export default GameSettings;
