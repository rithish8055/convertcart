import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterComponent = () => {
  const [filterRules, setFilterRules] = useState([]);
  const [newRule, setNewRule] = useState('');
 
  const [evaluationResult, setEvaluationResult] = useState(null);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => {
        console.log("Fetched products:", response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddRule = () => {
  if (!newRule.trim()) return;

  const cleanedRule = newRule.trim();

  
  setFilterRules([...filterRules, cleanedRule]);
  setNewRule('');
};



  const handleRemoveRule = (index) => {
    const updatedRules = [...filterRules];
    updatedRules.splice(index, 1);
    setFilterRules(updatedRules);
  };

  const handleReset = () => {
    setFilterRules([]);
  };

  const handleEvaluate = () => {
  axios.post(`${process.env.REACT_APP_API_URL}/segments/evaluate`, {
    segmentName: 'Custom Segment',
    conditions: filterRules.join('\n')
  })
  .then(response => {
    console.log("Evaluation result:", response.data);
    setEvaluationResult(response.data);
  })
  .catch(error => {
    console.error("Error evaluating rules:", error);
    setEvaluationResult({ error: 'Error evaluating rules' });
  });
};




  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddRule();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Define Filter Conditions</h2>

      <p>Enter filter rules (one per line):</p>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        {filterRules.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No filter rules added yet</p>
        ) : (
          filterRules.map((rule, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '5px',
                padding: '8px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #eee'
              }}
            >
              <span style={{ flexGrow: 1 }}>- {rule}</span>
              <button 
                onClick={() => handleRemoveRule(index)}
                style={{ 
                  marginLeft: '10px', 
                  backgroundColor: '#ff4444', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., price > 5000"
          style={{ 
            flexGrow: 1, 
            padding: '8px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            marginRight: '10px'
          }}
        />
        <button 
          onClick={handleAddRule}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <p>Examples: price &gt; 5000, category = Smartphones, stock_status = instock</p>

      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={handleEvaluate}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Evaluate Filter
        </button>

        <button 
          onClick={handleReset}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
          <p>Supported operators:</p>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li>!= &gt; &lt; &gt;= &lt;= =</li>
          </ul>
        </div>

        {evaluationResult && (
          <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fafafa' }}>
            <h4>Evaluation Result:</h4>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(evaluationResult, null, 2)}
            </pre>
          </div>
        )}

    </div>
  );
};

export default FilterComponent;

