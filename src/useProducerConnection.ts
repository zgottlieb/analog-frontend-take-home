import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';

// Maximum number of messages to keep in the buffer
const MAX_BUFFER_SIZE = 1000;

function useProducerConnection(
  connectionId: string,
  isPaused: boolean
): {
  messages: Message[];
  closeConnection: () => void;
  startConnection: () => void;
} {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const buffer = useRef<Message[]>([]);

  const startConnection = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED)
      return;

    socketRef.current = new WebSocket(
      `http://localhost:8000/producer/${connectionId}`
    );
    socketRef.current.onmessage = (event) => {
      if (!isPaused) {
        const data: Message[] = JSON.parse(event.data);
        buffer.current.push(...data);

        if (buffer.current.length > MAX_BUFFER_SIZE) {
          buffer.current = buffer.current.slice(-MAX_BUFFER_SIZE);
        }

        // Consider updating messages on some other interval if performance degrades
        setMessages([...buffer.current]);
      }
    };
  }, [connectionId, isPaused]);

  const closeConnection = () => {
    socketRef.current?.close();
    socketRef.current = null;
  };

  // Handle connection on mount / unmount
  useEffect(() => {
    startConnection();
    return () => {
      closeConnection();
    };
  }, [startConnection]);

  return { messages, closeConnection, startConnection };
}

export default useProducerConnection;
