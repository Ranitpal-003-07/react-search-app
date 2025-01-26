import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/QuestionList.css';

const QuestionList = ({theme}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/search', {
          params: { page, pageSize },
        });
        setQuestions(response.data.questions);
      } catch (err) {
        setError('Error fetching questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [page, pageSize]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`question-list-container ${theme}-theme`}>
      <h1>All Questions</h1>

      <div className="question-container">
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3>{question.title}</h3>
              <p>Type: {question.type}</p>
              {question.anagramType && <p>Anagram Type: {question.anagramType}</p>}

              <div>
                <p>Blocks:</p>
                <ul>
                  {question.blocks.map((block, idx) => (
                    <li key={idx}>
                      {block.text} {block.showInOption ? '(Option)' : ''} 
                      {block.isAnswer ? '(Answer)' : ''}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="solution">Solution: {question.solution}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous 100
        </button>
        <button onClick={handleNextPage}>Next 100</button>
      </div>
    </div>
  );
};

export default QuestionList;
