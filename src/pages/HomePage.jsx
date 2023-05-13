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
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    setIsLoading(true)

    allActiveFlights()
      .then(res => { setFlights(res.states); return res.states })
      .then(res => res.filter(flight => filterByRule(flight, countryFilter)))
      .then((countryFilteredFlights) => {
        // console.log(countryFilteredFlights)
        const unfilteredFlightsInCountry = countryFilteredFlights.slice(0, 20);
        // console.log('unfilteredFlightsInCountry', unfilteredFlightsInCountry)

        const flightDataPromises = unfilteredFlightsInCountry.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          let definedFlights = response.filter(Boolean);

          // Check if a flight has null values - if it does, filter it out
          definedFlights = definedFlights.filter(flight => {
            if (Object.values(flight).includes(null) || Object.values(flight).includes(undefined)) return false;
            else return true;
          })

          // console.log('definedFlights', definedFlights)


          let mappedToTopFlight = definedFlights
            .map((flight, index) => (
              {
                ...mapApiDataToTopFlight(flight),
                icao24: flight['icao24'],
                flightNumber: callsignToFlightnum(unfilteredFlightsInCountry[index][1])
              }
            ))
            // .filter(flight => !Object.values(flight).includes('undefined'))
            .filter(flight => !flight['flightNumber'].includes('undefined'))
            .filter(flight => !Object.values(flight).includes(''))
            ;

          // console.log('mappedToTopFlight', mappedToTopFlight)

          // let mappedToTopFlightWithData = definedFlights
          //   .map((flight, index) => ({
          //     ...flight,
          //     ...mapApiDataToTopFlight(flight),
          //     flightNumber: callsignToFlightnum(unfilteredFlightsInCountry[index][1])
          //   }))
          //   .filter(flight => !Object.values(flight).includes('undefined'))
          //   .filter(flight => !Object.values(flight).includes(''))
          //   ;

          // setTopFlightsFullData(mappedToTopFlightWithData.slice(0, 6))
          setTopFlights(mappedToTopFlight.slice(0, 6))
        })
      })
      .catch(err => console.log(err.message))
    setIsLoading(false)
  }, [])

  return (
    <main>
      {/* {!trackedFlight[1] && <h1>ElonJet</h1>} */}
      <h1>TrackAJet</h1>
      <SearchBar flights={flights} setTrackedFlight={setTrackedFlight} isLoading={isLoading} setIsLoading={setIsLoading} />
      <FlightsCards topFlights={topFlights} flights={flights} setTrackedFlight={setTrackedFlight} />
      {trackedFlight[1] !== undefined ? <Map trackedFlight={trackedFlight} /> : (<div></div>)}
    </main>
  )
}