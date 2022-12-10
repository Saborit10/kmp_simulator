import {Interval} from "./Interval";

export class State{
    private _cmpPatternId: number;
    private _cmpTextId: number;
    private _matchedPatternInterval: Interval;
    private _matchedTextInterval: Interval;
    private _selectedPatternInterval: Interval;
    private _visiblePatternPrefixLength: number;

    public constructor(cmpPatternId: number, cmpTextId: number, matchedPatternInterval: Interval, matchedTextInterval: Interval, selectedPatternInterval: Interval, visiblePatternPrefixLength: number) {
        this._cmpPatternId = cmpPatternId;
        this._cmpTextId = cmpTextId;
        this._matchedPatternInterval = matchedPatternInterval;
        this._matchedTextInterval = matchedTextInterval;
        this._selectedPatternInterval = selectedPatternInterval;
        this._visiblePatternPrefixLength = visiblePatternPrefixLength;
    }

    public static buildState(i: number, st: number, showCmp: boolean, selectedPatternInterval: Interval): State{
        let visiblePatternPrefixLength = st + (showCmp ? 1 : 0);
        let patternPos = i - st;

        return new State(
          st,
          i,
          new Interval(0, st - 1),
          new Interval(patternPos, patternPos + st - 1),
          selectedPatternInterval,
          visiblePatternPrefixLength
        );
    }


    get cmpPatternId(): number {
        return this._cmpPatternId;
    }

    set cmpPatternId(value: number) {
        this._cmpPatternId = value;
    }

    get cmpTextId(): number {
        return this._cmpTextId;
    }

    set cmpTextId(value: number) {
        this._cmpTextId = value;
    }

    get matchedPatternInterval(): Interval {
        return this._matchedPatternInterval;
    }

    set matchedPatternInterval(value: Interval) {
        this._matchedPatternInterval = value;
    }

    get matchedTextInterval(): Interval {
        return this._matchedTextInterval;
    }

    set matchedTextInterval(value: Interval) {
        this._matchedTextInterval = value;
    }

    get selectedPatternInterval(): Interval {
        return this._selectedPatternInterval;
    }

    set selectedPatternInterval(value: Interval) {
        this._selectedPatternInterval = value;
    }

    get visiblePatternPrefixLength(): number {
        return this._visiblePatternPrefixLength;
    }

    set visiblePatternPrefixLength(value: number) {
        this._visiblePatternPrefixLength = value;
    }
}
