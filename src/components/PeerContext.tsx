import React, { createContext, useEffect, useState } from "react";

// utils
import Peer from "peerjs";
import { nanoid } from "nanoid";

interface ContextProps {
  peer: Peer;
}

export const PeerContext = createContext<Partial<ContextProps>>({});

export function PeerContextProvider({ children }: { children: any }) {
  const [peer, setPeer] = useState<Peer>();
 

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
  }, []);

  

  return (
    <PeerContext.Provider value={{ peer }}>{children}</PeerContext.Provider>
  );
}