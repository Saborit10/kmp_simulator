
export class Interval{
    private _start: number;
    private _end: number;

    constructor(start: number, end: number) {
        this._start = start;
        this._end = end;
    };

    public contains(x: number): boolean{
        return this._start <= x && x <= this._end;
    }

    public length(): number{
        return this._end - this._start + 1;
    }

    public static prefix(length: number): Interval{
        return new Interval(0, length-1);
    }

    get start(): number {
        return this._start;
    }

    set start(value: number) {
        this._start = value;
    }

    get end(): number {
        return this._end;
    }

    set end(value: number) {
        this._end = value;
    }
}