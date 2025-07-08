import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelector from './components/RoleSelector';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CreateQuizPage from './pages/CreateQuizPage';
import './App.css';
import ViewQuizPage from './pages/ViewQuizPage';
import PreviewQuizPage from './pages/PreviewQuizPage';
import ResultsPage from './pages/ResultsPage';
import TakeQuizPage from './pages/TakeQuizPage';
import AttemptedQuizzesPage from './pages/AttemptedQuizzesPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import MyQuizzesPage from './pages/MyQuizzesPage';

function App() {
  const [role, setRole] = useState(null); // 'maker' or 'taker'

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector setRole={setRole} />} />
        <Route path="/auth" element={<AuthPage role={role} />} />
        <Route path="/register" element={<RegisterPage role={role} />} />
        <Route path="/home" element={<HomePage role={role} setRole={setRole} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/view-quiz" element={<ViewQuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/quiz/:id" element={<TakeQuizPage />} />
        <Route path="/attempted-quizzes" element={<AttemptedQuizzesPage />} />
        <Route path="/preview-quiz" element={<PreviewQuizPage />} />
        <Route path="/leaderboard/:quizId" element={<LeaderBoardPage />} />
        <Route path="/my-quizzes" element={<MyQuizzesPage />} />


      </Routes>
    </Router>
  );
}

export default App;
