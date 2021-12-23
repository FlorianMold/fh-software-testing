import {DeimosTimestamp, MarsMinute, PhobosTimestamp} from "../types/moon.types"
import * as MoonTimestampAdapter from "../time/moon-timestamp"
import * as MoonDurationAdapter from "../time/moon-duration"

/**
 * Computes the overlap in minutes between two sink-rise timestamps. If the timestamps are not valid, the result
 * is not valid.
 *
 * @param firstTimestamp First timestamp to compare
 * @param secondTimestamp Second timestamp to compare
 * @returns The overlap in minutes.
 */
export function computeMoonTimestampOverlap(firstTimestamp: DeimosTimestamp, secondTimestamp: PhobosTimestamp): MarsMinute {
    const mutableFirstRiseSinkTimestamp = {...firstTimestamp}
    const mutableSecondRiseSinkTimestamp = {...secondTimestamp}

    const [firstDuration, secondDuration] = [mutableFirstRiseSinkTimestamp, mutableSecondRiseSinkTimestamp]
        .map(timestamp => MoonTimestampAdapter.computeTimestampHourDuration(timestamp.rise, timestamp.sink))

    const durationUnion = MoonDurationAdapter.intersect(firstDuration, secondDuration)
    // get first and last element of duration
    const {0: durationStart, [durationUnion.length - 1]: durationEnd} = durationUnion

    // no overlap
    if (durationUnion.length === 0) {
        return 0
    }

    // if the durationUnion has only one item, means that both durations have only one overlap => 1 Minute => Twilight rule
    return durationUnion.length === 1 ? 1 :
        MoonTimestampAdapter.computeMinuteDifferenceOfTimestamps(
            durationStart,
            durationEnd
        )

}

