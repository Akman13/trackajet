import { Carousel } from "@mantine/carousel"
import { createRef, useRef, useState } from "react"
import { LoadingOverlay } from "@mantine/core"

import { getFullFlightData } from "../../../../sharedComponents/searchBar/utils"


function FlightCarouselContent({ sixGlobalFlights, setTrackedFlight }) {
    const [loaderVisible, setLoaderVisible] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false });
    const loadingRefs = useRef([])
    loadingRefs.current = sixGlobalFlights.map((element, i) => loadingRefs.current[i] ?? createRef());

    const handleCardClick = async (ref) => {
        const flightIata = ref.current.dataset.flight_num
        const cardIndex = Object.keys(loadingRefs.current).filter(key => loadingRefs.current[key] === ref)[0]

        let loaderVisibleCopy = { ...loaderVisible }
        Object.keys(loaderVisibleCopy).forEach(value => loaderVisibleCopy[value] = false)
        loaderVisibleCopy[cardIndex] = true

        setLoaderVisible(loaderVisibleCopy)

        try {
            const flightData = await getFullFlightData(flightIata)
            setTrackedFlight(flightData)

        } catch (error) {
            console.log('flightCards error after clicking', error)
        }
    }

    const carouselStyle = {
        'control': {
            '&[data-inactive]': {
                'opacity': '0',
                'cursor': 'default',
            },
        },
    }

    return (
        <Carousel
            styles={carouselStyle}
            slideSize="85%"
            slideGap="md"
            initialSlide={0}
            slidesToScroll={1}
        >
            {sixGlobalFlights.map((flight, index) => (
                <Carousel.Slide>
                    <article onClick={() => handleCardClick(loadingRefs.current[index])} key={index} className='flight-card' data-flight_num={flight['flight_iata']} ref={loadingRefs.current[index]}>

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
                </Carousel.Slide>
            ))}

        </Carousel>
    )
}

export { FlightCarouselContent }