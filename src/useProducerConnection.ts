import { useState, useEffect, useRef } from 'react';

function useProducerConnection(connectionId: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const startConnection = () => {
    // Only create a new connection if there's no active socket
    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED)
      return;

    socketRef.current = new WebSocket(
      `http://localhost:8000/producer/${connectionId}`
    );
    socketRef.current.onmessage = (event) => {
      // Update messages array without triggering extra re-renders if you don't need to
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
  };

  const closeConnection = () => {
    socketRef.current?.close();
    // Optional: null out the reference so startConnection knows it needs to create a new one.
    socketRef.current = null;
  };

  // Optionally, auto-start on mount
  useEffect(() => {
    startConnection();
    return () => {
      closeConnection();
    };
  }, []);

  return { messages, closeConnection, startConnection };
}

export default useProducerConnection;
