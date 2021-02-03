import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PeerContext } from "./PeerContext";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import "./css/home.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import SettingsEthernetOutlinedIcon from "@material-ui/icons/SettingsEthernetOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Peer from "peerjs";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Fab from "@material-ui/core/Fab";
import { copyTextToClipboard } from "./utils";
import { InputBase } from "@material-ui/core";
import { ContextProps } from "./types";

export default function Home() {
  const {
    peer,
    peerConnection,
    peerconState,
    pullPage,
    setPullPage,
  } = useContext(PeerContext) as ContextProps;

  const [pullState, setPullState] = useState(0);

  const [shade, setShade] = useState(false);

  const y = useMotionValue(0);
  const background = useTransform(y, [-100, 0], ["#0077ff", "#161922"]);

  const runMenu = useCallback(
    function (ps: number) {
      switch (ps) {
        case 0:
          setPullPage("main");
          break;
        case 1:
          setPullPage("connect");
          break;
        case 2:
          peer && copyTextToClipboard(peer.id);
          if (navigator.share && peer) {
            navigator.share({ text: peer.id });
          }
          break;
        case 3:
          // share
          setPullPage("about");
          break;
        case 4:
          // share
          setPullPage("messages");
          peerConnection?.send({ type: "event", event: "messages" });
          break;
        default:
        // do something
      }
    },
    [peer, peerConnection, setPullPage]
  );

  useEffect(() => {
    if (peerconState) {
      setPullPage("connect");
    }
  }, [peerconState, setPullPage]);

  useEffect(() => {
    if (!peerconState && pullPage === "messages") {
      runMenu(0);
    }
  }, [pullPage, peerconState, runMenu]);

  return (
    <motion.div
      style={{
        background: peerconState && pullPage !== "messages" ? background : "",
      }}
      className="home"
    >
      <AnimatePresence>
        {shade && pullState > 0 ? <Shade {...{ pullState }} /> : ""}
      </AnimatePresence>
      <motion.header
        drag={pullPage !== "messages" ? "y" : false}
        style={{ y }}
        onDragStart={() => {
          if (!peerconState) {
            setShade(true);
            setPullState(0);
          }
        }}
        onDragEnd={() => {
          if (!peerconState) {
            setShade(false);
          }
          runMenu(pullState);
        }}
        onDrag={(e, i) => {
          const y = -i.offset.y;
          if (peer && !peerconState) {
            if (y > 250 && y < 400) {
              setPullState(1);
            } else if (y >= 400 && y < 500) {
              setPullState(2);
            } else if (y >= 500 && y < 550) {
              setPullState(3);
            } else if (y <= 250) {
              setPullState(0);
            }
          } else if (peer && peerconState) {
            if (y >= 400 && y < 500) {
              setPullState(4);
            }
          }
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
      >
        {peer ? (
          pullPage === "main" ? (
            <PeerID
              {...{
                shade,
                pullState,
                peer,
              }}
            />
          ) : pullPage === "about" ? (
            <About />
          ) : pullPage === "connect" ? (
            <Connect />
          ) : pullPage === "messages" ? (
            <Messages setPullPage={setPullPage} />
          ) : (
            <></>
          )
        ) : (
          <motion.div
            className="connecting-loader"
            initial={{
              opacity: 0,
              height: 0,
              y: 0,
              background: "#0077ff",
            }}
            animate={{
              opacity: 1,
              height: "auto",
              background: "coral",
              y: 0,
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                stiffness: 0.2,
                damping: 0.5,
              }}
            >
              Assigning ID...
            </motion.p>
          </motion.div>
        )}
      </motion.header>
    </motion.div>
  );
}

function Messages({
  setPullPage,
}: {
  setPullPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        height: window.innerHeight,
        background: "#161922",
      }}
      className="messages"
    >
      <MessageHeader />
      <MessageContainer setPullPage={setPullPage} />
      <MessageInput />
    </motion.div>
  );
}

function MessageHeader() {
  const { peerConnection } = useContext(PeerContext) as ContextProps;
  return (
    <header>
      <h2>Olive</h2>
      <p>Connected to {peerConnection?.peer}</p>
    </header>
  );
}

