import { useState, useEffect } from "react"
//import axios from "axios"
import { allActiveFlights } from "../opensky_api"
import SearchBar from "../components/SearchBar"
import FlightsCards from "../components/FlightsCards"
import { flightListData, getFlightAirportsData, callsignToFlightnum } from "../utils/airports"
import { flightByAircraftIcao } from "../opensky_api";
import airportData from '../data/airports.json';

const filterByRule = (flight) => {
  const regex = new RegExp(/^[a-zA-Z]{3}\d{3}$/)
  return ((flight[2] === 'Switzerland') && (regex.test(flight[1].slice(0, 6))))
}

const getAirportNameForIcaoCode = (icaoToFind) => {
  const foundAirport = airportData.find(({ icao }) => icao === icaoToFind);

  if (!foundAirport) {
    return '';
  }

  return foundAirport.airport; // name
}

const mapApiDataToTopFlight = (apiFlightData) => {
  return {
    departureAirport: getAirportNameForIcaoCode(apiFlightData.estDepartureAirport),
    arrivalAirport: getAirportNameForIcaoCode(apiFlightData.estArrivalAirport),
  }
}


export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  const [topFlights, setTopFlights] = useState([])

  useEffect(() => {
    allActiveFlights()
      // .then(res => setFlights(res.states.slice(0, 10)))
      // Above line commented out by Akram - homepage needs to render searchbar and the travel cards. The searchbar will require an array of ALL active flights (as opposed to 10) for the user input to be compared against. The flights.map() in the render below has been modified to map for the first 10

      .then(res => { setFlights(res.states); return res })
      .then((res) => res.states.filter(filterByRule))
      .then((filteredFlights) => {
        const topXFlights = filteredFlights.slice(0, 6);
        console.log(topXFlights)

        const flightDataPromises = topXFlights.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          const definedFlights = response.filter(Boolean);
          const mappedToTopFlight = definedFlights.map((flight, index) => ({
            ...mapApiDataToTopFlight(flight),
            flightNumber: callsignToFlightnum(topXFlights[index][1])
          }))

          setTopFlights(mappedToTopFlight)
        })
      })
      .catch(err => console.log(err.message))
  }, [])


  // useEffect(() => {

  //   const fetchData = async () => {
  //     console.log('TOP KEK: top flights useEffect: flights stringify')
  //     const topFlightList = await flightListData(flights);

  //     console.log('TOP KEK: top flights useEffect: result', topFlightList);

  //     setTopFlights([...topFlightList]);
  //   };

  //   fetchData();
  // }, [JSON.stringify(flights), ''])

  //fetch the json data and store it is airlineData and compare it with the flights state
  let airlineName = []
  // The below code commented out by Akram - it was giving an error whenever React tried to run it for me. Currently airlinesData doesn't exist, until it's ready I've commented it out so the site can run.

  // setFlights.forEach(flight => {
  //   airlineName = airlinesData.find(airline => airline.ICAO === flight[0])
  // })

  return (
    <div>
      <h1>My OpenSky App</h1>
      <SearchBar flights={flights} setTrackedFlight={setTrackedFlight} />
      <FlightsCards topFlights={topFlights} />
      <ul>
        {flights.slice(0, 10).map(flight => (
          //this needs to change according to the way we want our display
          <li key={flight[0]}>
            {flight[1]} ({flight[2]}) - Altitude: {flight[7]} m
          </li>
        ))}
      </ul>
    </div>
  )
}
