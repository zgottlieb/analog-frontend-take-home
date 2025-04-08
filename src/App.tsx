import analogGarageLogo from './assets/garage-logo.png';
import ProducerMonitor from './ProducerMonitor';
import { useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const sessionStartTime = useRef<Date | null>(new Date());

  return (
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
      <div className="flex items-center gap-4 px-[2rem] mb-4 py-2 bg-base-200">
        <div className="font-mono text-sm flex items-center gap-4">
          <span>
            Session start time:{' '}
            {sessionStartTime.current?.toLocaleTimeString() || '--:--:--'}
          </span>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer"
            onClick={() => setIsPaused((prev) => !prev)}
          >
            {isPaused ? (
              <>
                <PlayIcon className="h-5 w-5" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <PauseIcon className="h-5 w-5" />
                <span>Pause</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1 px-[2rem]">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProducerMonitor
            id={i.toString()}
            key={i}
            className="flex-1 min-w-[250px] max-w-[calc(20%-1rem)] basis-[20%] justify-center"
            isPaused={isPaused}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
