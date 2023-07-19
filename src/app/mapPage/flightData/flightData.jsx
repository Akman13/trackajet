import { Button, Drawer } from "@mantine/core"
import { useEffect, useState } from "react"

import { useDisclosure } from "@mantine/hooks"

import { LeftHandleBar } from "../../../components/leftHandleBar/leftHandleBar"
import { ProgressBar } from "./progressBar/progressBar"

import './flightData.css'

const airlinesData = require('./../../../data/airlines.json')
const airportsData = [require('./../../../data/airports.json'), require('./../../../data/airports_global_db.json')]



/* 
    TODO:
    Make responsive

    Restructure the HTML for the times & airports to be aligned

    Change the CSS so the RHS is right-justified

    
    Add a refresh button to update the values on the pane ONLY (refresh top right?)
    While being refreshed, display a loading icon/deactivate the pane
    */





function FlightData({ trackedFlight }) {
    const [opened, { open, close }] = useDisclosure(false)
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    const [yScaleFactor, setYScaleFactor] = useState(null)
    const [airline, setAirline] = useState({ found: false, airline: null })
    const [airports, setAirports] = useState({ found: false, departure: null, arrival: null })


    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

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

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        setYScaleFactor(0.5 * window.innerHeight / 785)


        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])

    const innerStyles = {
        'position': 'relative',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'margin': 'auto 0',
        'overflow': 'visible',
        'max-width': '80%',
        'background-color': 'rgb(242, 242, 242)'
    }

    const bodyStyle = {
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': '0.9em',
        'font-family': '"JetBrains Mono", monospace',
    }

    const handleClosedStyle = {
        'width': '24px',
        'height': `${746 * yScaleFactor / 0.79}px`,
        'position': 'absolute',
        'left': '0px',
        'top': '50%',
        'transform': 'translate(-0%, -50%)',
        'display': 'flex',
        'align-items': 'center'
    }

    const handleOpenStyle = {
        'width': '24px',
        'height': '100%',
        'float': 'right',
        'margin-right': '-24px',
        'display': 'flex',
        'align-items': 'center',
        'box-sizing': 'content-box'
    }

    const handleOpenParentStyle = {
        'z-index': '-100',
        'position': 'absolute',
        'top': '0px',
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '100%',
        'height': '100%'
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
        // TEST BELOW
        'flex-direction': 'column'
    }

    const departuresStyle = {
        'width': '50%',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-between'
    }

    const arrivalsStyle = {
        'width': '50%',
        'text-align': 'right',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'space-between'
    }

    const rowStyle = {
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'flex-start'
    }


    return (
        <>
            <Drawer.Root
                position="left"
                opened={opened}
                onClose={close}
                withOverlay={false}
                closeOnClickOutside={false}
                withCloseButton={true}
            >

                <Drawer.Content style={innerStyles}>
                    <Drawer.Body style={bodyStyle}>
                        <section>
                            {<h2>Flight {trackedFlight.flight_iata}</h2>}
                            {(trackedFlight.airline_name !== null || airline.found) && <h3>{trackedFlight.airline_name || airline.airline}</h3>}

                            <div className="flight-details" style={flightDetailsStyle}>
{/*                                                                 <article className="airports" style={airportsStyle}>
                                    <div className="departure" style={departuresStyle}>
                                        <h3>Departure</h3>

                                        {airports.found &&
                                            <p>{trackedFlight.dep_name || airports.departure.airport}</p>
                                        }

                                        <p>{trackedFlight.dep_estimated || trackedFlight.dep_time}</p>
                                    </div>
                                    <div className="arrival" style={arrivalsStyle}>
                                        <h3>Arrival</h3>

                                        {airports.found &&
                                            <p>{trackedFlight.arr_name || airports.arrival.airport}</p>
                                        }

                                        <p>{trackedFlight.arr_estimated || trackedFlight.arr_time}</p>
                                    </div>
                                </article> */}

                                <article className="airports" style={airportsStyle}>

                                    <div className="headers" style={rowStyle}>
                                        <h3>Departure</h3>
                                        <h3>Arrival</h3>
                                    </div>

                                    <div className="airport-names" style={rowStyle}>
                                        {airports.found &&
                                            <p>{trackedFlight.dep_name || airports.departure.airport}</p>
                                        }

                                        {airports.found &&
                                            <p style={{'text-align': 'right'}}>{trackedFlight.arr_name || airports.arrival.airport}</p>
                                        }
                                    </div>
                                    <div className="times" style={rowStyle}>
                                        <p>{trackedFlight.dep_estimated || trackedFlight.dep_time}</p>
                                        <p style={{'text-align': 'right'}}>{trackedFlight.arr_estimated || trackedFlight.arr_time}</p>
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
                    </Drawer.Body>

                    {opened &&
                        <div style={handleOpenParentStyle}>

                            <div style={handleOpenStyle}>
                                <LeftHandleBar yScaleFactor={yScaleFactor} close={close} opened={opened} />
                            </div>
                        </div>}
                    <Drawer.Body style={{ 'padding': '0px' }}>
                    </Drawer.Body>
                </Drawer.Content>

            </Drawer.Root>

            {!opened && <div style={handleClosedStyle}>
                <LeftHandleBar yScaleFactor={yScaleFactor} open={open} />
            </div>}

        </>
    )
}

export { FlightData }