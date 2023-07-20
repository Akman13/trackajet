/* TODO:
1. OnClick of any of them, run them through the same functions as a searchBar input
1. Make all the cards the same height

2. Rework the responsiveness for smaller screens

2. Add an Overlay feature that is on while the fetches are being made. Says something like "Fetching local flights..."

3. Once the fetches are finished, then we begin rendering them (state change, overlay disabled)
*/

import { useEffect, useState } from "react"
import { getTopFlightsInBbox } from "./utils"
import { getFullFlightData } from "../../sharedComponents/searchBar/utils"


import './flightCards.css'

function FlightCards( {setTrackedFlight} ) {

    const [sixLocalFlights, setSixLocalFlights] = useState([])
    const [localFlightsFetched, setLocalFlightsFetched] = useState(false)

    const onLoad = async () => {
        console.log('flightCards component rendered')
        setSixLocalFlights(await getTopFlightsInBbox())
        setLocalFlightsFetched(true)
        console.log('flightCards onLoad finished')

    }

    useEffect(() => {
        onLoad()
    }, [])

    const handleClick = async (e) => {
        const flightIata = e.target.closest('.flight-card').dataset.flight_num

        console.log('e.target\'s flightIata', flightIata)

        try {
			const flightData = await getFullFlightData(flightIata)
			// console.log('searchBar flightData', flightData)

			setTrackedFlight(flightData)

		} catch (error) {
			console.log('flightCards error after clicking', error)
		}

        // TODO: Upon click, need to subject this flight to the same functions that are run on the searchBar utils file
    }


    return (
        <section className="flight-cards">
            <p className="caption">No flight in mind? Here are some local flights in your area!</p>

            <section className="cards-list">

                {localFlightsFetched &&
                    sixLocalFlights.map(flight => (
                        <article onClick={handleClick} className='flight-card' data-flight_num={flight['flight_iata']}>
                            <p className="flight">✈️ {flight['flight_iata']}    {flight['airline_db']} </p>

                            <div className="airport-names">
                                <div className="departure">
                                    <p>Dep:</p>
                                    <span>{flight['dep_name_db']}</span>
                                </div>

                                <div className="arrival">
                                    <p>Arr: </p>
                                    <span>{flight['arr_name_db']}</span>
                                </div>
                            </div>
                        </article>
                    ))
                }

            </section>

        </section>
    )
}

export { FlightCards }