import Peer from "peerjs";

export interface ContextProps {
  peer: Peer | null;
  peerConnection: Peer.DataConnection | undefined | null;
  peerconState: boolean;
  messages: [any];
  setPeerConnection: React.Dispatch<
    React.SetStateAction<Peer.DataConnection | undefined | null>
  >;
  setPeerconState: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<any>>;
  pullPage: string;
  setPullPage: React.Dispatch<React.SetStateAction<string>>;
}
