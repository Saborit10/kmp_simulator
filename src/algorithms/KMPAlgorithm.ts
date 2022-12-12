import {State} from "./State";
import {Interval} from "./Interval";

export type Event = {
    data: State;
    msg: string;
    line: number;
};

export function* knuthMorrisPrattGenerator(P: string, T: string): Generator<Event> {
    let st = 0, lp = P.length, lt = T.length;
    let fail: number[] = [0];
    let occ: number[] = [];

    for(let i = 1; i < lp; i++) {
        fail.push(0);
        st = fail[i - 1];

        while (st > 0 && P[st] !== P[i])
            st = fail[st - 1];

        if (P[st] === P[i])
            fail[i] = st + 1;
    }

    st = 0;
    for(let i=0; i < lt; i++){
        yield {
            data: State.buildState(i, st, true, true, Interval.prefix(0)),
            msg: `Analizamos el caracter en la posicion ${i}. `,
            line: 1
        };

        if( st === 0 && P[st] !== T[i] ){
            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(0)),
                msg: `No hay coincidencia entre los caracteres '${T[i]}' y '${P[st]}',` +
                  ` pero no ajustamos el patron, ya que hemos hecho coincidir solo la cadena vacia (st = 0).`,
                line: 2
            };
        }
        else if( P[st] === T[i] ){
            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(0)),
                msg: `El ciclo while no se ejecuta`,
                line: 2
            };
        }
        else if( st > 0 && P[st] !== T[i] ){
            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(0)),
                msg: `Ya que no hay coincidencia entre los caracteres '${T[i]}' y '${P[st]}', ajustamos el patron.`,
                line: 2
            };
        }

        while( st > 0 && P[st] !== T[i] ){
            yield {
                data: State.buildState(i, st, true, false, Interval.prefix(fail[st-1])),
                msg: `El mayor prefijo de "${P.substring(0, st)}",` +
                     ` que tambien es su sufijo propio, es ${fail[st-1] === 0 ? "la cadena vacia" : `"` + P.substring(0, fail[st-1]) + `"`}.`,
                line: 3
            };

            let old_st = st;
            st = fail[st-1];

            yield {
                data: State.buildState(i, st, true, false, Interval.prefix(old_st)),
                msg: `Hemos ajustado el patron. Lo hemos desplazado hacia la derecha hasta` +
                  ` dejar como coincidencia el prefijo "${P.substring(0, st)}"`,
                line: 3
            };

            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(st)),
                msg: `Tratamos de hacer coincidir el proximo carater del patron con el caracter actual en el texto. ` +
                  (
                    P[st] === T[i] ?
                      `Los caracteres coinciden.` :
                      `Los caracteres '${T[i]}' y '${P[st]}' no coinciden.`
                  ),
                line: 2
            };
        }

        yield {
            data: State.buildState(i, st, true, true, Interval.prefix(0)),
            msg: `Comparamos los caracteres P[st] y T[i].`,
            line: 4
        };

        let matched_current_char = false;

        if( P[st] === T[i] ){
            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(0)),
                msg: `Hay una coincidencia, ya que ambos caracteres son iguales a '${T[i]}'. Aumentamos` +
                  ` en 1 el largo del prefijo matcheado`,
                line: 5
            };
            matched_current_char = true;
            st++;
        }
        else {
            yield {
                data: State.buildState(i, st, true, true, Interval.prefix(0)),
                msg: `No hay coincidencia, ya que los caracteres son '${P[st]}' y '${T[i]}'.`,
                line: 4
            };
        }

        yield {
            data: State.buildState(i+1, st, false, false, Interval.prefix(0)),
            msg: `Comparamos la cantidad de caracteres matcheados (${st}) ` +
              ` con el largo del patron (${lp}).`,
            line: 6
        };

        if( st === lp ){
            occ.push(i-lp+1);
            
            yield {
                data: State.buildState(i+1, st, false, false, Interval.prefix(0)),
                msg: `La cantidad de caracteres matcheados es igual al largo del patron, que es ${lp}'.` +
                  ` Hemos encontrado una ocurrencia del patron, que comienza en la posicion ${i-lp+1}.`,
                line: 7
            };
            
            let old_st = st;
            st = fail[st-1];

            yield {
                data: State.buildState(i+1, st, false, false, Interval.prefix(st)),
                msg: `Ahora ajustamos el patron. El mayor prefijo de ${P.substring(0, st)}` +
                  ` Hemos encontrado una ocurrencia del patron, que comienza en la posicion ${i-lp+1}.`,
                line: 8
            };
        }
        else{
            yield {
                data: State.buildState(i+1, st, false, false, Interval.prefix(0)),
                msg: `La cantidad de caracteres matcheados es menor que el largo del ` +
                  `patron (${st} < ${lp}), por lo que NO hemos encontrado una ocurrencia.`,
                line: 6
            };
        }
    }

    yield {
        data: State.buildState(0, 0, false, false, Interval.prefix(0)),
        msg: `Termina el algoritmo.`,
        line: 10
    };
}
