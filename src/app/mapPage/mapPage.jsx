import Map from "./map/map";
import { MoreFlights } from "./moreFlights/moreFlights";
import { FlightData } from "./flightData/flightData";
import { HiHome } from "react-icons/hi"
import { Button } from "@mantine/core";


function MapPage({ trackedFlight, setTrackedFlight }) {

    const handleHomeClick = () => {
        setTrackedFlight({})
    }

    const moreFlightsStyle = {
        'display': 'flex',
        'justify-content': 'center',
    }

    const homeButtonStyle = {
        'padding': '0px',
        'aspect-ratio': '1'
    }

    const homeButtonContainerStyle = {
        'position': 'fixed',
        'left': '0.5em',
        'top': '0.5em'
    }



    return (
        <>
            <Map trackedFlight={trackedFlight} />
            <div style={moreFlightsStyle}>
                <MoreFlights setTrackedFlight={setTrackedFlight} />
            </div>
            <div className="home-button-container" style={homeButtonContainerStyle}>
                <Button style={homeButtonStyle} onClick={handleHomeClick}>
                    <HiHome size={'1.7em'} />
                </Button>
            </div>
            <FlightData trackedFlight={trackedFlight} setTrackedFlight={setTrackedFlight} />
        </>
    )
}

export { MapPage }