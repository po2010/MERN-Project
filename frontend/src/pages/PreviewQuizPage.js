import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreviewQuizPage.css';

function PreviewQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state= location.state || {};
  
  const {
  title = '',
  description = 'No description provided.',
  category = 'N/A',
  startTime = 'Not specified',
  endTime = 'Not specified',
  isPrivate = false,
  accessPassword = '',
  isPublished = false,
  timeLimit = 0,
  questions: initialQuestions = [],
} = state;


  const [questions, setQuestions] = useState(initialQuestions || []);

  if (!Array.isArray(initialQuestions)) {
    return (
      <div className="container">
        <h2>❌ Cannot preview quiz</h2>
        <p>Quiz data is missing or incomplete.</p>
        <button onClick={() => navigate('/create-quiz')}>🔙 Back to Create Quiz</button>
      </div>
    );
  }
  const handleDelete = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleEditQuestion = (index) => {
    navigate('/create-quiz', {
      state: {
        editIndex: index,
        title,
        description,
        category,
        startTime,
        endTime,
        isPrivate,
        accessPassword,
        isPublished,
        timeLimit,
        questions,
      },
    });
  };

  const handleGoBack = () => {
    navigate('/create-quiz', {
      state: {
        title,
        description,
        category,
        startTime,
        endTime,
        isPrivate,
        accessPassword,
        isPublished,
        timeLimit,
        questions,
      },
    });
  };

  return (
    <div className="preview-container">
      <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>
      <h2 className="preview-title">👁️ Preview: {title || 'Untitled Quiz'}</h2>

      <div className="quiz-info">
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Time Limit:</strong> {timeLimit} minutes</p>
        <p><strong>Start:</strong> {startTime}</p>
        <p><strong>End:</strong> {endTime}</p>
        <p><strong>Privacy:</strong> {isPrivate ? 'Private 🔒' : 'Public 🌐'}</p>
        {isPrivate && <p><strong>Password:</strong> {accessPassword}</p>}
        <p><strong>Status:</strong> {isPublished ? 'Published ✅' : 'Draft 📝'}</p>
      </div>

      <h3>🧾 Questions</h3>
      <ol className="preview-questions">
        {questions.map((q, idx) => (
          <li key={idx} className="preview-question-item">
            <strong>{q.questionText}</strong>
            <ul className="option-list">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={i === q.correctAnswerIndex ? 'correct-option' : 'option'}
                >
                  {opt}
                </li>
              ))}
            </ul>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEditQuestion(idx)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(idx)}>❌ Delete</button>
            </div>
          </li>
        ))}
      </ol>

      <button className="back-button" onClick={handleGoBack}>⬅️ Back to Editing</button>
    </div>
  );
}

export default PreviewQuizPage;
