import Map from "./map/map";
import { MoreFlights } from "./moreFlights/moreFlights";
import { FlightData } from "./flightData/flightData";

function MapPage({ trackedFlight, setTrackedFlight }) {

    return (
        <>
            <Map trackedFlight={trackedFlight} />
            <MoreFlights setTrackedFlight={setTrackedFlight} />
            <FlightData />

        </>
    )
}

export { MapPage }