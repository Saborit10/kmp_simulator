import React from 'react'
import '../styles/Tile.css'

// @ts-ignore
function Tile({character, matched}){
    let className = `tile ${matched ? "matched" : "unmatched"}`

    return (
        <div className={className}>
            {character}
        </div>
    );
}

export default Tile;