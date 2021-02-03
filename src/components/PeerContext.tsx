import React, { createContext, useEffect, useState } from "react";

// utils
import Peer from "peerjs";
import { nanoid } from "nanoid";

interface ContextProps {
  peer: Peer;
  peerConnection: Peer.DataConnection;
  peerconState: boolean;
  setPeerConnection: React.Dispatch<
    React.SetStateAction<Peer.DataConnection | undefined>
  >;
  setPeerconState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PeerContext = createContext<Partial<ContextProps>>({});

export function PeerContextProvider({ children }: { children: any }) {
  const [peer, setPeer] = useState<Peer>();

  const [peerConnection, setPeerConnection] = useState<Peer.DataConnection>();
  const [peerconState, setPeerconState] = useState(false);

  useEffect(() => {
    const p = new Peer(nanoid(5), {
      host: "ciapeer.herokuapp.com",
      secure: true,
    });

    p.on("open", (id) => {
      setPeer(p);
      console.log(id);
    });

    p.on("error", (err) => {
      if (err.type === "unavailable-id") {
        window.location.reload();
      }
    });
    p.on("connection", function (conn) {
      setPeerConnection(conn);
    });
  }, []);

  return (
    <PeerContext.Provider
      value={{
        peer,
        peerConnection,
        setPeerConnection,
        peerconState,
        setPeerconState,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}
