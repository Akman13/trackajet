import { useState, useEffect } from "react"
//import axios from "axios"
import { allActiveFlights, flightByAircraftIcao } from '../utils/opensky_api'
import SearchBar from "../components/SearchBar"
import FlightsCards from "../components/FlightsCards"
import { callsignToFlightnum, filterByRule, mapApiDataToTopFlight } from "../utils/airports"

import Map from "../Map"
import '../pages/HomePage.css'

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  const [topFlights, setTopFlights] = useState([])
  const [countryFilter, setCountryFilter] = useState('Australia')
  const [topFlightsFullData, setTopFlightsFullData] = useState([])


  useEffect(() => {
    allActiveFlights()
      .then(res => { setFlights(res.states); return res.states })
      .then(res => res.filter(flight => filterByRule(flight, countryFilter)))
      .then((filteredFlights) => {
        console.log(filteredFlights)
        const topXFlights = filteredFlights.slice(0, 12);
        // console.log(topXFlights)

        const flightDataPromises = topXFlights.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          const definedFlights = response.filter(Boolean);
          console.log(definedFlights)


          let mappedToTopFlight = definedFlights
            .map((flight, index) => ({

              ...mapApiDataToTopFlight(flight),
              flightNumber: callsignToFlightnum(topXFlights[index][1])

            }))
            .filter(flight => !Object.values(flight).includes('undefined'))
            .filter(flight => !Object.values(flight).includes(''))
          ;

          let mappedToTopFlightWithData = definedFlights
            .map((flight, index) => ({
              ...flight,
              ...mapApiDataToTopFlight(flight),
              flightNumber: callsignToFlightnum(topXFlights[index][1])
            }))
            .filter(flight => !Object.values(flight).includes('undefined'))
            .filter(flight => !Object.values(flight).includes(''))
          ;
          
          setTopFlightsFullData(mappedToTopFlightWithData.slice(0,6))          
          setTopFlights(mappedToTopFlight.slice(0, 6))
        })
      })
      .catch(err => console.log(err.message))
  }, [])

  return (
    <main>
      <h1>ElonJet</h1>
      <SearchBar flights={flights} setTrackedFlight={setTrackedFlight} />
      <FlightsCards topFlights={topFlights} flights={flights} setTrackedFlight={setTrackedFlight} />

      {trackedFlight[1] !== undefined ? <Map trackedFlight={trackedFlight[1]} /> : (<div className="radar"><div className="beacon"></div>
      </div>)}
    </main>
  )
}
