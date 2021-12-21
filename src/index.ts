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

const timestampTuple = InputParser.parseInput(timestamp)
const errorMessages = MoonTimestampValidator.validateAndReturnErrorMessages(timestampTuple)

if (errorMessages.length) {
    console.log(errorMessages)
    process.exit(1)
}

const [deimos, phobos] = timestampTuple;
const minuteDifference = Overlap.computeMoonTimestampOverlap(deimos, phobos)
console.log(`${timestamp}: Difference between ${MOON_NAME[deimos.abbr]} and ${MOON_NAME[phobos.abbr]} is ${minuteDifference} minutes`)
