import Map from "./map/map";

function MapPage( {trackedFlight}) {


    return (
        <Map trackedFlight={trackedFlight} />
    )
}

export {MapPage}