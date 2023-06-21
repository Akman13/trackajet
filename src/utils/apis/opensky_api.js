// The API is not always returning us a JSON error response
function openskyErrorHandler(error) {
  return error
}

function onFlightTrack(ICAOnumber) {

  const url = `https://opensky-network.org/api/tracks/all?icao24=${ICAOnumber}&time=0`

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}

async function allActiveFlights() {

  const fetchRes = await fetch("https://opensky-network.org/api/states/all", {
    headers: {
      Authorization: "Basic " + btoa("Akman:pragmaticpw"),
    },
  })

  try {
    if (fetchRes.status !== 200) throw ({ responseStatus: fetchRes.status, message: `There was an error with status code ${fetchRes.status}` })

    else {
      const allFlights = await fetchRes.json()
      return { ...allFlights, responseStatus: fetchRes.status }
    }

  } catch (error) {
    return openskyErrorHandler(error)
  }
}

async function flightByAircraftIcao(icao) {

  let endTimeUnix = new Date();
  endTimeUnix.setDate(endTimeUnix.getDate() - 1);
  endTimeUnix = Math.floor(endTimeUnix.getTime() / 1000);


  let startTimeUnix = new Date();
  startTimeUnix.setDate(startTimeUnix.getDate() - 2);
  startTimeUnix = Math.floor(startTimeUnix.getTime() / 1000);

  const url = `https://opensky-network.org/api/flights/aircraft?icao24=${icao}&begin=${startTimeUnix}&end=${endTimeUnix}`

  const fetchRes = await fetch(url, {
    methods: 'GET'
  })

  try {
    if (fetchRes.status !== 200) throw ({ responseStatus: fetchRes.status, message: `There was an error with status code ${fetchRes.status}` })

    else {
      const flights = await fetchRes.json()
      return { ...flights[0], responseStatus: fetchRes.status }
    }

  } catch (error) {
    return openskyErrorHandler(error)
  }

}

export { onFlightTrack, allActiveFlights, flightByAircraftIcao };