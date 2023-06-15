import { useState, useEffect } from "react"
import { allActiveFlights, flightByAircraftIcao } from '../utils/opensky_api'
import SearchBar from "../components/SearchBar"
import FlightsCards from "../components/FlightsCards"
import { callsignToFlightnum, filterByRule, mapApiDataToTopFlight } from "../utils/airports"
import Map from "../Map"
import '../pages/HomePage.css'
import Maintenance from "../components/Maintenance"

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  const [topFlights, setTopFlights] = useState([])
  const [countryFilter, setCountryFilter] = useState('Australia')
  const [topFlightsFullData, setTopFlightsFullData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openSkyLive, setOpenSkyLive] = useState(false)


  useEffect(() => {

    setIsLoading(true)

    allActiveFlights()
      .then(res => { setFlights(res.states); return res.states })
      .then(res => res.filter(flight => filterByRule(flight, countryFilter)))
      .then((countryFilteredFlights) => {
        const unfilteredFlightsInCountry = countryFilteredFlights.slice(0, 20);

        const flightDataPromises = unfilteredFlightsInCountry.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {

          setOpenSkyLive(response.every((res) => res.status === 200));

          // Within this function
          // If the OpenSky API is down...
          //  - Start using a different component (new API) for the work
          //  - If it isn't down, proceed with below

          if (openSkyLive) {
            console.log('openSky is live', openSkyLive)

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
          }
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
      {!openSkyLive && <Maintenance />}
    </main>
  )
}