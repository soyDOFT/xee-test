import { useState } from 'react';
import './App.css';

function App() {
  const [output, setOutput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const xmlInput = e.target.elements.xmlInput.value;

    fetch('http://localhost:3000/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlInput // Directly use the XML input as the body
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // For debugging purposes
        setOutput(JSON.stringify(result, null, 2)); // Format the JSON output for better readability
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <>
      <p>{output}</p>
      <form onSubmit={handleSubmit}>
        <textarea name="xmlInput" placeholder="XML INPUT" rows="10" cols="30"></textarea>
        <button type="submit">SEND</button>
      </form>
    </>
  );
}

export default App;