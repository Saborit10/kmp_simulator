import {State} from "./State";
import {Interval} from "./Interval";

export function* knuthMorrisPrattGenerator(P: string, T: string): Generator<object> {
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
            data: State.buildState(i, st, true, Interval.prefix(0)),
            msg: `Analizamos el caracter en la posicion ${i}. ` +
              (P[st] === T[i] ?
              `Hay un coincidencia del caracter '${T[i]}' con el caracter correspondiente en el patron.` :
              `No hay coincidencia entre los caracteres '${T[i]}' y '${P[st]}', por lo que ajustamos el patron.`)
        };

        while( st > 0 && P[st] !== T[i] ){
            yield {
                data: State.buildState(i, st, false, Interval.prefix(fail[st-1])),
                msg: `El mayor prefijo de "${P.substring(0, st)}",` +
                     ` que tambien es su sufijo propio, es ${fail[st-1] === 0 ? "la cadena vacia" : `"` + P.substring(0, fail[st-1]) + `"`}.`
            };

            let old_st = st;
            st = fail[st-1];

            yield {
                data: State.buildState(i, st, false, Interval.prefix(old_st)),
                msg: `Hemos ajustado el patron. Lo hemos desplazado hacia la derecha hasta` +
                  ` dejar como coincidencia el prefijo "${P.substring(0, st)}"`
            };

            yield {
                data: State.buildState(i, st, true, Interval.prefix(st)),
                msg: `Tratamos de hacer coincidir el proximo carater del patron con el caracter actual en el texto. ` +
                  (
                    P[st] === T[i] ?
                      `Los caracteres coinciden.` :
                      `Los caracteres '${T[i]}' y '${P[st]}' no coinciden.`
                  )
            };
        }

        if( P[st] === T[i] ){
            st++;
        }

        if( st === 0 ){
            yield {
                data: State.buildState(i, st, true, Interval.prefix(st)),
                msg: `No hay coincidencias. Ahora pasamos a analizar el siguiente caracter del texto.`
            };
        }

        if( st === lp ){
            occ.push(i-lp+1);
            st = fail[st-1];

            // yield state
        }
    }

    // yield {matches: occ};
}
