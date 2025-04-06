import reactLogo from './assets/react.svg';
import analogGarageLogo from './assets/garage-logo.png';
import viteLogo from '/vite.svg';
import './App.css';
import ProducerMonitor from './ProducerMonitor';

function App() {
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '1rem',
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ProducerMonitor
            id={i.toString()}
            key={i}
            style={{
              flex: '1 1 calc(20% - 1rem)',
              minWidth: '250px',
            }}
          />
        ))}
      </div>
      {/* TODO: Put back start/stop buttons */}
      {/* <div>
        <button onClick={startConnection}>Start Connection</button>
        <button onClick={closeConnection}>Close Connection</button>
      </div> */}
    </>
  );
}

export default App;
