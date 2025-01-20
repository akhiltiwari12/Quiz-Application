import React, { useState, useEffect, useCallback } from 'react';
import { StartPage } from './componenets/StartPage';
import { Timer } from './componenets/Timer';
import { QuestionNavigation } from './componenets/QuestionNavigation';
import { QuizQuestion } from './componenets/QuizQuestion';
import { QuizReport } from './componenets/QuizReport';
import { Loader2, Menu, LogOut, Flag } from 'lucide-react';

const QUIZ_TIME = 30 * 60; // 30 minutes in seconds

function App() {
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: {},
    visitedQuestions: new Set([0]),
    email: '',
    timeRemaining: QUIZ_TIME,
    isComplete: false,
    questions: [],
    isLoading: false,
    error: null,
  });

  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!state.email) return;

      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=15');
        const data = await response.json();

        if (data.response_code !== 0 || !data.results?.length) {
          throw new Error('Failed to load questions. Please try again.');
        }

        const processedQuestions = data.results.map(question => ({
          ...question,
          all_answers: [...question.incorrect_answers, question.correct_answer]
            .sort(() => Math.random() - 0.5)
        }));

        setState(prev => ({
          ...prev,
          questions: processedQuestions,
          isLoading: false
        }));
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to load questions. Please try again.',
          isLoading: false
        }));
      }
    };
    fetchQuestions();
  }, [state.email]);

  useEffect(() => {
    if (state.email && !state.isComplete && state.questions.length > 0) {
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [state.email, state.isComplete, state.questions.length]);

  const handleStart = (email) => {
    setState(prev => ({ ...prev, email }));
  };

  const handleAnswer = (answer) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestion]: answer },
    }));
  };

  const handleQuestionSelect = (index) => {
    setState(prev => ({
      ...prev,
      currentQuestion: index,
      visitedQuestions: new Set([...prev.visitedQuestions, index]),
    }));
    setShowOverview(false);
  };

  const handleTimeUp = useCallback(() => {
    setState(prev => ({ ...prev, isComplete: true }));
  }, []);

  const handleNext = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        visitedQuestions: new Set([...prev.visitedQuestions, prev.currentQuestion + 1]),
      }));
    }
  };

  const handleSignOut = () => {
    setState({
      currentQuestion: 0,
      answers: {},
      visitedQuestions: new Set([0]),
      email: '',
      timeRemaining: QUIZ_TIME,
      isComplete: false,
      questions: [],
      isLoading: false,
      error: null,
    });
  };

  const handleFinishTest = () => {
    setState(prev => ({ ...prev, isComplete: true }));
  };

  const toggleOverview = () => {
    setShowOverview(prev => !prev);
  };

  if (!state.email) {
    return <StartPage onStart={handleStart} />;
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <p className="text-red-600 mb-4">{state.error}</p>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xl font-medium text-gray-700">Loading your quiz...</span>
        </div>
      </div>
    );
  }

  if (state.isComplete || state.timeRemaining === 0) {
    return (
      <QuizReport
        questions={state.questions}
        answers={state.answers}
        email={state.email}
        onSignOut={handleSignOut}
      />
    );
  }

  if (state.questions.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="fixed top-4 right-4 flex items-center gap-4">
        <Timer timeRemaining={state.timeRemaining} onTimeUp={handleTimeUp} />
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors text-gray-700"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <button
        onClick={toggleOverview}
        className="fixed top-4 left-4 p-3 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors group"
        aria-label="Toggle question overview"
      >
        <Menu className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
      </button>

      {showOverview && (
        <QuestionNavigation
          totalQuestions={state.questions.length}
          currentQuestion={state.currentQuestion}
          visitedQuestions={state.visitedQuestions}
          answers={state.answers}
          onQuestionSelect={handleQuestionSelect}
        />
      )}

      <div className="max-w-3xl mx-auto mt-20">
        <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-lg bg-opacity-90">
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Question {state.currentQuestion + 1} of {state.questions.length}
              </h1>
              <button
                onClick={handleFinishTest}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Flag className="w-4 h-4" />
                Finish Test
              </button>
            </div>
          </div>

          <QuizQuestion
            question={state.questions[state.currentQuestion]}
            currentAnswer={state.answers[state.currentQuestion] || ''}
            onAnswer={handleAnswer}
          />

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => handleQuestionSelect(state.currentQuestion - 1)}
              disabled={state.currentQuestion === 0}
              className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
