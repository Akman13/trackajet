const airlineData = require('./../data/airlines')
const airportData = require('./../data/airports')

function callsignToFlightnum(callsign) {
    // Receive a callsign eg LPE2451

    // Extract the 3 letters at the start (ICAO code)
    const flightIcaoCode = callsign.slice(0, 3);

    // Extract the 3 numbers at the end 
    const flightNumDigits = callsign.slice(3);

    // Turn ICAO -> IATA
    const flightIataCode = airlineData
        .filter(airline => airline['ICAO'] === flightIcaoCode)
        .map(airline => airline['IATA'])[0]
        ;

    // Combine both to return flightnum
    const flightNum = flightIataCode + flightNumDigits;

    return flightNum;
}

const filterByRule = (flight, filter) => {
    const regex = new RegExp(/^[a-zA-Z]{3}\d{3}$/)
    return ((flight[2] === filter) && (regex.test(flight[1].slice(0, 6))))
}

const getAirportNameForIcaoCode = (icaoToFind) => {
    const foundAirport = airportData.find(({ icao }) => icao === icaoToFind);

    if (!foundAirport) {
        return '';
    }

    return foundAirport.airport; // name
}

const mapApiDataToTopFlight = (apiFlightData) => {
    return {
        departureAirport: getAirportNameForIcaoCode(apiFlightData.estDepartureAirport),
        arrivalAirport: getAirportNameForIcaoCode(apiFlightData.estArrivalAirport),
    }
}

export { callsignToFlightnum, filterByRule, mapApiDataToTopFlight }