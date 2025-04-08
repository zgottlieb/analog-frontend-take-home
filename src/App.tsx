import analogGarageLogo from './assets/garage-logo.png';
import ProducerMonitor from './components/ProducerMonitor';
import { useState } from 'react';
import { ChartProvider } from './ChartContext';
import ControlPanel from './components/ControlPanel';

function App() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <ChartProvider>
      <div>
        <div className="flex items-center justify-between space-x-8 px-[2rem] mb-[3rem]">
          <div>
            <a
              href="https://www.analog.com/en/incubators/analog-garage.html"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={analogGarageLogo}
                alt="Analog Garage logo"
                className="w-[150px] h-auto"
              />
            </a>
          </div>
          <h1 className="font-mono text-5xl">Data Producer Dashboard</h1>
        </div>
        <ControlPanel
          isPaused={isPaused}
          handleTogglePause={() => setIsPaused((prev) => !prev)}
        />
        <div className="flex flex-wrap justify-start gap-1 px-[2rem]">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProducerMonitor id={i.toString()} key={i} isPaused={isPaused} />
          ))}
        </div>
      </div>
    </ChartProvider>
  );
}

export default App;
