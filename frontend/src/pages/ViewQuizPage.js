import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import './ViewQuizPage.css';

function ViewQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://mern-project-backend2-9eul.onrender.com/api/quizzes/published/all')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error('Failed to load quizzes', err));
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
    <div className="view-quiz-container">
      <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>
      <h2>📝 Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No published quizzes found.</p>
      ) : (
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h4>{quiz.title}</h4>
              <p><strong>Category:</strong> {quiz.category}</p>
              <p><strong>Time Limit:</strong> {quiz.timeLimit} min</p>
              <Link to={`/quiz/${quiz._id}`}>
              <button className='start-btn'>Take Quiz</button>
            </Link>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default ViewQuizPage;
