import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage({ role, setRole }) {
  const navigate = useNavigate();

  const switchRole = () => {
    setRole(role === 'maker' ? 'taker' : 'maker');
    navigate('/');
  };

  return (
    <div className="home-container">
      {/* Top-right Home Button */}
      <div className="home-topbar">
        <button className="home-btn" onClick={() => navigate('/')}>🏠 Home</button>
      </div>

      <h1 className="home-heading">
        Welcome, {role === 'maker' ? 'Quiz Maker' : 'Quiz Taker'}!
      </h1>

      <div className="home-actions">
        {role === 'maker' ? (
          <>
            <button onClick={() => navigate('/create-quiz')}>➕ Create Quiz</button>
            <button onClick={() => navigate('/my-quizzes')}>📋 My Quizzes</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate(`/view-quiz`)}>👁️ View Quiz</button>
            <button onClick={() => navigate('/attempted-quizzes')}>📊 Attempted Quizzes</button>
          </>
        )}
      </div>

      <button className="switch-role-btn" onClick={switchRole}>
        🔁 Switch to {role === 'maker' ? 'Quiz Taker' : 'Quiz Maker'}
      </button>
    </div>
  );
}

export default HomePage;
