import * as InputParser from "./input/parse"
import * as MoonTimestampValidator from "./validation/validator"
import { Command } from 'commander'
// import * as MoonProcessor from "./processor/moon-timestamp";

const program = new Command();
program
    .version('0.1.0')
    .requiredOption('-d, --deimos <timestamp>', 'Timestamp of deimos: e.g.: P[22:05,24:45]')
    .requiredOption('-p, --phobos <timestamp>', 'Timestamp of phobos: e.g.: D[13:91,23:05]')
    .parse(process.argv)

const options = program.opts();
const {phobos, deimos} = options;

const parsedInput = `${deimos};${phobos}`
const timestampTuple = InputParser.parseInput(parsedInput);
const isValid = MoonTimestampValidator.validate(timestampTuple);

if (!isValid) {
    console.log('invalid')
}

// MoonProcessor.moonProcessor(timestampTuple);
console.log(timestampTuple);
