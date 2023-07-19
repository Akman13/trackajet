import Map from "./map/map";
import { MoreFlights } from "./moreFlights/moreFlights";
import { FlightData } from "./flightData/flightData";

function MapPage({ trackedFlight, setTrackedFlight }) {

    const moreFlightsStyle = {
        'display':'flex',
        'justify-content': 'center',
    }

    // TODO:
    // Add a pop-up adjacent to the FlightData to notify the user of the pane

    return (
        <>
            <Map trackedFlight={trackedFlight} />
            <div style={moreFlightsStyle}>
                <MoreFlights setTrackedFlight={setTrackedFlight} />
            </div>
            <FlightData trackedFlight={trackedFlight} setTrackedFlight={setTrackedFlight} />

        </>
    )
}

export { MapPage }