import * as InputParser from "./input/parse"
import * as MoonTimestampValidator from "./validation/validator"
import {Command} from 'commander'
import * as Overlap from "./overlap/overlap"
import {MOON_NAME} from "./constant/moon.constants"

const program = new Command()
program
    .version('0.1.0')
    .option('-t, --timestamp <timestamp>', 'Timestamp of deimos: e.g.: D[13:91,23:05];P[22:05,24:45]')
    .parse(process.argv)

const options = program.opts()
const {timestamp} = options

const timestampTuple = InputParser.parseInputLine(timestamp)
const [deimos, phobos] = timestampTuple
const deimosValid = MoonTimestampValidator.validateMoonSinkRiseTimestamp(deimos)
const phobosValid = MoonTimestampValidator.validateMoonSinkRiseTimestamp(phobos)

if (!(phobosValid && deimosValid)) {
    console.log(phobos)
    process.exit(1)
}

const minuteDifference = Overlap.computeMoonTimestampOverlap(deimos, phobos)
console.log(`${timestamp}: Difference between ${MOON_NAME[deimos.abbr]} and ${MOON_NAME[phobos.abbr]} is ${minuteDifference} minutes`)
