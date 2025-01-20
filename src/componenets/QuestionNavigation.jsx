import React from 'react';
import { Check, Eye } from 'lucide-react';

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}) => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">Questions Overview</h2>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center relative ${
              currentQuestion === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {i + 1}
            {answers[i] && (
              <Check className="absolute -top-1 -right-1 w-4 h-4 text-green-500" />
            )}
            {visitedQuestions.has(i) && !answers[i] && (
              <Eye className="absolute -top-1 -right-1 w-4 h-4 text-gray-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