function MessageInput() {
  const { peerConnection, setMessage } = useContext(
    PeerContext
  ) as ContextProps;
  const [sendBtn, setSendBtn] = useState(false);

  const message = useRef("");
  const inputfield = useRef<any>();

  function send() {
    if (sendBtn) {
      console.log(message.current.trim());
      const m = { text: message.current.trim() };
      peerConnection?.send({ message: m, type: "message" });
      setMessage && setMessage((mess: any) => [...mess, { ...m, sent: true }]);
      inputfield.current?.value && (inputfield.current.value = "");
      inputfield.current?.focus && inputfield.current?.focus();
    }
  }

  return (
    <div className="message-input">
      <InputBase
        inputRef={inputfield}
        fullWidth
        autoFocus
        multiline
        onChange={(e) => {
          message.current = e.target.value;
          if (message.current.trim()) {
            setSendBtn(true);
          } else {
            setSendBtn(false);
          }
        }}
        inputProps={{ style: { caretColor: "#0077ff", color: "white" } }}
      />

      <SendOutlinedIcon
        style={{ color: "#0077ff", opacity: sendBtn ? 1 : 0.5 }}
        onClick={send}
      />
    </div>
  );
}
function MessageContainer({
  setPullPage,
}: {
  setPullPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { messages, peerConnection, peerconState, setMessage } = useContext(
    PeerContext
  ) as ContextProps;

  return (
    <div className="messages-container">
      {messages?.map((m, i) => <Message key={i} message={m} />).reverse()}
    </div>
  );
}

function Message({ message }: { message: any }) {
  return (
    <div className={message.sent ? "message sent-message" : "message"}>
      <p>{message.text}</p>
    </div>
  );
}

function Connect() {
  const [clip, setClip] = useState("");
  const { peer, peerConnection, peerconState, setPeerConnection } = useContext(
    PeerContext
  ) as ContextProps;
  const [otherid, setOtherid] = useState("");

  useEffect(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (text.length === 5) {
          setClip(text);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!(peerConnection && peerconState)) {
      const interval = setInterval(() => {
        if (!clip) {
          navigator.clipboard
            .readText()
            .then((text) => {
              if (text.length === 5) {
                setClip(text);
                return true;
              }
              return false;
            })
            .catch(() => {});
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [clip, peerConnection, peerconState]);

  function connect(id: string) {
    console.log("connecting to:", id);
    const con = peer?.connect(id);
    console.log(con);
    setPeerConnection && setPeerConnection(con);
    const interval = setInterval(() => {
      console.log(
        "checking connetionState",
        con?.peerConnection?.connectionState
      );
      if (
        con?.peerConnection?.connectionState &&
        con?.peerConnection?.connectionState === "failed"
      ) {
        con.close();
        setPeerConnection && setPeerConnection(undefined);
        connect(id);
        clearInterval(interval);
      } else if (
        (con?.peerConnection?.connectionState &&
          con?.peerConnection?.connectionState === "connected") ||
        !con?.peerConnection?.connectionState
      ) {
        clearInterval(interval);
      }
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: !(peerconState && peerConnection) ? (clip ? 300 : 200) : 200,
        background: "#0077ff",
      }}
      className="connect-page"
    >
      <header>
        <h2>
          {!(peerconState && peerConnection)
            ? "Connect to ID"
            : `Connected to ${peerConnection.peer}`}
        </h2>
        <SettingsEthernetOutlinedIcon />
      </header>
      {!(peerconState && peerConnection) ? (
        <>
          <TextField
            id="partnerid"
            label="partner id"
            defaultValue=""
            // fullWidth
            InputProps={{ style: { caretColor: "white", color: "white" } }}
            autoFocus
            variant="outlined"
            color="secondary"
            onChange={(e) => {
              setOtherid(e.target.value);
            }}
          />
          <Button
            disabled={!(otherid.length === 5)}
            variant="text"
            color="secondary"
            onClick={() => connect(otherid)}
          >
            connect
          </Button>
        </>
      ) : (
        <></>
      )}
      {clip || (peerconState && peerConnection) ? (
        <div className="quick-connect">
          <Fab
            disabled={!!(!peerconState && peerConnection)}
            onClick={() => {
              if (peerconState && peerConnection) {
                peerConnection.close();
              } else {
                connect(clip);
              }
            }}
            variant="extended"
            style={
              peerconState && peerConnection
                ? { background: "coral", color: "white" }
                : {}
            }
          >
            {peerconState && peerConnection ? (
              <></>
            ) : (
              <AssignmentOutlinedIcon />
            )}
            <p>
              {!peerconState && !peerConnection
                ? `connect to ${clip}`
                : !peerconState && peerConnection
                ? `connecting to ${peerConnection.peer}`
                : `disconnect from ${peerConnection && peerConnection.peer}`}
            </p>
          </Fab>
        </div>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: 120,
        background: "coral",
      }}
      className="about"
    >
      <header>
        <h2>whats this?</h2>
        <HelpOutlineIcon />
      </header>
      <p>
        just a ux experiment and also u can use this to watch youtube with like
        one other person
      </p>
    </motion.div>
  );
}

function PeerID({
  shade,
  pullState,
  peer,
}: {
  shade: boolean;
  pullState: number;
  peer: Peer;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: 200,
      }}
      className="peer-id"
    >
      <div className="pull-up-indicator">
        <motion.span
          initial={{ y: 5 }}
          animate={{ y: -5 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            stiffness: 0.2,
            damping: 0.5,
          }}
        >
          {!shade && pullState === 0 ? "pull up" : "drag to select"}
        </motion.span>
      </div>
      <h6>you are</h6>
      <p>{peer?.id}</p>
    </motion.div>
  );
}

function Shade({ pullState }: { pullState: number }) {
  const { peerConnection, peerconState } = useContext(
    PeerContext
  ) as ContextProps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      exit={{ opacity: 0, y: 200 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="shade-menu"
    >
      <div
        style={{ background: pullState === 3 ? "var(--accent)" : "" }}
        className="menu-item"
      >
        <p>what is this?</p>
        <HelpOutlineIcon />
      </div>
      <div
        style={{ background: pullState === 2 ? "var(--accent)" : "" }}
        className="menu-item"
      >
        <p>share id</p>
        <ShareOutlinedIcon />
      </div>
      {!peerConnection ? (
        <div
          style={{ background: pullState === 1 ? "var(--accent)" : "" }}
          className="menu-item"
        >
          <p>connect with</p>
          <SettingsEthernetOutlinedIcon />
        </div>
      ) : (
        <div
          style={{ background: peerconState ? "var(--accent)" : "coral" }}
          className="menu-item"
        >
          <p>
            {peerconState
              ? `connected to ${peerConnection.peer}`
              : `connecting to ${peerConnection.peer}`}
          </p>
          <SettingsEthernetOutlinedIcon />
        </div>
      )}
    </motion.div>
  );
}
