import TileString from "./TileString";

// @ts-ignore
function Matcher(props) {
    return (
      <>
          <div className="text-container">
              <TileString
                str={"GATAGACA"}
                cmpId={props.cmpTextId}
                matchedPrefix={-1}
              />
          </div>

          <div className="pattern-container">
              <TileString
                str={"GA"}
                cmpId={props.cmpPatternId}
                matchedPrefix={props.matchedPatternPrefix}
              />
          </div>
      </>
    );
}

export default Matcher;