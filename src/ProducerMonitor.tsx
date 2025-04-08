import Chart from './Chart';
import useProducerConnection from './useProducerConnection';

type Props = {
  id: string;
  isPaused: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function ProducerMonitor({ id, isPaused, ...props }: Props) {
  const { messages } = useProducerConnection(id, isPaused);
  return (
    <div {...props}>
      <p>Producer {id}</p>
      <Chart data={messages} />
    </div>
  );
}

export default ProducerMonitor;
