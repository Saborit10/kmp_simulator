import React from 'react'
import Tile from "./Tile";
import '../styles/TileString.css'

// @ts-ignore
function TileString({str, cmpId, matchedPrefix}){
    return(
        <div className="tileString">
            { Array.from(str).map((ch, i) => (
              <Tile
                character={ch}
                matched={i < matchedPrefix}
                key={i}
              />
            )) }
        </div>
    );
}
export default TileString;