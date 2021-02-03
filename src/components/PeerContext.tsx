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
    console.log(peerconState)
  }, [peerconState])

  useEffect(() => {
    console.log('peer con set:', peerConnection, peerconState)
    if (peerConnection && !peerconState) {

      const open = () => {
        console.log('connected');
        setPeerconState(true);
      }

      peerConnection.on('open', open)
      console.log('open event set')


      return () => {
        peerConnection.off('open', open)

      }
    }
  }, [peerConnection, peerconState])

  useEffect(() => {
    if (peerConnection) {
      const close = () => {
        console.log('disconnected');
        setPeerconState(false);
        setPeerConnection(undefined);
      }
      const err = (err: any) => {
        console.log('err', err);
        setPeerconState(false);
        setPeerConnection(undefined);

      }
      peerConnection.on('close', close)
      peerConnection.on('error', err)

      return () => {
        peerConnection.off('close', close)
        peerConnection.off('error', err)
      }
    }
  }, [peerConnection])

  useEffect(() => {
    const p = new Peer(nanoid(5), {
      host: "ciapeer.herokuapp.com",
      secure: true,
    });

    const open = (id: string) => {
      setPeer(p);
      console.log(id);
    }
    const err = (err: any) => {
      if (err.type === "unavailable-id") {
        window.location.reload();
      }
    }
    const connection = (conn: Peer.DataConnection) => {
      console.log('getting connection from', conn.peer)
      setPeerConnection(conn);
    }
    p.on("open", open);

    p.on("error", err);
    p.on("connection", connection);

    return () => {
      p.off('open', open);
      p.off('error', err);
      p.off('connection', connection);
    }

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
