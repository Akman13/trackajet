import { useState, useEffect, useRef } from "react"
import '../pages/HomePage.css'

// Utils/APIs
import { callsignToFlightnum, filterByRule, mapApiDataToTopFlight } from "../utils/airports"
import { allActiveFlights, flightByAircraftIcao } from '../utils/apis/opensky_api'
import { getFlightDataByFlightIATA, getFlightDataByFlightICAO } from "../utils/apis/flightlabs_api"
import { getPlansByICAOs, getPlanDataById } from "../utils/apis/flightPlanDatabase_api"

// Components
import SearchBar from "../components/searchBar/searchBar"
import FlightsCards from "../components/flightCards/flightsCards"
import Map from "../components/map/map"
import OpenSkyMaintenanceMessage from "../components/underMaintenance/openSkyMaintenance/openSkyMaintenance"
import FlightCardsMaintenance from "../components/underMaintenance/flightCardsMaintenance/flightCardsMaintenance"
import LoadingRadar from "../components/loadingRadar/loadingRadar"

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [airlines, setAirlines] = useState([])
  const [trackedFlight, setTrackedFlight] = useState([])
  const [topFlights, setTopFlights] = useState([])
  const [countryFilter, setCountryFilter] = useState('Australia')
  const [topFlightsFullData, setTopFlightsFullData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openSkyLive, setOpenSkyLive] = useState(false)
  const [flightCardsWorking, setFlightCardsWorking] = useState(false)

  // Added for temporary use to connect the two useEffects - assess its place during code clean-up
  const [initialXFlights, setInitialXFlights] = useState([])


  // Want 2 things
  // 2. To disregard invalid call returns & make new ones in their place
  // Proposal:
  //  - make 6 API calls
  //  - Find way to prune any lengthy responses
  //  - Responses that return -> filter them into our array based on validity
  // ^ The above should be a function, eg. getFlightData()
  // While our array doesn't have 6 flights, keep reusing getFlightData, but with different flights

  // Bonus: find a way to represent the # of returned API calls, i.e. the length of our array
  //  - Can have the array.length as a state, and pass it as a prop to the Loading component. Display it as x/6 flights retrieved

  // Need to find a way to track the progress of the promise array
  // Do it by encapsulating it within a child component? And then receiving from it the dynamic values?


  useEffect(() => {

    allActiveFlights()
      .then(res => {
        if (res.responseStatus !== 200) {
          setOpenSkyLive(false)
          setIsLoading(false)
        } else {
          setOpenSkyLive(true)
          setFlights(res.states);
          return res.states
        }
      })
      .then(res => res.filter(flight => filterByRule(flight, countryFilter)))
      .then((countryFilteredFlights) => {

        const unfilteredFlightsInCountry = countryFilteredFlights.slice(0, 12);

        const flightDataPromises = unfilteredFlightsInCountry.map(([icao24]) => flightByAircraftIcao(icao24));

        Promise.all(flightDataPromises).then((response) => {
          setIsLoading(false)
          setInitialXFlights(response)

          setFlightCardsWorking(response.some(res => res.responseStatus === 200))
        })
      })
      .catch(err => {
        if (err.message === 'The user aborted a request.')
          setOpenSkyLive(false)
        setIsLoading(false)
      })

  }, [])

  useEffect(() => {
    if (openSkyLive) {

      // Filtering out invalid API flight responses
      const validFlights = initialXFlights
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
            flightNumber: callsignToFlightnum(initialXFlights[index]['callsign'])
          }
        ))
        .filter(flight => !flight['flightNumber'].includes('undefined'))
        .filter(flight => !Object.values(flight).includes(''))

      setTopFlights(mappedToTopFlight.slice(0, 6))

    }
    else {
      // --------------- Commenting the section below out until the check for OpenSkyStatus is fixed

      // Limiting the number of flights to reduce API usage - #Increase to 6 before deployment
      // const flightsSample = unfilteredFlightsInCountry.slice(0, 1)
      
      // Testing viability of FlightLabs to handle user text input
      console.log('openSkyDown, flightData using flightIATA', getFlightDataByFlightIATA('JQ606'))
      console.log('openSkyDown, flightData using flightIATA', getFlightDataByFlightICAO('JST606'))


      // // For FlightCards. Building a flightsArray[] to host info on the flight cards. Info is flightPlanID, flightIATA, arrival/departure ICAOs
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
      // ----------------- Previous code above -----------------

    }

  }, [openSkyLive])

  return (
    <main className="home">
      <h1>TrackAJet</h1>

      <SearchBar flights={flights} setTrackedFlight={setTrackedFlight} isLoading={isLoading} setIsLoading={setIsLoading} />

      {isLoading && <LoadingRadar />}

      {!isLoading && flightCardsWorking && <FlightsCards topFlights={topFlights} flights={flights} setTrackedFlight={setTrackedFlight} />}

      {(trackedFlight[1] !== undefined) ? <Map trackedFlight={trackedFlight} /> : (<div></div>)}

      {!isLoading && !openSkyLive && <OpenSkyMaintenanceMessage />}

      {!isLoading && !flightCardsWorking && <FlightCardsMaintenance />}
    </main>
  )
}