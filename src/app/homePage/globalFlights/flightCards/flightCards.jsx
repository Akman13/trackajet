import { FlightCardsContent } from "./flightCardsContent/flightCardsContent"
import { FetchingFlightCards } from "./fetchingFlightCards/fetchingFlightCards"

function FlightCards({ setTrackedFlight, globalFlightsFetched, sixGlobalFlights }) {

    return (
        <section className="flight-cards">
            <section className="cards-list">
                {!globalFlightsFetched && <FetchingFlightCards />}

                {globalFlightsFetched && <FlightCardsContent setTrackedFlight={setTrackedFlight} sixGlobalFlights={sixGlobalFlights} />}

            </section>
        </section>
    )
}

export { FlightCards }