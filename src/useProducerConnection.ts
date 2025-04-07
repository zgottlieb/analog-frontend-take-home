import { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';

// TODO: Tweak these constants based on performance testing
// Maximum number of messages to keep in the buffer
const MAX_BUFFER_SIZE = 1000;

// Update interval in milliseconds (~30 FPS)
const UPDATE_INTERVAL = 33;

function useProducerConnection(connectionId: string): {
  messages: Message[];
  closeConnection: () => void;
  startConnection: () => void;
} {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const buffer = useRef<Message[]>([]);

  const startConnection = useCallback(() => {
    // Only create a new connection if there's no active socket
    if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED)
      return;

    socketRef.current = new WebSocket(
      `http://localhost:8000/producer/${connectionId}`
    );
    socketRef.current.onmessage = (event) => {
      const data: Message[] = JSON.parse(event.data);
      buffer.current.push(...data);

      // Trim the buffer if it grows too large
      if (buffer.current.length > MAX_BUFFER_SIZE) {
        buffer.current = buffer.current.slice(-MAX_BUFFER_SIZE);
      }
    };
  }, [connectionId]);

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

  // TODO: Double check this approach; Can we pass new array
  // only if buffer has changed to avoid unnecessary re-renders?
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessages([...buffer.current]);
    }, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return { messages, closeConnection, startConnection };
}

export default useProducerConnection;
