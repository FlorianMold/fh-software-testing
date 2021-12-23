import * as InputParser from "./input/parse"
import * as Validator from "./validation/validator"
import * as Overlap from "./overlap/overlap"
import {DeimosTimestamp, MarsMoonInputTimestamp, MoonRiseSinkTimestamp, PhobosTimestamp} from "./types/moon.types"

describe('Moon', () => {

    describe('InputParser', () => {
        it('should validate the deimos timestamp as correct', () => {
            const timestamp = 'D[13:91,23:05]'
            expect(InputParser.isMoonInputValid(timestamp)).toBe(true)
        })

        it('should validate the phobos timestamp as correct', () => {
            const timestamp = 'P[22:05,24:45]'
            expect(InputParser.isMoonInputValid(timestamp)).toBe(true)
        })

        it('should validate the timestamp as incorrect (incorrect input: ] is missing, X is not a moon', () => {
            const timestamps = ['D[13:91,23:05', 'X[22:05,24:45]']
            timestamps.forEach(value =>
                expect(InputParser.isMoonInputValid(value)).toBe(false)
            )
        })

        it('should parse the timestamp to a valid Deimos MarsMoonTimestamp', () => {
            const validTimestamp = 'D[13:91,23:05]'
            expect(InputParser.parseInput(validTimestamp as MarsMoonInputTimestamp)).toEqual({
                abbr: 'D',
                rise: {hour: 13, minute: 91},
                sink: {hour: 23, minute: 5}
            })
        })

        it('should parse the invalid timestamp to an invalid MarsMoonTimestamp (sink time of the moon is missing)', () => {
            const validTimestamp = 'D[13:91]'
            expect(InputParser.parseInput(validTimestamp as MarsMoonInputTimestamp)).toEqual({
                abbr: 'D',
                rise: {hour: 13, minute: 91},
                sink: {hour: undefined, minute: undefined}
            })
        })
    })

    describe('Validator', () => {
        it('should validate the MarsMoonTimestamp as correct', () => {
            const validMoonTimestamp: MoonRiseSinkTimestamp = {
                abbr: 'D',
                rise: {hour: 13, minute: 91},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(validMoonTimestamp)).toBe(true)
        })

        it('should validate the MarsMoonTimestamp as incorrect (Hours > 24)', () => {
            const invalidMoonTimestamp: MoonRiseSinkTimestamp = {
                abbr: 'D',
                rise: {hour: 25, minute: 91},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(invalidMoonTimestamp)).toBe(false)
        })

        it('should validate the MarsMoonTimestamp as incorrect (Hours < 0)', () => {
            const invalidMoonTimestamp: MoonRiseSinkTimestamp = {
                abbr: 'D',
                rise: {hour: -1, minute: 91},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(invalidMoonTimestamp)).toBe(false)
        })

        it('should validate the MarsMoonTimestamp as incorrect (Minutes > 101)', () => {
            const invalidMoonTimestamp: MoonRiseSinkTimestamp = {
                abbr: 'D',
                rise: {hour: 25, minute: 101},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(invalidMoonTimestamp)).toBe(false)
        })

        it('should validate the MarsMoonTimestamp as incorrect (Minutes < 0)', () => {
            const invalidMoonTimestamp: MoonRiseSinkTimestamp = {
                abbr: 'D',
                rise: {hour: 13, minute: -5},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(invalidMoonTimestamp)).toBe(false)
        })

        it('should validate the MarsMoonTimestamp as incorrect (Invalid abbr)', () => {
            const invalidMoonTimestamp = {
                abbr: 'X',
                rise: {hour: 13, minute: 91},
                sink: {hour: 23, minute: 5}
            }
            expect(Validator.validateMoonSinkRiseTimestamp(invalidMoonTimestamp as MoonRiseSinkTimestamp)).toBe(false)
        })
    })

    describe('Overlap', () => {
        it('should calculate the overlap of two moons correctly, when the first timestamp is before the second', () => {
            const deimosTimestamp: DeimosTimestamp = {
                abbr: 'D',
                rise: {hour: 13, minute: 91},
                sink: {hour: 23, minute: 5}
            }
            const phobosTimestamp: PhobosTimestamp = {
                abbr: 'P',
                rise: {hour: 22, minute: 5},
                sink: {hour: 24, minute: 45}
            }
            expect(Overlap.computeMoonTimestampOverlap(deimosTimestamp, phobosTimestamp)).toEqual(100)
        })

        it('should calculate the overlap of two moons correctly, when the second timestamp is before the first', () => {
            const deimosTimestamp: DeimosTimestamp = {
                abbr: 'D',
                rise: {hour: 14, minute: 0},
                sink: {hour: 22, minute: 40}
            }
            const phobosTimestamp: PhobosTimestamp = {
                abbr: 'P',
                rise: {hour: 10, minute: 20},
                sink: {hour: 22, minute: 7}
            }
            expect(Overlap.computeMoonTimestampOverlap(deimosTimestamp, phobosTimestamp)).toEqual(807)
        })

        it('should return one 1, if the moon only one timestamp in common (twilight rule)', () => {
            const deimosTimestamp: DeimosTimestamp = {
                abbr: 'D',
                rise: {hour: 18, minute: 55},
                sink: {hour: 3, minute: 97}
            }
            const phobosTimestamp: PhobosTimestamp = {
                abbr: 'P',
                rise: {hour: 10, minute: 39},
                sink: {hour: 18, minute: 55}
            }
            expect(Overlap.computeMoonTimestampOverlap(deimosTimestamp, phobosTimestamp)).toEqual(1)
        })

        it('should return zero if the moons have no overlap', () => {
            const deimosTimestamp: DeimosTimestamp = {
                abbr: 'D',
                rise: {hour: 10, minute: 15},
                sink: {hour: 11, minute: 0}
            }
            const phobosTimestamp: PhobosTimestamp = {
                abbr: 'P',
                rise: {hour: 13, minute: 30},
                sink: {hour: 15, minute: 15}
            }
            expect(Overlap.computeMoonTimestampOverlap(deimosTimestamp, phobosTimestamp)).toEqual(0)
        })

    })

})
