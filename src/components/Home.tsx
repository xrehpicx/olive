import React, { useContext, useEffect, useState } from "react";
import { PeerContext } from "./PeerContext";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import "./css/home.css";

import SettingsEthernetOutlinedIcon from "@material-ui/icons/SettingsEthernetOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Peer from "peerjs";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import Fab from "@material-ui/core/Fab";

export default function Home() {
  const { peer } = useContext(PeerContext);

  const [pullState, setPullState] = useState(0);
  const [pullPage, setPullPage] = useState("main");
  const [shade, setShade] = useState(false);

  function runMenu(ps: number) {
    switch (ps) {
      case 0:
        setPullPage("main");
        break;
      case 1:
        setPullPage("connect");
        break;
      case 3:
        // share
        setPullPage("about");
        break;
      default:
      // do something
    }
  }

  return (
    <div className="home">
      <AnimatePresence>
        {shade && pullState > 0 ? <Shade {...{ pullState }} /> : ""}
      </AnimatePresence>
      <motion.header
        drag="y"
        onDragStart={() => {
          setShade(true);
          setPullState(0);
        }}
        onDragEnd={() => {
          setShade(false);
          runMenu(pullState);
        }}
        onDrag={(e, i) => {
          if (peer) {
            const y = Math.abs(i.offset.y);
            if (y > 250 && y < 400) {
              setPullState(1);
            } else if (y >= 400 && y < 500) {
              setPullState(2);
            } else if (y >= 500 && y < 550) {
              setPullState(3);
            } else if (y <= 250) {
              setPullState(0);
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
    </div>
  );
}
function Connect() {
  const [clip, setClip] = useState("");
  const { peer, setPeerConnection } = useContext(PeerContext);
  const [otherid, setOtherid] = useState("");
  useEffect(() => {
    navigator.clipboard.readText().then((text) => {
      if (text.length === 5) {
        setClip(text);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!clip) {
        navigator.clipboard.readText().then((text) => {
          if (text.length === 5) {
            setClip(text);
            return true;
          }
          return false;
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [clip]);

  function connect(id: string) {
    console.log("connecting to:", id);
    const con = peer?.connect(id);
    console.log(con);
    setPeerConnection && setPeerConnection(con);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        height: clip ? 300 : 200,
        background: "#0077ff",
      }}
      className="connect-page"
    >
      <header>
        <h2>Connect to ID</h2>
        <SettingsEthernetOutlinedIcon />
      </header>
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
      {clip ? (
        <div className="quick-connect">
          <Fab
            onClick={() => connect(clip)}
            variant="extended"
            color="secondary"
          >
            <AssignmentOutlinedIcon />
            <p>connect to {clip}</p>
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
  const { peerConnection, peerconState } = useContext(PeerContext);

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
