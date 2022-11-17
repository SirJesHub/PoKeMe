import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketClient = io.connect("http://localhost:3001");

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
