import Chart from './Chart';
import useProducerConnection from './useProducerConnection';

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
    <div {...props}>
      <p>Producer {id}</p>
      {values.length > 0 && (
        <div className="text-xs font-mono mt-1">
          Min: {min.toFixed(2)} | Max: {max.toFixed(2)} | Avg: {avg.toFixed(2)}
        </div>
      )}
      <Chart data={messages} />
    </div>
  );
}

export default ProducerMonitor;
