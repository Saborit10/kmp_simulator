import React from 'react'
import '../styles/Tile.css'

// @ts-ignore
function Tile({character, matched, selected, compared}){
    let className = `tile ${matched ? "matched" : "unmatched"}`

    if( selected )
        className += " selected";

    if( compared )
        className += " compared";

    return (
        <div className={className}>
            {character}
        </div>
    );
}

export default Tile;