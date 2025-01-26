import React from 'react';
import '../Styles/QuestionList.css';

const darkTheme = {
  background: 'none',
  color: '#000000',
  border: '3px solid white',
  padding: '10px',
};

const lightTheme = {
  backgroundColor: 'lavendar',
  color: '#ffffff',
  border: '3px solid #444',
  padding: '10px',
};


const QuestionList = ({ theme,results, loading, totalCount, page, handlePagination }) => {
  return (
    <div 
      style={theme === 'light' ? lightTheme : darkTheme}
      className='Qlist'>
        {loading && <div>Loading...</div>}

      <ul>
        {results.map((question, index) => (
          <li key={index}>
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
            {question.anagramType && <p>Anagram Type: {question.anagramType}</p>}
            
            <div>
              <p>Blocks:</p>
              <ul>
                {question.blocks.map((block, idx) => (
                  <li key={idx}>
                    {block.text} {block.showInOption ? "(Option)" : ""} 
                    {block.isAnswer ? "(Answer)" : ""}
                  </li>
                ))}
              </ul>
            </div>

            <p>Solution: {question.solution}</p>
          </li>
        ))}
      </ul>

      {totalCount > 0 && (
        <div>
          <button onClick={() => handlePagination(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span> Page {page} </span>
          <button onClick={() => handlePagination(page + 1)} disabled={results.length < 10}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;
