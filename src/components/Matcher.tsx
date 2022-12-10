// TSX
import {TILE_WIDTH} from "../Constants";
import {PatternStringTile} from "./PatternStringTile";
import {Interval} from "../algorithms/Interval";
import {TextStringTile} from "./TextStringTile";

// CSS
import '../styles/Matcher.css'

type Prop = {
    pattern: string,
    text: string,
    cmpPatternId: number,
    cmpTextId: number,
    matchedPatternInterval: Interval,
    matchedTextInterval: Interval,
    selectedPatternInterval: Interval,
    visiblePatternPrefixLength: number
}


// function Matcher({pattern, text, cmpPatternId, cmpTextId, matchedPatternPrefix, patternPos, selectedPatternPrefix, visiblePatternPrefixLength}) {
export function Matcher({pattern, text, cmpPatternId, cmpTextId, matchedPatternInterval, matchedTextInterval,
                            selectedPatternInterval, visiblePatternPrefixLength}: Prop){

    let patternPos = matchedTextInterval.start;
    let patternMargin = patternPos * TILE_WIDTH;

    return (
      <>
          <div className="text-container">
              <TextStringTile
                text={text}
                cmpId={cmpTextId}
                matchedInterval={matchedTextInterval}
              />
          </div>

          <div className="pattern-container" style={{marginLeft: patternMargin}}>
              <PatternStringTile
                pattern={pattern}
                cmpId={cmpPatternId}
                visiblePrefixLength={visiblePatternPrefixLength}
                matchedInterval={matchedPatternInterval}
                selectedInterval={selectedPatternInterval}
              />
          </div>
      </>
    );
}
