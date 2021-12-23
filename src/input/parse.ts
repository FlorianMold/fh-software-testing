import {
    DeimosInputTimestamp,
    MoonInputLine,
    MarsMoonInputTimestamp,
    MarsMoonAbbr,
    MarsMoonTimestamp,
    MoonInputTimestampTuple,
    MoonTimestampTuple,
    PhobosInputTimestamp, DeimosTimestamp, PhobosTimestamp
} from "../types/moon.types"

// Incorporate the max hour in the regex

// Matches D[13:91, 23:05];P[22:05, 24:45]
const LINE_PATTERN: RegExp = /^(D\[(\d{1,2}:\d{1,2},?\s?){1,2}]);(P\[(\d{1,2}:\d{1,2},?\s?){2}])$/

//Matches Deimos or Phobos inputs
const INPUT_PATTERN: RegExp = /^[DP]\[(\d{1,2}:\d{1,2},?\s?){1,2}]$/

// Match numbers with two digits
const MOON_TIME_PATTERN: RegExp = /\d{1,2}/g

/**
 * Checks whether the input is either a deimos or phobos timestamp.
 *
 * @param input Input that should be parsed.
 * @returns Whether the input is a valid timestamp.
 */
export function isMoonInputValid(input: string): input is MarsMoonInputTimestamp {
    return INPUT_PATTERN.test(input)
}

/**
 * Parses the input of an input field to a moon-timestamp.
 *
 * @param input Input that should be parsed
 * @returns The parsed input as a timestamp.
 */
export function parseInput(input: MarsMoonInputTimestamp): MarsMoonTimestamp {
    return parseMoonTimestamp(input as MarsMoonInputTimestamp, input.charAt(0) as MarsMoonAbbr)
}

/**
 * Converts each line file of the input to a moon-timestamp. Lines that do not
 * match the LINE_PATTERN are removed.
 *
 * @param lines Lines to parse in timestamps.
 * @returns Returns a tuple with the parsed moon-timestamps or an empty tuple, if the input was not valid.
 */
function parseLines(lines: string[]): MoonTimestampTuple[] {
    return lines
        .filter(line => line.match(LINE_PATTERN))
        .map(value => value as MoonInputLine) // Can be safely assumed
        .map(parseLine)
        .map(parseMoonsInputTimestamp)
}

/**
 * Converts the input-line to an input-timestamp. Removes all whitespaces from the input.
 *
 * @param line Line that should be parsed.
 * @returns Returns a tuple with the timestamps of the moons.
 */
function parseLine(line: MoonInputLine): MoonInputTimestampTuple {
    const matchedLine = line.replace(/\s+/g, '').split(LINE_PATTERN)
    const deimos = matchedLine[1] as DeimosInputTimestamp
    const phobos = matchedLine[3] as PhobosInputTimestamp
    return [deimos, phobos]
}

/**
 * Converts the moon-input-tuple to a moon-timestamp-tuple
 *
 * @param moonInputTuple Input-tuple that should be parsed to moon-timestamp tuple.
 * @returns Returns a tuple with the parsed timestamps of the moons.
 */
function parseMoonsInputTimestamp(moonInputTuple: MoonInputTimestampTuple): MoonTimestampTuple {
    const [deimos, phobos] = moonInputTuple
    return [
        parseMoonTimestamp(deimos, 'D') as DeimosTimestamp,
        parseMoonTimestamp(phobos, 'P') as PhobosTimestamp
    ]
}

/**
 * Converts the moon-input-timestamp to an object of mars-moon-timestamps.
 *
 * @param timestamp Timestamp that should be converted.
 * @param abbr Abbreviation of the moon.
 */
function parseMoonTimestamp(timestamp: MarsMoonInputTimestamp, abbr: MarsMoonAbbr): MarsMoonTimestamp {
    const res = timestamp.match(MOON_TIME_PATTERN)!.map(Number)
    const [riseHour, riseMinute, sinkHour, sinkMinute] = res
    return {
        rise: {hour: riseHour, minute: riseMinute},
        sink: {hour: sinkHour, minute: sinkMinute},
        abbr
    }
}

/**
 * Parses the input of the program to a tuple of valid mars-moon timestamps.
 *
 * @param input input that should be converted
 */
export function parseInputLine(input: string): MoonTimestampTuple {
    const res = parseLines([input])
    if (!res.length) {
        throw Error(`Input couldn't be parsed. Please enter a correct input! (${input})`)
    }
    return res[0]
}


