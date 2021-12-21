import {MoonTimestampDuration} from "../moon.types";

/**
 * Computes the union of two moon-timestamp durations.
 *
 * @param firstDuration The first duration
 * @param secondDuration The second duration
 * @returns Returns a new array with the union of the durations.
 */
export function union(firstDuration: MoonTimestampDuration, secondDuration: MoonTimestampDuration) {
    return firstDuration
        .filter(item1 => secondDuration
            .some(item2 => item1.hour === item2.hour && item1.minute === item2.minute)
        )
}
