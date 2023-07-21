/* BUG FIXES:
0. Non-passenger flights appear and cannot be tracked if clicked as they don't have a flightIata. --> Check for flightIata

1. Flightcard displays despite it not having an airline or a flight number to be shown
2. Various empty fields still occasionally display
*/

/* TODO:
2. Rework the responsiveness for smaller screens

*/

import { useEffect, useState } from "react"
import { getTopFlightsInBbox } from "./utils"
import { getFullFlightData } from "../../sharedComponents/searchBar/utils"
import { FlightCardsContent } from "./flightCardsContent/flightCardsContent"
import { FetchingFlightCards } from "./fetchingFlightCards/fetchingFlightCards"


import './flightCards.css'

function FlightCards({ setTrackedFlight }) {

    const [sixLocalFlights, setSixLocalFlights] = useState([])
    const [localFlightsFetched, setLocalFlightsFetched] = useState(false)

    const onLoad = async () => {
        console.log('flightCards component rendered')
        setSixLocalFlights(await getTopFlightsInBbox())
        setLocalFlightsFetched(true)
    }

    useEffect(() => {
        onLoad()
    }, [])

    return (
        <div className="flight-cards-container">
            <p className="caption">No flight in mind? Here are some flights from around the world!</p>

        <section className="flight-cards">
            <section className="cards-list">
                {!localFlightsFetched && <FetchingFlightCards />}

                {localFlightsFetched && <FlightCardsContent setTrackedFlight={setTrackedFlight} sixLocalFlights={sixLocalFlights} />}

            </section>
        </section>
        </div>

    )
}

export { FlightCards }