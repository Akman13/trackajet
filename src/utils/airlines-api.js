const airlineData = require('./../data/airlines')


export function flightNumToCallsign(flightNum) {

    // Clean input of non-alphanumeric characters and spaces. Make uppercase.
    const flightNumSanitised = flightNum.replace(/[\W_]+/g," ").replace(/\s+/g, '').toUpperCase();

    // Extract the numerical suffix 
    const flightNumDigits = flightNumSanitised.match(/([^a-zA-Z]*\d)/g)[0]

    // Extract the IATA code prefix
    const flightIataCode = flightNumSanitised.split(flightNumDigits)[0]

    // Convert IATA code to ICAO code
    const flightIcaoCode = airlineData
        .filter(airline => airline['IATA'] === flightIataCode)
        .map(airline => airline['ICAO'])[0]
    ;

    // Reconstruct callsign code 
    const callSign = (flightIcaoCode+flightNumDigits).padEnd(8, ' ')

    if (callSign.includes('undefined')) {
        throw new Error('The flight number you have provided is not valid, please verify you have entered the correct number');
    }

    return callSign
}