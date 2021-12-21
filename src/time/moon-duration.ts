import {MoonTimestampDuration} from "../moon.types";

/**
 * Computes the union of two moon-timestamp durations.
 *
 * @param firstDuration The first duration
 * @param secondDuration The second duration
 * @returns Returns a new array with the union of the durations.
 */
export function union(firstDuration: MoonTimestampDuration, secondDuration: MoonTimestampDuration) {
    let result = [];

    for (let i = 0; i < firstDuration.length; i++) {
        let item1 = firstDuration[i],
            found = false;
        for (let j = 0; j < secondDuration.length && !found; j++) {
            found = item1.hour === secondDuration[j].hour && item1.minute === secondDuration[j].minute;
        }
        if (found) {
            result.push(item1);
        }
    }
    return result;
}
