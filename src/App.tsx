import analogGarageLogo from './assets/garage-logo.png';
import ProducerMonitor from './ProducerMonitor';

function App() {
  return (
    <>
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
      <div className="flex flex-wrap justify-center gap-1 px-[2rem]">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProducerMonitor
            id={i.toString()}
            key={i}
            className="flex-1 min-w-[250px] max-w-[calc(20%-1rem)] basis-[20%] justify-center"
          />
        ))}
      </div>
    </>
  );
}

export default App;
