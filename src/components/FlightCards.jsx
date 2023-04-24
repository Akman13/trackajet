import '../components/FlightCards.css'

export default function FlightsCards({ topFlights }) {
    // On page load...
    // Set the state of TopFlights to be the 6 filtered flights we get back from our util function

    return (
        <section className="cards-list">

            {topFlights.map(flight => (
                <article className='flight-card' key={flight['flightNumber']}>
                    <p>{flight['flightNumber']} </p>
                    <div>
                        <span>Dep: {flight['departureAirport']} </span>
                        <span>Arr: {flight['arrivalAirport']} </span>
                    </div>
                </article>
            ))}

        </section>
    )
}