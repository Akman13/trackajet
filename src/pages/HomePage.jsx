import { useState, useEffect } from "react"

import { allActiveFlights, flightByAircraftIcao } from '../utils/apis/opensky_api'
import { getFlightDataByFlightIATA, getFlightDataByFlightICAO } from "../utils/apis/flightlabs_api"
import { getPlansByICAOs, getPlanDataById } from "../utils/apis/flightPlanDatabase_api"

import { callsignToFlightnum, filterByRule, mapApiDataToTopFlight } from "../utils/airports"

import SearchBar from "../components/searchBar/searchBar"
import FlightsCards from "../components/flightCards/flightsCards"
import Map from "../components/map/map"
import '../pages/HomePage.css'
import MaintenanceMessage from "../components/maintenanceMessage/maintenanceMessage"

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

        const unfilteredFlightsInCountry = countryFilteredFlights.slice(0, 6);

        const flightDataPromises = unfilteredFlightsInCountry.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          console.log('response after promise.all', response)

          setOpenSkyLive(response.every((res) => res.responseStatus === 200));

          // Open up with a loading component (isLoading = True)
          //  - Currently fetching local flights...

          // Once the responses come back, check their status
          // If they're all good, set openSkyLive=True, else set False
          
          // Set isLoading to False (loading component disappears)
          
          // Based on openSkyLive value, either an error message appears or the flights appear


          if (openSkyLive) {
            console.log('openSky is live', openSkyLive)

            // Filtering out invalid API flight responses
            const validFlights = response
              .filter(Boolean)
              .filter(flight => {
                if (Object.values(flight).includes(null) || Object.values(flight).includes(undefined)) return false;
                else return true;
              })


            // Providing each valid flight with an object of its details (arr, dep, flight number)
            let mappedToTopFlight = validFlights
              .map((flight, index) => (
                {
                  ...mapApiDataToTopFlight(flight),
                  icao24: flight['icao24'],
                  flightNumber: callsignToFlightnum(unfilteredFlightsInCountry[index][1])
                }
              ))
              .filter(flight => !flight['flightNumber'].includes('undefined'))
              .filter(flight => !Object.values(flight).includes(''))

            setTopFlights(mappedToTopFlight.slice(0, 6))

          } else {
            console.log('not live')
            console.log('unfiltered Flights In Country', unfilteredFlightsInCountry)

            // --------------- Commenting the section below out until the check for OpenSkyStatus is fixed

            // // Limiting the number of flights to reduce API usage - #Increase to 6 before deployment
            // const flightsSample = unfilteredFlightsInCountry.slice(0, 1)

            // // Building a FlightsArray to host flightIATA and airport info - Need to turn into an async function so it can be chained with the step below
            // const flightsArray = []
            // flightsSample.forEach(async (flight) => {
            //   const flightIATA = callsignToFlightnum(flight[6].trim())
            //   // console.log('flightIATA', flightIATA)

            //   const airlabsFlightData = await getFlightDataByFlightIATA(flightIATA)
            //   // console.log(airlabsFlightData)

            //   flightsArray.push({
            //     flightIATA: flightIATA,
            //     arrivalICAO: airlabsFlightData['arr_icao'],
            //     departureICAO: airlabsFlightData['dep_icao'],
            //   })
            // })

            // // Need to turn this into an async function so it can be chained
            // flightsArray.forEach(async (flight) => {
            //   const flightPlanID = await getPlansByICAOs(flight['departureICAO'], flight['arrivalICAO'])[0]['id'];

            //   flight = {
            //     ...flight,
            //     id: flightPlanID
            //   }
            // })

            // ------------------ Above is commented out until the check for OpenSkyStatus is fixed

            

            // For each flight object ...
            //  - Perform an API call to flightPlanDatabase (search for plans by dep/arr)
            //  - Map into the object the first result's id

            // For each flight object ...
            //  - Perform another API call to flightPlanDatabase (search for plan by id)
            //  - Map into the object the route data


            // ----------------- Previous code -----------------
            // getFlightData('EY101').then(res => {
            //   console.log(res.response);
            //   const [deptICAO, arrICAO] = [res.response[0]['dep_icao'], res.response[0]['arr_icao']];
            //   return [deptICAO, arrICAO]
            // })
            // .then(([deptICAO, arrICAO]) => getPlansByICAOs(deptICAO, arrICAO))
            // .then(res => {
            //   console.log('flightDataByAirports', res)
            //   let id = res[0]['id']
            //   console.log('id', id)
            //   return id
            // })
            // .then(id => getPlanDataById(id))

            // .then(res => {
            //   console.log('planDataById', res)
            // })

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
      {!openSkyLive && <MaintenanceMessage />}
    </main>
  )
}