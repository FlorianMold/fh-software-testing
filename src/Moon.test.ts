import * as Overlap from "./overlap/overlap"
import {DeimosTimestamp, PhobosTimestamp} from "./types/moon.types"

describe('Tests from the slides', () => {
    it('should calculate the overlap of two moons correctly, when the first timestamp is before the second', () => {
        const testData: { deimos: DeimosTimestamp, phobos: PhobosTimestamp, expected: number }[] = [
            {
                deimos: {abbr: 'D', rise: {hour: 13, minute: 91}, sink: {hour: 23, minute: 5}},
                phobos: {abbr: 'P', rise: {hour: 22, minute: 5}, sink: {hour: 24, minute: 45}},
                expected: 100
            },
            {
                deimos: {abbr: 'D', rise: {hour: 24, minute: 53}, sink: {hour: 7, minute: 12}},
                phobos: {abbr: 'P', rise: {hour: 5, minute: 12}, sink: {hour: 8, minute: 45}},
                expected: 200
            },
            {
                deimos: {abbr: 'D', rise: {hour: 14, minute: 0}, sink: {hour: 22, minute: 40}},
                phobos: {abbr: 'P', rise: {hour: 15, minute: 88}, sink: {hour: 22, minute: 7}},
                expected: 619
            },
            {
                deimos: {abbr: 'D', rise: {hour: 14, minute: 0}, sink: {hour: 22, minute: 40}},
                phobos: {abbr: 'P', rise: {hour: 10, minute: 20}, sink: {hour: 22, minute: 7}},
                expected: 807
            },
            {
                deimos: {abbr: 'D', rise: {hour: 18, minute: 55}, sink: {hour: 4, minute: 97}},
                phobos: {abbr: 'P', rise: {hour: 10, minute: 39}, sink: {hour: 4, minute: 0}},
                expected: 1045
            },
            {
                deimos: {abbr: 'D', rise: {hour: 12, minute: 32}, sink: {hour: 17, minute: 6}},
                phobos: {abbr: 'P', rise: {hour: 17, minute: 6}, sink: {hour: 19, minute: 78}},
                expected: 1
            },
            {
                deimos: {abbr: 'D', rise: {hour: 22, minute: 11}, sink: {hour: 0, minute: 36}},
                phobos: {abbr: 'P', rise: {hour: 7, minute: 0}, sink: {hour: 22, minute: 11}},
                expected: 1
            },
            {
                deimos: {abbr: 'D', rise: {hour: 18, minute: 55}, sink: {hour: 3, minute: 97}},
                phobos: {abbr: 'P', rise: {hour: 10, minute: 39}, sink: {hour: 18, minute: 55}},
                expected: 1
            },
        ]
        testData.forEach(value => {
            expect(Overlap.computeMoonTimestampOverlap(value.deimos, value.phobos)).toEqual(value.expected)

        })
    })
})
