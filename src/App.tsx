import { useState } from 'react';
import reactLogo from './assets/react.svg';
import analogGarageLogo from './assets/garage-logo.png';
import viteLogo from '/vite.svg';
import './App.css';
import useProducerConnection from './useProducerConnection';

function App() {
  const [count, setCount] = useState(0);

  const { messages, startConnection, closeConnection } =
    useProducerConnection('0');

  console.log(messages);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://www.analog.com/en/incubators/analog-garage.html"
          target="_blank"
        >
          <img
            src={analogGarageLogo}
            className="logo analog-garage"
            alt="Analog Garage logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={startConnection}>Start Connection</button>
      <button onClick={closeConnection}>Close Connection</button>
    </>
  );
}

export default App;
