import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CreateQuizPage.css';

function CreateQuizPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [timeLimit, setTimeLimit] = useState('');

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswerIndex: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setTitle(location.state.title || '');
      setDescription(location.state.description || '');
      setCategory(location.state.category || 'General');
      setStartTime(location.state.startTime || '');
      setEndTime(location.state.endTime || '');
      setIsPrivate(location.state.isPrivate || false);
      setAccessPassword(location.state.accessPassword || '');
      setIsPublished(location.state.isPublished || false);
      setTimeLimit(location.state.timeLimit || 5);
      setQuestions(location.state.questions || []);
    }
  }, [location.state]);

  const addQuestion = () => {
    const clonedQuestion = {
      questionText: currentQuestion.questionText,
      options: [...currentQuestion.options],
      correctAnswerIndex: currentQuestion.correctAnswerIndex,
    };
    const updatedQuestions = [...questions, clonedQuestion];
    console.log('Added question:', clonedQuestion);

    setQuestions(updatedQuestions);
    setCurrentQuestion({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); // ✅ get logged-in user

    await axios.post('http://localhost:5000/api/quizzes', {
      title,
      description,
      category,
      timeLimit,
      startTime,
      endTime,
      isPrivate,
      accessPassword,
      isPublished,
      userId: user?._id, // ✅ send quiz creator ID
      questions
    });

      alert('✅ Quiz saved!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save quiz.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
    <div className="quiz-form-container">
      <button className="home-button" onClick={() => navigate('/home')}>🏠 Home</button>

      <h2 className="quiz-form-header">📝 Create a New Quiz</h2>

      <input className="form-input" type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="form-textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
      <input className="form-input" type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

      <div className="form-time">
        <label>Start Time:</label>
        <input className="form-input" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input className="form-input" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>

      <div className="form-checkboxes">
        <label><input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} /> Make Quiz Private</label>
        {isPrivate && <input className="form-input" type="password" placeholder="Access Password" value={accessPassword} onChange={(e) => setAccessPassword(e.target.value)} />}
        <label><input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} /> Publish Now</label>
      </div>

      <input className="form-input" type="number" placeholder="Time Limit (minutes)" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} min={1} />

      <hr />

      <input className="form-input" type="text" placeholder="Question" value={currentQuestion.questionText} onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })} />
      {currentQuestion.options.map((opt, idx) => (
        <input
          key={idx}
          className="form-input"
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => {
            const updatedOptions = [...currentQuestion.options];
            updatedOptions[idx] = e.target.value;
            setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
          }}
        />
      ))}

      <select className="form-select" value={currentQuestion.correctAnswerIndex} onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswerIndex: Number(e.target.value) })}>
        {currentQuestion.options.map((_, idx) => (
          <option key={idx} value={idx}>Correct Answer: Option {idx + 1}</option>
        ))}
      </select>

      <button className="form-button add" onClick={addQuestion}>➕ Add Question to Quiz</button>
      <h4>{questions.length} question(s) added</h4>

      <div className="button-group">
        <button
          className="form-button preview"
          onClick={() => navigate('/preview-quiz', { state: { title, description, category, startTime, endTime, isPrivate, accessPassword, isPublished, timeLimit, questions } })}
          disabled={questions.length === 0}
        >👁️ Preview Quiz</button>

        <button className="form-button submit" onClick={handleSubmit}>✅ Save Entire Quiz</button>
      </div>
    </div>
    </div>
  );
}

export default CreateQuizPage;
