import Map from "./map/map";

function MapPage({ trackedFlight }) {

    const divStyle = {
        position: 'absolute',
        top: '0',
    }


    return (
        <>
            <Map trackedFlight={trackedFlight} />
            <div className="test" style={divStyle}>
                Hello there!
            </div>
        </>
    )
}

export { MapPage }