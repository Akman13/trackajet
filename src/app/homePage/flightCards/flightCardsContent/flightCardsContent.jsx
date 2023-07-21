import { getFullFlightData } from "./../../../sharedComponents/searchBar/utils"
import { LoadingOverlay } from "@mantine/core"
import { createRef, useRef, useState } from "react";

/* 
onClick for any of the articles... -> set an loadingOverlay on top of each one
Each article needs its unique identifier, that when clicked, signals for its unique overlay to activate
 */


function FlightCardsContent({ sixLocalFlights, setTrackedFlight }) {

    const [loaderVisible, setLoaderVisible] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false });
    const loadingRefs = useRef([])
    loadingRefs.current = sixLocalFlights.map((element, i) => loadingRefs.current[i] ?? createRef());


    const handleReactClick = async (ref) => {
        const flightIata = ref.current.dataset.flight_num
        const cardIndex = Object.keys(loadingRefs.current).filter(key => loadingRefs.current[key] === ref)[0]

        // Make them all false

        let loaderVisibleCopy = { ...loaderVisible }
        Object.keys(loaderVisibleCopy).forEach(value => loaderVisibleCopy[value] = false)
        loaderVisibleCopy[cardIndex] = true

        setLoaderVisible(loaderVisibleCopy)

        try {
            const flightData = await getFullFlightData(flightIata)
            // console.log('searchBar flightData', flightData)

            setTrackedFlight(flightData)

        } catch (error) {
            console.log('flightCards error after clicking', error)
        }

    }


    return (
        <>
            {sixLocalFlights.map((flight, index) => (
                <article onClick={() => handleReactClick(loadingRefs.current[index])} key={index} className='flight-card' data-flight_num={flight['flight_iata']} ref={loadingRefs.current[index]}>
                    <LoadingOverlay overlayBlur={1} overlayOpacity={0.3} overlayColor="#f5f5f7" visible={loaderVisible[index]} loaderProps={{ 'variant': 'dots', 'size': 'xl' }} />

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
            ))}
        </>

    )
}

export { FlightCardsContent }