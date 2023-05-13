import './FlightsCards.css'
import { onFlightTrack } from './../utils/opensky_api';

export default function FlightsCards({ topFlights, flights, setTrackedFlight }) {

    const handleClick = (e) => {
        const flightNum = e.target.closest('.flight-card').id
        const icao24 = e.target.closest('.flight-card').dataset.icao24;
        
        
        // console.log('flightNum',flightNum)
        console.log('icao24', icao24);
        const requiredFlight = flights.filter(flight => flight[0] === icao24);
        console.log('requiredFlight', requiredFlight)
        setTrackedFlight(requiredFlight)

        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }
    }

    return (
        <section className="cards-list">

            {topFlights.map(flight => (
                <article onClick={handleClick} className='flight-card' id={`${flight['flightNumber']}`} key={flight['flightNumber']} data-icao24={flight['icao24']}>
                    <p>✈️ {flight['flightNumber']} </p>
                    <div>
                        <p>Dep: {flight['departureAirport']} </p>
                        <p>Arr: {flight['arrivalAirport']} </p>
                    </div>
                </article>
            ))}

        </section>
    )
}