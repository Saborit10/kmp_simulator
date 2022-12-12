
// TSX
import React, {useRef, useState} from 'react';
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
import {TILE_WIDTH} from "./Constants";


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
        if( eventId === events.length-1 ){
            return;
        }

        setEventId(eventId + 1);

        setMsg(events[eventId + 1].msg);
        setState(events[eventId + 1].data);
        setLine(events[eventId + 1].line);
    }

    function onPreviousClick() {
        if( eventId === 0 )
            return;

        setEventId(eventId - 1);

        setMsg(events[eventId - 1].msg);
        setState(events[eventId - 1].data);
        setLine(events[eventId - 1].line);
    }


    // let pattern = "ababb";
    // let text = "abababb";

    // let pattern = "ababaca";
    // let text = "bacbababaabcbab";

    /* Hooks */
    const [pattern, setPattern] = useState("");
    const [text, setText] = useState("");
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
        0,
        false
      )
    );

    const textInputRef = useRef(null);
    const patternInputRef = useRef(null);


    function onLoadClick() {
        if( textInputRef.current )
            setText(textInputRef.current["value"]);
        else
            setText("");

        if( patternInputRef.current )
            setPattern(patternInputRef.current["value"]);
        else
            setPattern("");

        if( textInputRef.current && patternInputRef.current )
            setEvents(extractAll(knuthMorrisPrattGenerator(
                patternInputRef.current["value"],
                textInputRef.current["value"])));
        // setEventId(0);
    }


    const json_object = JSON.parse(json_string);


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
                showCmpText={state.showCmpText}
                isHidden={pattern === "" || text === ""}
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
                  <button onClick={onPreviousClick}>Anterior</button>
                  <button onClick={onNextClick}>Siguiente</button>
                  <button onClick={onLoadClick}>Cargar</button>
                  <input
                    type="text"
                    id="pattern-input"
                    placeholder="Patron"
                    ref={patternInputRef}
                  />
                  <input
                    type="text"
                    id="text-input"
                    placeholder="Texto"
                    ref={textInputRef}
                  />
              </div>
          </div>
      </div>
    );
}

export default App;
