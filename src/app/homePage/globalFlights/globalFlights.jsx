/* BUG FIXES:
1. Flightcard displays despite it not having an airline or a flight number to be shown
2. Various empty fields still occasionally display
*/
import { useEffect, useState } from "react"

import { getTopFlightsInBbox } from "./utils"
import { FlightCards } from "./flightCards/flightCards"
import { FlightCarousel } from "./flightCarousel/flightCarousel"

import './globalFlights.css'

function GlobalFlights({ setTrackedFlight }) {

    const [windowSize, setWindowSize] = useState(getCurrentDimension())
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const [sixGlobalFlights, setSixGlobalFlights] = useState([])
    const [globalFlightsFetched, setGlobalFlightsFetched] = useState(false)

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    async function onLoad() {
        setSixGlobalFlights(await getTopFlightsInBbox())
        setGlobalFlightsFetched(true)
    }

    useEffect(() => {
        onLoad()

        if (typeof window !== "undefined") {
            function handleResize() {
                setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            }

            window.addEventListener("resize", handleResize)
            handleResize()
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        if (windowSize.width < 1000 && !isSmallScreen) setIsSmallScreen(true)
        else if (windowSize.width > 1000 && isSmallScreen) setIsSmallScreen(false)
    }, [windowSize])



    return (
        <>
            {!isSmallScreen &&
                <div className="flight-cards-container">
                    <p className="caption">No flight in mind? Here are some flights from around the world!</p>
                    {!isSmallScreen && <FlightCards setTrackedFlight={setTrackedFlight} sixGlobalFlights={sixGlobalFlights} globalFlightsFetched={globalFlightsFetched} />}
                </div>
            }

            {isSmallScreen &&
                <div className="flights-carousel-container">

                    <p className="caption">No flight in mind? Here are some flights from around the world!</p>

                    <FlightCarousel setTrackedFlight={setTrackedFlight} globalFlightsFetched={globalFlightsFetched} sixGlobalFlights={sixGlobalFlights} />
                </div>
            }

        </>



    )
}

export { GlobalFlights }