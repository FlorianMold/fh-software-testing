import {
    DeimosInputTimestamp,
    MoonInputLine,
    MarsMoonInputTimestamp,
    MarsMoonAbbr,
    MarsMoonTimestamp,
    MoonInputTimestampTuple,
    MoonTimestampTuple,
    PhobosInputTimestamp
} from "../moon.types"

// Incorporate the max hour in the regex

// Matches D[13:91, 23:05];P[22:05, 24:45]
const INPUT_PATTERN: RegExp = /^(D\[(\d{1,2}:\d{1,2},?\s?){1,2}]);(P\[(\d{1,2}:\d{1,2},?\s?){2}])$/

// Match numbers with two digits
const MOON_TIME_PATTERN: RegExp = /\d{1,2}/g

/**
 * Converts each line file of the input to a moon-timestamp. Lines that do not
 * match the INPUT_PATTERN are removed.
 *
 * @param lines Lines to parse in timestamps.
 * @returns Returns a tuple with the parsed moon-timestamps or an empty tuple, if the input was not valid.
 */
function parseLines(lines: string[]): MoonTimestampTuple[] {
    return lines
        .filter(line => line.match(INPUT_PATTERN))
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
    const matchedLine = line.replace(/\s+/g, '').split(INPUT_PATTERN)
    // todo: maybe in one line
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
    // TODO: optimize how to get D and P
    return [
        parseMoonTimestamp(deimos, 'D'),
        parseMoonTimestamp(phobos, 'P')
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
export function parseInput(input: string): MoonTimestampTuple {
    const res = parseLines([input])
    if (!res.length) {
        throw Error(`Input couldn't be parsed. Please enter a correct input! (${input})`)
    }
    return res[0]
}


