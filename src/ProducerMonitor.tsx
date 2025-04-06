import Chart from './Chart';
import useProducerConnection from './useProducerConnection';

type Props = { id: string } & React.HTMLAttributes<HTMLDivElement>;

function ProducerMonitor({ id, ...props }: Props) {
  const { messages } = useProducerConnection(id);
  return (
    <div {...props}>
      <p>Producer {id}</p>
      <Chart data={messages} />
    </div>
  );
}

export default ProducerMonitor;
