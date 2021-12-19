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
export type MarsMoonAbbr = 'P' | 'D'
export type MoonRiseSinkTimestamp = { rise: MoonTimestamp, sink: MoonTimestamp, readonly abbr: MarsMoonAbbr }
export type DeimosTimestamp = MoonRiseSinkTimestamp
export type PhobosTimestamp = MoonRiseSinkTimestamp
export type MarsMoonTimestamp = DeimosTimestamp | PhobosTimestamp

export type MoonTimestampTuple = [DeimosTimestamp, PhobosTimestamp]



