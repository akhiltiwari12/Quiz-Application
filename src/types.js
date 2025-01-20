export const Question = {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
    all_answers: [] // Added for pre-shuffled answers
  };
  
  export const QuizState = {
    currentQuestion: 0,
    answers: {},
    visitedQuestions: new Set(),
    email: '',
    timeRemaining: 0,
    isComplete: false,
    questions: [],
    isLoading: false,
    error: null
  };
  