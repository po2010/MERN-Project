import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelector.css';

function RoleSelector({ setRole }) {
  const navigate = useNavigate();

  const selectRole = (role) => {
    setRole(role);
    navigate('/auth');
  };

  return (
    <div className="role-selector-container">
      <img src="https://cdn-icons-png.flaticon.com/512/2721/2721618.png" className="role-image" alt="quiz-illustration" />
      <h1 className="role-title">🎯 Select Your Role</h1>
      <p className="role-subtext">
        Please choose whether you want to create quizzes or attempt quizzes.
      </p>
      <hr className="role-divider" />
      <div className="role-buttons">
        <button
          className="role-button maker"
          onClick={() => selectRole('maker')}
          title="Create and manage your own quizzes"
        >
          🛠️ Quiz Maker
        </button>
        <button
          className="role-button taker"
          onClick={() => selectRole('taker')}
          title="Join quizzes and test your knowledge"
        >
          🧠 Quiz Taker
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;
