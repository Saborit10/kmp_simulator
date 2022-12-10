import React, {useState} from 'react';
import './App.css';
import {Matcher} from "./components/Matcher";
import {knuthMorrisPrattGenerator} from "./algorithms/KMPAlgorithm";
import {Controller} from "./components/Controller";
import {Interval} from "./algorithms/Interval";
import {State} from './algorithms/State'
import {CodeContainer} from "./components/CodeContainer";


function App() {

    function onNextClick() {
        let item = gen.next();

        setMsg(item.value.msg);
        setState(item.value.data);
    }

    let pattern = "ababaca";
    let text = "bacbababaabcbab";

    // let pattern = "ababb";
    // let text = "abababb";

    /* Hooks */
    const [gen, setGen] = useState(knuthMorrisPrattGenerator(pattern, text));
    const [msg, setMsg] = useState("");

    const [state, setState] = useState(
      new State(
        -1,
        -1,
        new Interval(0, -1),
        new Interval(0, -1),
        new Interval(0, -1),
        0
      )
    );

    return (
      <div className="App">
          {/*<div className="matcher-container">*/}
          {/*    <Matcher*/}
          {/*      pattern={pattern}*/}
          {/*      text={text}*/}
          {/*      cmpPatternId={state.cmpPatternId}*/}
          {/*      cmpTextId={state.cmpTextId}*/}
          {/*      matchedPatternInterval={state.matchedPatternInterval}*/}
          {/*      matchedTextInterval={state.matchedTextInterval}*/}
          {/*      selectedPatternInterval={state.selectedPatternInterval}*/}
          {/*      visiblePatternPrefixLength={state.visiblePatternPrefixLength}*/}
          {/*    />*/}
          {/*</div>*/}

          <div className="controller-container">
              <Controller
                text={msg}
              />
              <div>
                  <button onClick={onNextClick}>NEXT</button>
              </div>

          </div>

          <CodeContainer
            code={["int a = 0;", "for(int i=0; i<=n; i++)", "sol++;"]}
            indent={[0, 0, 1]}
          />
      </div>
    );
}

export default App;
