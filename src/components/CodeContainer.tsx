
// CSS
import '../styles/CodeContainer.css'

type Prop = {
    code: string[]
    indent: number[]
};

const TAB_SIZE = 4;

export function CodeContainer({code, indent}: Prop){
    return (
      <div className="code-container">
          {
              code.map((line, i) => {
                  let line_indent = "";

                  for(let i=0; i < TAB_SIZE * indent[i]; i++)
                      line_indent += " ";

                  return (
                    <p>
                        {line_indent + line}
                    </p>
                  );
              })
          }
      </div>
    );
}