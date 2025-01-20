# Quiz Application

## Overview

This quiz application is an interactive web-based quiz platform that allows users to answer multiple-choice questions within a specified time limit. The application features a user-friendly interface, dynamic question navigation, and a responsive design powered by React and Tailwind CSS.

### Components

1. **StartPage:** Handles user onboarding by collecting an email before starting the quiz.
2. **Timer:** Displays the countdown timer to track quiz duration.
3. **QuestionNavigation:** Allows users to navigate between quiz questions.
4. **QuizQuestion:** Displays individual quiz questions and handles user answers.
5. **QuizReport:** Generates a summary report after quiz completion.
6. **App:** The main component that orchestrates the entire quiz flow.

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or later)
- npm (Node Package Manager)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https:https://github.com/akhiltiwari12/Quiz-Application.git
   cd Quiz-Application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Configure Tailwind by updating `tailwind.config.js`:
   ```js
   module.exports = {
     content: ['./src/**/*.{js,jsx,ts,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

5. Add Tailwind to your CSS:
   In `src/index.css` or your main CSS file, add:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open the application in your browser at `http://localhost:5173`

## Assumptions

- Users must provide a valid email address before starting the quiz.
- The quiz consists of multiple-choice questions retrieved from an API.
- The quiz is timed, and once time is up, the quiz automatically ends.

## Challenges Faced and Solutions

1. **Handling State Management:**
   - Used React's `useState` and `useEffect` hooks to manage quiz state effectively.

2. **API Data Handling:**
   - Encountered inconsistent API responses, handled errors gracefully using state and error messages.

3. **Responsive Design:**
   - Implemented Tailwind CSS to ensure a responsive and visually appealing UI.

4. **Countdown Timer Optimization:**
   - Used `setInterval` and `clearInterval` to manage the quiz timer efficiently without performance issues.



