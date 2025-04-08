import Chart from './Chart';
import useProducerConnection from './useProducerConnection';

// Define a fixed container class for each ProducerMonitor box.
// Adjust these values later if you add a toggle for "charts per row".
const containerClass =
  'flex flex-col min-w-[250px] h-[310px] max-w-[calc(20%-1rem)] basis-[20%] justify-center items-center mb-4';

type Props = {
  id: string;
  isPaused: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function ProducerMonitor({ id, isPaused, ...props }: Props) {
  const { messages } = useProducerConnection(id, isPaused);

  const values = messages.map((m) => m.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

  return (
    <div {...props} className={containerClass}>
      {/* Render a loading state with fixed dimensions and centered spinner */}
      {messages.length === 0 ? (
        <span className="loading loading-spinner loading-xl" />
      ) : (
        <>
          <p className="text-white">Producer {id}</p>
          <div className="text-xs font-mono mt-1 text-white">
            Min: {min.toFixed(2)} | Max: {max.toFixed(2)} | Avg:{' '}
            {avg.toFixed(2)}
          </div>
          <Chart data={messages} />
        </>
      )}
    </div>
  );
}

export default ProducerMonitor;
