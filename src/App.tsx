import React, {useState} from 'react';
import './App.css';
import Matcher from "./components/Matcher";

function App() {

    /* Hooks */
    const [patternPos, setPatternPos] = useState(0);
    const [cmpPatternId, setCmpPatternId] = useState(-1);
    const [cmpTextId, setCmpTextId] = useState(-1);
    const [matchedPatternPrefix, setMatchedPatternPrefix] = useState(1);


    function increasePatternPos() {
        setPatternPos(patternPos + 1);
    }

    return (
      <div className="App">
          <div className="matcher-container">
              <Matcher
                patternPos={patternPos}
                cmpPatternId={cmpPatternId}
                cmpTextId={cmpTextId}
                matchedPatternPrefix={matchedPatternPrefix}
              />
          </div>
      </div>
    );
}

export default App;
