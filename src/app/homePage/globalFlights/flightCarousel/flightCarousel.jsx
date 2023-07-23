import { FetchingFlightCarousel } from "./fetchingFlightCarousel/fetchingFlightCarousel";
import './flightCarousel.css'
import { FlightCarouselContent } from "./flightCarouselContent/flightCarouselContent";

function FlightCarousel({ sixGlobalFlights, setTrackedFlight, globalFlightsFetched }) {


    return (
        <section className="flights-carousel">
            {globalFlightsFetched && <FlightCarouselContent sixGlobalFlights={sixGlobalFlights} setTrackedFlight={setTrackedFlight} />}
            {!globalFlightsFetched && <FetchingFlightCarousel />}
        </section>
    )
}

export { FlightCarousel }