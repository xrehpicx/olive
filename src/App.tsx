import React, { useContext, useEffect } from 'react';
import { PeerContext, PeerContextProvider } from './components/PeerContext';



function App() {

  const { peer } = useContext(PeerContext);

  useEffect(() => {
    console.log(peer?.id)
  }, [peer])

  return (
    <PeerContextProvider>
      <div className="App">

      </div>
    </PeerContextProvider>
  );
}

export default App;
