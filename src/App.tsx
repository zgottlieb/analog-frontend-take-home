import reactLogo from './assets/react.svg';
import analogGarageLogo from './assets/garage-logo.png';
import viteLogo from '/vite.svg';
import './App.css';
import useProducerConnection from './useProducerConnection';
import Chart from './Chart';

function App() {
  const { messages, startConnection, closeConnection } =
    useProducerConnection('0');

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
      <h1>Analog Garage - Producer Data Viewer</h1>
      <Chart data={messages} />
      <div>
        <button onClick={startConnection}>Start Connection</button>
        <button onClick={closeConnection}>Close Connection</button>
      </div>
    </>
  );
}

export default App;
