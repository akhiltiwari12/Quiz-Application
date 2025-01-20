import React from 'react';
import { Check, X, LogOut } from 'lucide-react';

export const QuizReport = ({ questions, answers, email, onSignOut }) => {
  const score = questions.reduce((acc, question, index) => {
    return acc + (answers[index] === question.correct_answer ? 1 : 0);
  }, 0);

  const unattemptedCount = questions.length - Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 backdrop-blur-lg bg-opacity-90">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h1>
              <p className="text-gray-600 mb-4">Email: {email}</p>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-800">
                <p className="text-sm uppercase font-semibold">Total Score</p>
                <p className="text-3xl font-bold">
                  {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="text-sm">{score} out of {questions.length} correct</p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-yellow-800">
                <p className="text-sm uppercase font-semibold">Questions Attempted</p>
                <p className="text-3xl font-bold">
                  {Object.keys(answers).length}
                </p>
                <p className="text-sm">out of {questions.length} total</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-red-800">
                <p className="text-sm uppercase font-semibold">Unattempted</p>
                <p className="text-3xl font-bold">{unattemptedCount}</p>
                <p className="text-sm">questions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold text-gray-700">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-lg font-semibold mb-4 text-gray-800"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Your Answer:</p>
                      {answers[index] ? (
                        <div className={`p-3 rounded-lg flex items-center gap-2 ${
                          answers[index] === question.correct_answer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {answers[index] === question.correct_answer ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <X className="w-5 h-5" />
                          )}
                          <span dangerouslySetInnerHTML={{ __html: answers[index] }} />
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800">
                          Not attempted
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Correct Answer:</p>
                      <div className="p-3 rounded-lg bg-green-100 text-green-800 flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
