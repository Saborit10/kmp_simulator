
// JSX
import {Interval} from "../algorithms/Interval";
import {TILE_WIDTH} from "../Constants";
import React from "react";
import Tile from "./Tile";

// CSS
import '../styles/TileString.css'

type Prop = {
    pattern: string,
    cmpId: number,
    visiblePrefixLength: number,
    matchedInterval: Interval,
    selectedInterval: Interval
}

export function PatternStringTile({pattern, cmpId, visiblePrefixLength, matchedInterval, selectedInterval}: Prop) {
    let imageStyle = {
        marginLeft: cmpId * TILE_WIDTH + 6
    } as React.CSSProperties;

    if ( cmpId === -1 || cmpId >= visiblePrefixLength )
        imageStyle["visibility"] = "hidden";

    return (
      <>
          <div>
              <img
                className="cursor-container"

                style={imageStyle}
                src={require("../assets/cursor.png")}
                alt={"cursor"}/>
          </div>

          <div className="tileString">
              {
                  Array.from(pattern)
                    .filter((ch, i) => i < visiblePrefixLength)
                    .map((ch, i) => (
                      <Tile
                        character={ch}
                        matched={matchedInterval.contains(i)}
                        selected={selectedInterval.contains(i)}
                        compared={i === cmpId}
                        key={i}
                      />
                    ))
              }
          </div>
      </>
    );
}