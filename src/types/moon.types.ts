import {MOON_ABBR} from "../constant/moon.constants"

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type MarsHour = number // 0 ... 24
export type MarsMinute = number // 0 ... 99

// Input types
export type MoonInputTimestamp = `[${MarsHour}:${MarsMinute}]`
export type DeimosInputTimestamp = `D${MoonInputTimestamp}`
export type PhobosInputTimestamp = `P${MoonInputTimestamp}`
export type MoonInputLine = `${DeimosInputTimestamp};${PhobosInputTimestamp}`
export type MoonInputTimestampTuple = [DeimosInputTimestamp, PhobosInputTimestamp]
export type MarsMoonInputTimestamp = DeimosInputTimestamp | PhobosInputTimestamp

// Program types
export type MoonTimestamp = { hour: MarsHour, minute: MarsMinute }
export type MoonTimestampDuration = MoonTimestamp[]
export type MoonRiseSinkTimestamp = { rise: MoonTimestamp, sink: MoonTimestamp, readonly abbr: MarsMoonAbbr }
export type DeimosTimestamp = Override<MoonRiseSinkTimestamp, { abbr: 'D' }>
export type PhobosTimestamp = Override<MoonRiseSinkTimestamp, { abbr: 'P' }>
export type MarsMoonAbbr = typeof MOON_ABBR[number]
export type MarsMoonTimestamp = DeimosTimestamp | PhobosTimestamp

export type MoonTimestampTuple = [DeimosTimestamp, PhobosTimestamp]



