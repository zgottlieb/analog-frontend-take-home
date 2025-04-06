import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';

function useProducerConnection(connectionId: string): {
  messages: Message[];
  closeConnection: () => void;
  startConnection: () => void;
} {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const startConnection = useCallback(() => {
    // Only create a new connection if there's no active socket
    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED)
      return;

    socketRef.current = new WebSocket(
      `http://localhost:8000/producer/${connectionId}`
    );
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update messages array without triggering extra re-renders if you don't need to
      setMessages((prevMessages) => [...prevMessages, ...data]);
    };
  }, [connectionId]);

  const closeConnection = () => {
    socketRef.current?.close();
    // Optional: null out the reference so startConnection knows it needs to create a new one.
    socketRef.current = null;
  };

  useEffect(() => {
    startConnection();
    return () => {
      closeConnection();
    };
  }, [startConnection]);

  return { messages, closeConnection, startConnection };
}

export default useProducerConnection;
