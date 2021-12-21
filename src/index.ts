import * as InputParser from "./input/parse"
import * as MoonTimestampValidator from "./validation/validator"
import {Command} from 'commander'
import * as MoonTimestamp from "./timestamp/moon-timestamp"

const program = new Command()
program
    .version('0.1.0')
    .requiredOption('-d, --deimos <timestamp>', 'Timestamp of deimos: e.g.: P[22:05,24:45]')
    .requiredOption('-p, --phobos <timestamp>', 'Timestamp of phobos: e.g.: D[13:91,23:05]')
    .parse(process.argv)

const options = program.opts()
const {phobos, deimos} = options

const parsedInput = `${deimos};${phobos}`
const timestampTuple = InputParser.parseInput(parsedInput)
const errorMessages = MoonTimestampValidator.validateAndReturnErrorMessages(timestampTuple)

if (errorMessages.length) {
    console.log(errorMessages)
    process.exit(1)
}

const minuteDifference = MoonTimestamp.computeMoonTimestampTupleOverlap(timestampTuple)
console.log(`Difference between ${phobos} and ${deimos} is ${minuteDifference} minutes`)
