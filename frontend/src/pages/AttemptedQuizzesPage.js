import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AttemptedQuizPage.css'; // Optional: Create and style this file

function AttemptedQuizPage() {
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.userId;

    if (!userId) {
      alert('⚠️ User not logged in.');
      return;
    }

    axios
      .get(`https://mern-project-backend2-9eul.onrender.com/api/attempts/user/${userId}`)
      .then(res => setAttempts(res.data))
      .catch(err => console.error('Error fetching attempts:', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="attempted-container">
        <button className="home-button" onClick={() => navigate('/home')}>
          🏠 Home
        </button>

        <h2 className="attempted-heading">📊 Your Attempted Quizzes</h2>

        {attempts.length === 0 ? (
          <p>No quizzes attempted yet.</p>
        ) : (
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            {attempts.map((attempt, idx) => (
              <li
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 6px rgba(255, 0, 0, 0.1)'
                }}
              >
                <strong>{attempt.quizTitle}</strong>
                <p>
                  Score: <strong>{attempt.score}</strong> / {attempt.total}
                </p>
                <button
                  className="view-result-btn"
                  onClick={() =>
                    navigate('/results', {
                      state: {
                        score: attempt.score,
                        total: attempt.total,
                        quizTitle: attempt.quizTitle,
                        answers: attempt.answers,
                        questions: attempt.questions,
                        timeLimit: attempt.timeLimit,
                        quizId: attempt.quizId // ✅ for leaderboard
                      }
                    })
                  }
                >
                  📄 View Result
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AttemptedQuizPage;
