
// TSX
import React, {useState} from 'react';
import {Matcher} from "./components/Matcher";
import {Controller} from "./components/Controller";
import {CodeContainer} from "./components/CodeContainer";

// CSS
import './App.css';

// TS
import {knuthMorrisPrattGenerator} from "./algorithms/KMPAlgorithm";
import {Interval} from "./algorithms/Interval";
import {State} from './algorithms/State'
import {json_string} from "./algorithms/JavaCode";
import {Event} from "./algorithms/KMPAlgorithm";


function extractAll(generator: Generator<Event>) {
    let events: Event[] = [];

    while( true ){
        let item = generator.next();

        if( item.done === true ){
            break;
        }

        events.push(item.value);
    }
    return events;
}

function App() {

    function onNextClick() {
        console.log(eventId)
        setEventId(eventId + 1);
        console.log(eventId)

        setMsg(events[eventId].msg);
        setState(events[eventId].data);
        setLine(events[eventId].line)
    }

    let pattern = "ababaca";
    let text = "bacbababaabcbab";

    // let pattern = "ababb";
    // let text = "abababb";

    /* Hooks */
    const [events, setEvents] = useState(extractAll(knuthMorrisPrattGenerator(pattern, text)));
    const [eventId, setEventId] = useState(-1);
    const [msg, setMsg] = useState("");
    const [line, setLine] = useState(-1);

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

    const json_object = JSON.parse(json_string)

    return (
      <div className="App">
          <h1>
              Knuth-Morris-Pratt
          </h1>

          <Matcher
                pattern={pattern}
                text={text}
                cmpPatternId={state.cmpPatternId}
                cmpTextId={state.cmpTextId}
                matchedPatternInterval={state.matchedPatternInterval}
                matchedTextInterval={state.matchedTextInterval}
                selectedPatternInterval={state.selectedPatternInterval}
                visiblePatternPrefixLength={state.visiblePatternPrefixLength}
          />

          <div className="controller-container">
              <div className="code-message-container">
                  <CodeContainer
                    code={json_object["code"]}
                    indent={json_object["indent"]}
                    selectedLine={line}
                  />

                  <Controller
                    text={msg}
                  />

              </div>

              <div className="panel-container">
                  <button onClick={onNextClick}>NEXT</button>
              </div>

          </div>
      </div>
    );
}

export default App;
