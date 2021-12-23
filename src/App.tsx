import React, {FormEvent, useEffect, useState} from 'react'
import * as InputParser from "./input/parse"
import * as Overlap from "./overlap/overlap"
import * as Validator from "./validation/validator"
import {
    DeimosInputTimestamp,
    DeimosTimestamp,
    MarsMoonAbbr,
    MarsMoonInputTimestamp, PhobosInputTimestamp,
    PhobosTimestamp
} from "./types/moon.types"
import {ERROR_MESSAGE} from "./util/error-messages"

function App() {
    const [deimosTimestamp, setDeimosTimestamp] = useState("D[13:91,23:05]")
    const [phobosTimestamp, setPhobosTimestamp] = useState("P[22:05,24:45]")
    const [deimosErrors, setDeimosErrors] = useState<string[]>([])
    const [phobosErrors, setPhobosErrors] = useState<string[]>([])
    const [computationResult, setComputationResult] = useState<number | null>(null)

    const calculateOverlap = () => {
        const parsedDeimos = InputParser.parseInput(deimosTimestamp as DeimosInputTimestamp)
        const parsedPhobos = InputParser.parseInput(phobosTimestamp as PhobosInputTimestamp)

        return Overlap.computeMoonTimestampOverlap(
            parsedDeimos as DeimosTimestamp,
            parsedPhobos as PhobosTimestamp
        )
    }

    useEffect(() => {
        setComputationResult(null)

        if (!phobosErrors.length && !deimosErrors.length) {
            setComputationResult(calculateOverlap())
        }

    }, [deimosErrors, phobosErrors])

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        setComputationResult(calculateOverlap())
    }

    const handleBlur = (value: string, abbr: MarsMoonAbbr) => {
        const isValid = InputParser.isMoonInputValid(value)
        if (!isValid) {
            return [ERROR_MESSAGE.INPUT_INVALID.replace("{0}", abbr)]
        }

        const parsedInput = InputParser.parseInput(value as MarsMoonInputTimestamp)
        const isCorrect = Validator.validateMoonSinkRiseTimestamp(parsedInput)

        if (!isCorrect) {
            const err = ERROR_MESSAGE.TIMESTAMP_INVALID
            return [err]
        }

        return []
    }

    return (
        <div className="main">
            <h1>Moon</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="deimos">
                    Deimos Timestamp:
                    <input
                        type="text"
                        name="deimos"
                        placeholder="D[13:91,23:05]"
                        value={deimosTimestamp}
                        onChange={(event) => setDeimosTimestamp(event.target.value)}
                        onBlur={() => setDeimosErrors(handleBlur(deimosTimestamp, 'D'))}
                    />
                </label>
                <ul>
                    {deimosErrors.map((item, idx) => {
                        return <li key={idx}>{item}</li>
                    })}
                </ul>
                <label htmlFor="phobos">
                    Phobos Timestamp:
                    <input
                        type="text"
                        name="phobos"
                        placeholder="P[22:05,24:45]"
                        value={phobosTimestamp}
                        onChange={(event) => setPhobosTimestamp(event.target.value)}
                        onBlur={() => setPhobosErrors(handleBlur(phobosTimestamp, 'P'))}
                    />
                </label>
                <ul>
                    {phobosErrors.map((item, idx) => {
                        return <li key={idx}>{item}</li>
                    })}
                </ul>
                <input type="submit" value="Calculate" disabled={!!(deimosErrors.length || phobosErrors.length)}/>
            </form>

            <p>Result: {computationResult}</p>
        </div>
    )
}

export default App
