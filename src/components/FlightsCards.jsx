import './FlightsCards.css'
import { flightNumToCallsign } from '../utils/airlines';
import { onFlightTrack } from './../utils/opensky_api';

export default function FlightsCards({ topFlights, flights, setTrackedFlight }) {

    const handleClick = (e) => {
        const flightNum = e.target.closest('.flight-card').id
        const callsign = flightNumToCallsign(flightNum)

        const requiredFlight = flights.filter(flight => flight[1] === callsign);
        setTrackedFlight(requiredFlight)

        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }
    }

    
    // Have a text input field
    // Take their input
    // See if it's found in any of the countries of our airport file
    // If it is, then:
    // - Store it as the filter
    
    // Create a filter state, default is 'Australia'

    

    return (
        <section className="cards-list">

            {topFlights.map(flight => (
                <article onClick={handleClick} className='flight-card' id={`${flight['flightNumber']}`} key={flight['flightNumber']}>
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