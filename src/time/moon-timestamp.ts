import {MarsHour, MarsMinute, MoonTimestamp, MoonTimestampDuration} from "../types/moon.types"
import * as MOON_CONSTANT from "../constant/moon.constants"

/**
 * Adds minutes to a timestamp. Checks how many hours the minutes to add span and adds the
 * hours and the remaining minutes.
 *
 * @param timestamp Timestamp where the minutes should be added.
 * @param minutes Minutes that should be added to the timestamp.
 * @returns A new timestamp with the minutes added to the timestamp.
 */
export function addMinutesToTimestamp(timestamp: MoonTimestamp, minutes: MarsMinute = 1): MoonTimestamp {
    const newMinutes = minutes + timestamp.minute
    const hourCarryOver = Math.trunc(newMinutes / MOON_CONSTANT.MAX_MARS_MINUTE)
    const minutesCarryOver = newMinutes % MOON_CONSTANT.MAX_MARS_MINUTE

    const mutableTimestamp = addHoursToTimestamp(timestamp, hourCarryOver)
    mutableTimestamp.minute = minutesCarryOver

    return mutableTimestamp
}

/**
 * Add the amount of hours to the given timestamp. If the result is bigger than 24, the hours begin from 00 again.
 *
 * @param timestamp Timestamp where the hours should be added.
 * @param hours Amount of hours that should be added.
 * @returns A new timestamp, with the added hours.
 */
export function addHoursToTimestamp(timestamp: MoonTimestamp, hours: MarsHour = 1): MoonTimestamp {
    const mutableTimestamp = {...timestamp}

    mutableTimestamp.hour = (mutableTimestamp.hour + hours) % MOON_CONSTANT.MAX_MARS_HOUR
    return mutableTimestamp
}

/**
 * Checks whether the two moon-timestamps are equal.
 *
 * @param firstTimestamp First timestamp.
 * @param secondTimestamp Second timestamp.
 * @returns True, if the first timestamp is equal to the second timestamp.
 */
export function isEqual(firstTimestamp: MoonTimestamp, secondTimestamp: MoonTimestamp): boolean {
    return firstTimestamp.hour === secondTimestamp.hour && firstTimestamp.minute === secondTimestamp.minute
}

/**
 * Computes the difference in minutes between two timestamps. The difference is calculated from the first
 * timestamp to the second timestamp.
 *
 * @param firstTimestamp First timestamp to compare.
 * @param secondTimestamp Second timestamp to compare.
 */
export function computeMinuteDifferenceOfTimestamps(firstTimestamp: MoonTimestamp, secondTimestamp: MoonTimestamp): MarsMinute {
    let diff = 0

    while (!isEqual(firstTimestamp, secondTimestamp)) {
        firstTimestamp = addMinutesToTimestamp(firstTimestamp)
        diff++
    }

    return diff
}

/**
 * Computes the duration of two timestamps. Starts from the first timestamp and counts the hours to the second timestamp.
 *
 * @param firstTimestamp First timestamp
 * @param secondTimestamp Second timestamp
 * @returns The hours from the first to the second timestamp as an array
 */
export function computeTimestampHourDuration(firstTimestamp: MoonTimestamp, secondTimestamp: MoonTimestamp): MoonTimestampDuration {
    let mutableTimestamp = {...firstTimestamp}
    let spannedHours = [mutableTimestamp]

    while (!(mutableTimestamp.hour === secondTimestamp.hour && mutableTimestamp.minute === secondTimestamp.minute)) {
        mutableTimestamp = addMinutesToTimestamp(mutableTimestamp)
        spannedHours.push(mutableTimestamp)
    }

    return spannedHours
}
