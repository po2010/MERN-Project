import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css'; 

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <div className="container">
        <h2>❌ No result data found</h2>
        <button onClick={() => navigate('/home') }className='home-btn'>🏠 Back to Home</button>
      </div>
    );
  }

  const { score, total, quizTitle, answers, questions, timeLimit, quizId } = result;

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingTop: '2rem' }}>
    <div className="result-container">
      <h2>📊 Results for: {quizTitle}</h2>
      <p><strong>⏱ Time Limit:</strong> {timeLimit} minutes</p>
      <p><strong>✅ Your Score:</strong> {score} / {total}</p>

      <hr />
      <h3>🧠 Answer Review:</h3>
      <ol>
        {questions.map((q, idx) => (
          <li key={idx} style={{ marginBottom: '1rem' }}>
            <p><strong>Q{idx + 1}. {q.questionText}</strong></p>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctAnswerIndex;
                const isSelected = i === answers[idx];

                let color = 'black';
                if (isCorrect) color = 'green';
                else if (isSelected && !isCorrect) color = 'red';

                return (
                  <li key={i} style={{ color, fontWeight: isCorrect || isSelected ? 'bold' : 'normal' }}>
                    {i + 1}. {opt}
                    {isCorrect && ' ✅'}
                    {isSelected && !isCorrect && ' ❌'}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      <button onClick={() => navigate('/home')} style={{ marginRight: '10px' }} className='home-btn'>
        🏠 Back to Home
      </button>
      <button onClick={() => navigate(`/leaderboard/${quizId}`)} className='leader-btn'>
        🏆 View Leaderboard for This Quiz
      </button>
    </div>
    </div>
  );
}

export default ResultsPage;
