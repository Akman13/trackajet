import Map from "./map/map";
import { MoreFlights } from "./moreFlights/moreFlights";

function MapPage({ trackedFlight, setTrackedFlight }) {

    return (
        <>
            <Map trackedFlight={trackedFlight} />
            <MoreFlights setTrackedFlight={setTrackedFlight} />

        </>
    )
}

export { MapPage }