// The API is not always returning us a JSON error response
function openskyErrorHandler(error) {
  return error
}

function getFlightTrack(ICAOnumber) {

  const url = `https://opensky-network.org/api/tracks/all?icao24=${ICAOnumber}&time=0`

  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}

async function allActiveFlights() {

  const url = `https://opensky-network.org/api/states/all`

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const fetchRes = await fetch(url, {
      headers: {
        Authorization: "Basic " + btoa("Akman:pragmaticpw"),
      },
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (fetchRes.status !== 200) throw ({ responseStatus: fetchRes.status, message: `There was an error with status code ${fetchRes.status}` })
    else {
      const allFlights = await fetchRes.json()
      return { ...allFlights, responseStatus: fetchRes.status }
    }

  } catch (error) {
    if (controller.signal.aborted) return ({ responseStatus: 444, message: `The request took too long and was aborted` })
    else return openskyErrorHandler(error)
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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000)

  try {
    const fetchRes = await fetch(url, {
      methods: 'GET',
      signal: controller.signal
    })
    clearTimeout(timeoutId)

    if (fetchRes.status !== 200) throw ({ responseStatus: fetchRes.status, message: `There was an error with status code ${fetchRes.status}` })

    else {
      const flights = await fetchRes.json()
      return { ...flights[0], responseStatus: fetchRes.status }
    }

  } catch (error) {
    return openskyErrorHandler(error)
  }

}

export { getFlightTrack, allActiveFlights, flightByAircraftIcao };