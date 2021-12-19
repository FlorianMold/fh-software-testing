import {MarsHour, MarsMinute, MoonRiseSinkTimestamp, MoonTimestamp, MoonTimestampTuple} from "../moon.types"
import * as MOON_CONSTANT from "../constant/moon.constants"

/**
 * Validates the moon-timestamp-tuple. The tuple is considered valid, when all time moon-rise-sink-timestamps
 * are correct.
 *
 * @param moonTimestampTuple Tuple that should be validated.
  @returns Returns true, if rise and sink are valid.
 */
export function validate(moonTimestampTuple: MoonTimestampTuple): boolean {
    const [deimosTimestamp, phobosTimestamp] = moonTimestampTuple
    return validateMoonSinkRiseTimestamp(deimosTimestamp) &&
        validateMoonSinkRiseTimestamp(phobosTimestamp)
}

/**
 * Checks if the moon-sink-rise-timestamp is valid. The timestamp is considered valid, when
 * rise and sink contain only valid timestamps.
 *
 * @param moonSinkRiseTimestamp MoonSinkRiseTimestamp that should be validated.
 * @returns Returns true, if rise and sink are valid.
 */
function validateMoonSinkRiseTimestamp(moonSinkRiseTimestamp: MoonRiseSinkTimestamp): boolean {
    const {rise, sink} = moonSinkRiseTimestamp
    return validateMoonTimestamp(rise) &&
        validateMoonTimestamp(sink)
}

/**
 * Checks if the moon-timestamp is valid. The timestamp is considered valid, when the
 * hours and minutes are both valid.
 *
 * @param moonTimestamp Moon-timestamp that should be validated.
 * @returns Returns true, if the moon-timestamp only contains valid hours and minutes.
 */
function validateMoonTimestamp(moonTimestamp: MoonTimestamp): boolean {
    const {hour, minute} = moonTimestamp
    return validateMarsHour(hour) &&
        validateMarsMinute(minute)
}

/**
 * Checks if a mars-hour is valid. The minute should be in the boundary of MIN_MARS_HOUR >= x < MAX_MARS_HOUR
 *
 * @param marsHour Mars-hour that should be validated.
 * @returns Returns true, if the mars-hour is in the boundary
 */
function validateMarsHour(marsHour: MarsHour): boolean {
    return marsHour >= MOON_CONSTANT.MIN_MARS_HOUR && marsHour < MOON_CONSTANT.MAX_MARS_HOUR
}

/**
 * Checks if a mars-minute is valid. The minute should be in the boundary of MIN_MARS_MINUTE >= x < MAX_MARS_MINUTE
 *
 * @param marsMinute Mars-minute that should be validated.
 * @returns Returns true, if the mars-minute is in the boundary
 */
function validateMarsMinute(marsMinute: MarsMinute): boolean {
    return marsMinute >= MOON_CONSTANT.MIN_MARS_MINUTE && marsMinute < MOON_CONSTANT.MAX_MARS_MINUTE
}

