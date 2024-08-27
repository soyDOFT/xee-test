import { useState } from 'react'
import './App.css';

function App() {
  const [ output, setOutput] = useState('');

 function handleSubmit(e) {
     fetch('http://localhost:3000/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: // `<!DOCTYPE data [
      //       <!ENTITY a0 "lol" >
      //       <!ENTITY a1 "&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;&a0;">
      //       <!ENTITY a2 "&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;&a1;">
      //       <!ENTITY a3 "&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;&a2;">
      //       <!ENTITY a4 "&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;&a3;">
      //       ]>
      //       <data>&a4;</data>`
            JSON.stringify(e.target.value)
    })
    .then(response => response.json())
    .then(result => setOutput(result))
  }

  return (
    <>
      <p>{output}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="XML INPUT"/>
        <button>SEND</button>
      </form>
    </>
  )
}

export default App
