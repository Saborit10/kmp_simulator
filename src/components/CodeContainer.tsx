// CSS
import '../styles/CodeContainer.css'

type Prop = {
    code: string[];
    indent: number[];
    selectedLine: number;
};

const TAB_SIZE = 4;

export function CodeContainer({code, indent, selectedLine}: Prop) {
    const reservedWords = ["for", "while", "if"]

    return (
      <div className="code-container">
          {
              code.map((line, i) => {
                  let line_indent = "";

                  for (let j = 0; j < TAB_SIZE * indent[i]; j++)
                      line_indent += "\u00A0";

                  return (
                    <div className="line-container" key={i}>
                        <div className="cursor-container">
                            <img
                              className={"cursor-image" + (
                                (i + 1 === selectedLine) ? " cursor-visible" : ""
                              )}
                              src={require("../assets/cursor-line.png")}
                              alt={"cursor-line"}
                            />
                        </div>

                        <div className="text-line-container">
                            <p>
                                {line_indent + line}
                            </p>
                        </div>
                    </div>
                  );
              })
          }
      </div>
    );
}