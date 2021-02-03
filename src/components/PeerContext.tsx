import React, { createContext, useEffect, useState } from "react";

// utils
import Peer from "peerjs";
import { nanoid } from "nanoid";
import { ContextProps } from "./types";

export const PeerContext = createContext<ContextProps | {}>({});

export function PeerContextProvider({ children }: { children: any }) {
  const [peer, setPeer] = useState<Peer | null>(null);

  const [
    peerConnection,
    setPeerConnection,
  ] = useState<Peer.DataConnection | null>(null);
  const [peerconState, setPeerconState] = useState(false);
  const [pullPage, setPullPage] = useState("main");
  const [messages, setMessage] = useState<any>([]);

  useEffect(() => {
    if (peerConnection && peerconState) {
      const ondata = (data: any) => {
        console.log(data);
        if (data.type === "message") {
          setMessage && setMessage((m: any) => [...m, data[data.type]]);
        } else if (data.type === "event") {
          if (data.event === "messages") setPullPage("messages");
        }
      };
      peerConnection.on("data", ondata);

      return () => {
        peerConnection.off("data", ondata);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerconState, peerConnection]);
  useEffect(() => {
    console.log("peer con set:", peerConnection, peerconState);
    if (peerConnection && !peerconState) {
      const open = () => {
        console.log("connected");
        setPeerconState(true);
      };

      peerConnection.on("open", open);

      return () => {
        peerConnection.off("open", open);
      };
    }
  }, [peerConnection, peerconState]);

  useEffect(() => {
    if (peerConnection) {
      const close = () => {
        console.log("disconnected");
        setPeerconState(false);
        setPeerConnection(null);
      };
      const err = (err: any) => {
        console.log("err", err);
        setPeerconState(false);
        setPeerConnection(null);
      };
      peerConnection.on("close", close);
      peerConnection.on("error", err);

      return () => {
        peerConnection.off("close", close);
        peerConnection.off("error", err);
      };
    }
  }, [peerConnection]);

  useEffect(() => {
    const p = new Peer(nanoid(5), {
      host: "ciapeer.herokuapp.com",
      secure: true,
    });

    const open = (id: string) => {
      setPeer(p);
      console.log(id);
    };
    const err = (err: any) => {
      if (err.type === "unavailable-id") {
        window.location.reload();
      }
    };
    const connection = (conn: Peer.DataConnection) => {
      console.log("getting connection from", conn.peer);
      setPeerConnection(conn);
    };
    p.on("open", open);

    p.on("error", err);
    p.on("connection", connection);

    return () => {
      p.off("open", open);
      p.off("error", err);
      p.off("connection", connection);
    };
  }, []);

  return (
    <PeerContext.Provider
      value={{
        peer,
        peerConnection,
        messages,
        setPeerConnection,
        peerconState,
        setPeerconState,
        setMessage,
        pullPage,
        setPullPage,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
}
