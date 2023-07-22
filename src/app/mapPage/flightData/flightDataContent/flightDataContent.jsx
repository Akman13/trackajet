/* 
BUG FIXES:
1. "Estimated arrival in..." not displaying a number despite there being arrival and departure times */

import { useEffect, useState } from "react"
import { SlRefresh } from "react-icons/sl"
import { Button, Loader, LoadingOverlay } from "@mantine/core"

import { ProgressBar } from "./../progressBar/progressBar"

import { getFullFlightData } from './../../../sharedComponents/searchBar/utils'
import { useDisclosure } from "@mantine/hooks"

const airlinesData = require('./../../../../data/airlines.json')
const airportsData = [require('./../../../../data/airports.json'), require('./../../../../data/airports_global_db.json')]


function FlightDataContent({ trackedFlight, setTrackedFlight }) {
    const [airline, setAirline] = useState({ found: false, airline: null })
    const [airports, setAirports] = useState({ found: false, departure: null, arrival: null })
    const [visible, { open, close }] = useDisclosure(false);

    useEffect(() => {
        // Airlines: Searching database & setting
        const airlineFromDatabase = airlinesData.find(airline => airline.ICAO === trackedFlight.airline_icao)

        if (airlineFromDatabase) {
            setAirline({ found: true, airline: airlineFromDatabase.Airline })
        }

        // Airports: Searching database & setting
        const airportsFromDatabase = {
            dep: airportsData[0].find(airport => airport.icao === trackedFlight.dep_icao) || airportsData[1].find(airport => airport.icao === trackedFlight.dep_icao),
            arr: airportsData[0].find(airport => airport.icao === trackedFlight.arr_icao) || airportsData[1].find(airport => airport.icao === trackedFlight.arr_icao)
        }

        if (airportsFromDatabase.dep && airportsFromDatabase.arr) {
            setAirports({ found: true, departure: airportsFromDatabase.dep, arrival: airportsFromDatabase.arr })
        }
    }, [])

    const handleRefresh = async () => {

        try {
            open()
            const flightData = await getFullFlightData(trackedFlight.flight_iata)
            // console.log('searchBar flightData', flightData)
            
            setTrackedFlight(flightData)
            close()

        } catch (error) {
            console.log('refresh error', error)
        }

    }



    const progressBarContainerStyle = {
        'margin': '1.2em 0'
    }

    const flightDetailsStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-around',
        'line-height': '1.5em'
    }

    const airportsStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'flex-direction': 'column'
    }

    const rowStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'flex-start'
    }

    const headerStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center'
    }

    const buttonStyle = {
        'padding': '0px',
        'height': 'min-content',
    }

    const rightAlignedStyle = {
        'text-align': 'right'
    }

    const evenWidthStyle = {
        'width': '50%'
    }

    return (
        <section>
            <LoadingOverlay visible={visible} size={"md"} />
            {<h2>Flight {trackedFlight.flight_iata}</h2>}
            <header style={headerStyle}>
                {(trackedFlight.airline_name !== null || airline.found) && <h3>{trackedFlight.airline_name || airline.airline}</h3>}

                <Button onClick={handleRefresh} style={buttonStyle} variant="gray" loaderPosition="center">
                    <SlRefresh size={"1.6em"} color="black" />
                </Button>

            </header>

            <div className="flight-details" style={flightDetailsStyle}>
                <article className="airports" style={airportsStyle}>

                    <div className="headers" style={rowStyle}>
                        <h3>Departure</h3>
                        <h3>Arrival</h3>
                    </div>

                    <div style={rowStyle}>
                        {airports.found &&
                            <p style={evenWidthStyle}>{trackedFlight.dep_name || airports.departure.airport}</p>
                        }

                        {airports.found &&
                            <p style={{ ...rightAlignedStyle, ...evenWidthStyle }}>{trackedFlight.arr_name || airports.arrival.airport}</p>
                        }
                    </div>
                    <div className="times" style={rowStyle}>
                        <p>{trackedFlight.dep_estimated || trackedFlight.dep_time}</p>
                        <p style={{ ...rightAlignedStyle }}>{trackedFlight.arr_estimated || trackedFlight.arr_time}</p>
                    </div>
                </article>

                <div className="progress-bar" style={progressBarContainerStyle}>
                    <ProgressBar value={trackedFlight.percent || trackedFlight.percentCalculated} />
                </div>

                <div className="misc-info">
                    <p>{trackedFlight.delayed || '0'}min delay in arrival</p>

                    {(trackedFlight.arr_estimated_ts || trackedFlight.arr_time_ts) && <p>Estimated arrival in {trackedFlight.timeRemainingString}</p>}

                    <p>Last signal: {Math.floor(((Date.now() / 1000) - trackedFlight.updated) / 60) || '0'}min ago</p>
                </div>
            </div>
        </section>
    )

}

export { FlightDataContent }