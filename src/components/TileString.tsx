import React from 'react'
import Tile from "./Tile";
import '../styles/TileString.css'
import {TILE_WIDTH} from "../Constants";

// @ts-ignore
function TileString({str, cmpId, startMatchedId, endMatchedId, selectedPatternPrefix}){
    let imageStyle = {
        marginLeft: cmpId * TILE_WIDTH + 6
    } as React.CSSProperties;

    if( cmpId === -1 )
        imageStyle["visibility"] = "hidden";

    return(
      <>
          <div>
              <img
                className="cursor-container"

                style={imageStyle}
                src={require("../assets/cursor.png")}
                alt={"cursor"}/>
          </div>

          <div className="tileString">
              { Array.from(str).map((ch, i) => (
                <Tile
                  character={ch}
                  matched={startMatchedId<=i && i<=endMatchedId}
                  selected={i < selectedPatternPrefix}
                  compared={i === cmpId}
                  key={i}
                />
              )) }
          </div>
      </>
    );
}
export default TileString;