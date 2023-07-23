import { getFlightsByBbox } from "../../../utils/apis/airlabs_api";
const _ = require('lodash')

const airportsData = [require('../../../data/airports.json'), require('../../../data/airports_global_db.json')]
const airlinesData = require('../../../data/airlines.json')


function checkFlightValidity(flight) {
    const isFlightEnroute = flight.status === 'en-route' && flight.speed > 100
    const hasFlightIata = flight.flight_iata !== undefined || null

    // Search the airport codes in the DBs
    const depAirport =
        airportsData[0].find(airport => airport.icao === flight.dep_icao)?.airport ??
        airportsData[1].find(airport => airport.icao === flight.dep_icao)?.airport

    const arrAirport =
        airportsData[0].find(airport => airport.icao === flight.arr_icao)?.airport ??
        airportsData[1].find(airport => airport.icao === flight.arr_icao)?.airport

    const areAirportNamesShort = (depAirport?.length < 37 && arrAirport?.length < 37
    ) ?? undefined

    // Verify if the airports exist in the DB
    const isDepAirportInDB = depAirport !== undefined
    const isArrAirportInDB = arrAirport !== undefined


    // Search the airline in the DB
    const isAirlineInDB = airlinesData.find(airline => airline.ICAO === flight.airline_icao) !== undefined


    if (isFlightEnroute && hasFlightIata && isDepAirportInDB && isArrAirportInDB && isAirlineInDB && hasFlightIata && areAirportNamesShort) return true
    else return false
}

function getAirportAirlineNames(flight) {
    try {
        const depAirport =
            airportsData[0].find(airport => airport.icao === flight.dep_icao) ??
            airportsData[1].find(airport => airport.icao === flight.dep_icao)

        const arrAirport =
            airportsData[0].find(airport => airport.icao === flight.arr_icao) ??
            airportsData[1].find(airport => airport.icao === flight.arr_icao)

        flight.dep_name_db = depAirport.airport
        if (!flight.dep_name_db.toLowerCase().includes('airport')) {
            flight.dep_name_db = depAirport.airport + ' Airport'
        }

        flight.arr_name_db = arrAirport.airport
        if (!flight.arr_name_db.toLowerCase().includes('airport')) {
            flight.arr_name_db = arrAirport.airport + ' Airport'
        }

        flight.airline_db = airlinesData.find(airline => airline.ICAO === flight.airline_icao).Airline
    } catch (error) {
        console.log('flightCards utils getAirportAirlineNames flight:', flight)
    }
    return flight
}


// South-West Lat, South-West Long, North-East Lat, North-East Long
const anzBbox = [-49.22, 98.64, -10, -175.58]

async function getTopFlightsInBbox(bbox = anzBbox) {
    const bboxString = bbox.join('_')

    const allFlightsInBbox = await getFlightsByBbox(bboxString).then(data => data.response)
    const randomSix = _.sampleSize(allFlightsInBbox, 6)
    const topSixFlights = [...new Set(randomSix.filter(checkFlightValidity))]

    while (topSixFlights.length < 6) {
        let randomPicks = _.sampleSize(allFlightsInBbox, 6 - topSixFlights.length)
            .filter(checkFlightValidity)

        randomPicks = [... new Set(randomPicks)]
        topSixFlights.push(...randomPicks)
    }


    topSixFlights.forEach(flight => getAirportAirlineNames(flight))

    return topSixFlights
}



export { getTopFlightsInBbox }