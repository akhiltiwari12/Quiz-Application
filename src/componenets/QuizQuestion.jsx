import React from 'react';

export const QuizQuestion = ({ question, currentAnswer, onAnswer }) => {
  const answers = question.all_answers || [];

  return (
    <div className="animate-fadeIn">
      <h2 
        className="text-xl font-semibold mb-6"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className={`w-full text-left p-4 rounded-lg transition-all ${
              currentAnswer === answer
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};
