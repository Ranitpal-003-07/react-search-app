import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const searchQuestions = async () => {
    if (query.trim() === '') {
      setQuestions([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      const data = await response.json();

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setQuestions([]);
      }
    } catch (err) {
      setError('Error fetching results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuestions();
    }, 500); 

    return () => clearTimeout(delayDebounceFn); 
  }, [query]);

  return (
    <div>
      <h1>Search Questions</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for questions..."
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="searchResults">
        {questions.length === 0 && !loading && !error ? (
          <p>No questions found.</p>
        ) : (
          questions.map((question) => (
            <div key={question._id} className="question-item" style={{ borderBottom: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
              <h3>{question.title}</h3>

              {question.type === 'ANAGRAM' && question.blocks && (
                <div>
                  <p><strong>Anagram Type:</strong> {question.anagramType}</p>
                  <p><strong>Rearrange the letters:</strong></p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {question.blocks.map((block, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '10px',
                          backgroundColor: block.showInOption ? 'lightgray' : 'transparent',
                          fontWeight: block.isAnswer ? 'bold' : 'normal',
                        }}
                      >
                        {block.text}
                      </div>
                    ))}
                  </div>
                  <p><strong>Solution:</strong> {question.solution}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
