import {MoonTimestampDuration} from "../types/moon.types"

/**
 * Computes the intersect of two moon-timestamp durations.
 *
 * @param firstDuration The first duration.
 * @param secondDuration The second duration.
 * @returns Returns a new array with the intersect of the durations.
 */
export function intersect(firstDuration: MoonTimestampDuration, secondDuration: MoonTimestampDuration) {
    return firstDuration
        .filter(item1 => secondDuration
            .some(item2 => item1.hour === item2.hour && item1.minute === item2.minute)
        )
}
