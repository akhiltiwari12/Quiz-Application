import React, { useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export const Timer = ({ timeRemaining, onTimeUp }) => {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const getTimerColor = () => {
    if (timeRemaining <= 300) return 'text-red-600'; // Last 5 minutes
    if (timeRemaining <= 600) return 'text-yellow-600'; // Last 10 minutes
    return 'text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center gap-2">
      <TimerIcon className={`w-5 h-5 ${getTimerColor()}`} />
      <span className={`font-mono text-lg font-medium ${getTimerColor()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
