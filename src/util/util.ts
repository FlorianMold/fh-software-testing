import {MoonRiseSinkTimestamp} from "../moon.types";

/**
 * Maps the message to an array, if the expression is true. Otherwise an empty array is returned.
 *
 * @param expression Expression, which determines, if the message is returned
 * @param message Message that should be added to the array, if the expression is true.
 */
export function mapMessageToArrayIfExpressionIsTrue(expression: boolean, message: string): string[] {
    return expression ? [] : [message]
}

export function mapMoonRiseSinkTimestampToMoonTimestamp(moonSinkRiseTimestamp: MoonRiseSinkTimestamp) {
    const {rise, sink} = moonSinkRiseTimestamp
    return [rise, sink].map((value, idx) => {
        return {
            rise: idx === 0 ? 'rise' : 'sink',
            moonName: moonSinkRiseTimestamp.abbr,
            moonTimestamp: value
        }
    })
}
