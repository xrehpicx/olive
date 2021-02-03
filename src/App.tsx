import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import Home from "./components/Home";
import { PeerContextProvider } from "./components/PeerContext";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0077ff",
      },
      secondary: {
        main: "#ffff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <PeerContextProvider>
        <Home />
      </PeerContextProvider>
    </ThemeProvider>
  );
}

export default App;
