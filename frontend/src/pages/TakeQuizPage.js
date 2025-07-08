import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TakeQuizPage.css';

function TakeQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // ✅ 1. Fetch quiz and initialize timer from localStorage
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`https://mern-project-backend2-9eul.onrender.com/api/quizzes/${id}`);
        setQuiz(res.data);
        setAnswers(Array(res.data.questions.length).fill(null));

        // Calculate time from stored start time
        const storedStart = localStorage.getItem(`quizStartTime-${id}`);
        const startTime = storedStart ? new Date(storedStart) : new Date();
        if (!storedStart) localStorage.setItem(`quizStartTime-${id}`, startTime.toISOString());

        const elapsed = Math.floor((new Date() - new Date(startTime)) / 1000);
        const totalTime = res.data.timeLimit * 60;
        const remaining = Math.max(totalTime - elapsed, 0);
        setTimeLeft(remaining);

        if (remaining === 0) handleSubmit(res.data, answers); // auto-submit if expired
      } catch (err) {
        console.error('Error loading quiz', err);
      }
    };
    fetchQuiz();
  }, [id]);

  // ✅ 2. Timer countdown
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(quiz, answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted, quiz]);

  const handleAnswerSelect = (index) => {
    const updated = [...answers];
    updated[currentIndex] = index;
    setAnswers(updated);
  };

  // ✅ 3. Submit and redirect to Result page
  const handleSubmit = async (quizData = quiz, answerData = answers) => {
    const score = answerData.reduce((total, ans, idx) => {
      if (ans === quizData.questions[idx].correctAnswerIndex) return total + 1;
      return total;
    }, 0);

    const attempt = {
      userId: user?._id,
      quizId: quizData._id,
      username: user?.username,
      score,
      total: quizData.questions.length,
      answers: answerData,
      questions: quizData.questions,
      quizTitle: quizData.title,
      timeLimit: quizData.timeLimit,
    };

    try {
      await axios.post('https://mern-project-backend2-9eul.onrender.com/api/attempts', attempt);
      setSubmitted(true);
      localStorage.removeItem(`quizStartTime-${id}`); // ✅ Clear timer
      navigate('/results', { state: attempt }); // ✅ Redirect
    } catch (err) {
      console.error('Error submitting attempt', err);
      alert('❌ Failed to submit quiz.');
    }
  };

  if (!quiz) return <div className="loading-box">Loading...</div>;
  const question = quiz.questions[currentIndex];

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="take-quiz-container">
        <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>

        <div className="timer-box">
          ⏱ Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>

        <div className="question-box">
          <h3>Q{currentIndex + 1}. {question.questionText}</h3>
          <ul>
            {question.options.map((opt, idx) => (
              <li key={idx}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    checked={answers[currentIndex] === idx}
                    onChange={() => handleAnswerSelect(idx)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-buttons">
          <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)} className="sub-btn">⬅️ Previous</button>
          {currentIndex < quiz.questions.length - 1 ? (
            <button onClick={() => setCurrentIndex(currentIndex + 1)} className="sub-btn">Next ➡️</button>
          ) : (
            <button onClick={() => handleSubmit()} className="submit-btn">✅ Submit Quiz</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TakeQuizPage;
