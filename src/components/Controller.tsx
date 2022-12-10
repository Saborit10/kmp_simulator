import '../styles/Controller.css'

// @ts-ignore
export function Controller({text}){
    return (
      <div className="message-box">
          <p>
              {text}
          </p>
      </div>
    );
}

