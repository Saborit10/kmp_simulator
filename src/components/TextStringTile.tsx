
// TSX
import {Interval} from "../algorithms/Interval";
import {TILE_WIDTH} from "../Constants";
import React from "react";
import Tile from "./Tile";

// CSS
import '../styles/TileString.css'


type Prop = {
    text: string,
    cmpId: number,
    matchedInterval: Interval
}

export function TextStringTile({text, cmpId, matchedInterval}: Prop) {
    let imageStyle = {
        marginLeft: cmpId * TILE_WIDTH + 6
    } as React.CSSProperties;

    if (cmpId === -1)
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
                  Array.from(text).map((ch, i) => (
                    <Tile
                      character={ch}
                      matched={matchedInterval.contains(i)}
                      selected={false}
                      compared={i === cmpId}
                      key={i}
                    />
                  ))
              }
          </div>
      </>
    );

}