// TSX
import {TILE_WIDTH} from "../Constants";
import {PatternStringTile} from "./PatternStringTile";
import {Interval} from "../algorithms/Interval";
import {TextStringTile} from "./TextStringTile";

// CSS
import '../styles/Matcher.css'
import React from "react";

type Prop = {
    pattern: string;
    text: string;
    cmpPatternId: number;
    cmpTextId: number;
    matchedPatternInterval: Interval;
    matchedTextInterval: Interval;
    selectedPatternInterval: Interval;
    visiblePatternPrefixLength: number;
    showCmpText: boolean;
    isHidden: boolean;
}

export function Matcher({pattern, text, cmpPatternId, cmpTextId, matchedPatternInterval, matchedTextInterval,
                            selectedPatternInterval, visiblePatternPrefixLength, showCmpText, isHidden}: Prop){

    let patternPos = matchedTextInterval.start;
    let patternMargin = patternPos * TILE_WIDTH;

    let matcherStyle = {} as React.CSSProperties;

    if( isHidden )
        matcherStyle["visibility"] = "hidden";

    return (
      <div className="matcher-container" style={matcherStyle}>
          <div className="text-container">
              <TextStringTile
                text={text}
                cmpId={cmpTextId}
                matchedInterval={matchedTextInterval}
                showCmp={showCmpText}
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
      </div>
    );
}
