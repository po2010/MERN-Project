import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyQuizzesPage.css'; // ✅ Import CSS

function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?._id) return;

    axios.get(`http://localhost:5000/api/quizzes/creator/${user._id}`)
      .then(res => setQuizzes(res.data))
      .catch(err => console.error('Failed to fetch quizzes', err));
  }, [user]);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
    <div className="my-quizzes-container">
      <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>
      <h2 className="quizzes-title">📚 My Created Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="no-quizzes">You haven’t created any quizzes yet.</p>
      ) : (
        <ul className="quiz-list">
          {quizzes.map((quiz, idx) => (
            <li key={idx} className="quiz-item">
              <div className="quiz-info">
                <strong>{quiz.title}</strong>
                <p className="quiz-meta">{quiz.category} | Time Limit: {quiz.timeLimit} min</p>
              </div>
              <div className="quiz-buttons">
                <button onClick={() => navigate('/create-quiz', { state: quiz })}>✏️ Edit</button>
                <button onClick={() => navigate(`/leaderboard/${quiz._id}`)}>🏆 Leaderboard</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default MyQuizzesPage;
