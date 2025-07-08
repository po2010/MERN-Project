// src/pages/LeaderboardPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LeaderBoardPage.css';

function LeaderBoardPage() {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [quizTitle, setQuizTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/attempts/quiz/${quizId}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => b.score - a.score);
        setAttempts(sorted);
        if (sorted.length > 0) {
          setQuizTitle(sorted[0].quizTitle || '');
        }
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [quizId]);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
    <div className="leaderboard-container">
      <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>
      <h2 className="leaderboard-title">🏆 Leaderboard - {quizTitle}</h2>
      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{a.username || 'Anonymous'}</td>
                <td>{a.score}</td>
                <td>{a.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default LeaderBoardPage;
