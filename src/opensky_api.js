function onFlightTrack(ICAOnumber) {

    const url = `https://opensky-network.org/api/tracks/all?icao24=${ICAOnumber}&time=0`

    return fetch(url, {
        method:'GET',
    }).then(res => res.json())
}

function allActiveFlights() {

    return fetch("https://opensky-network.org/api/states/all", {
        headers: {
          Authorization: "Basic " + btoa("Akman:pragmaticpw"),
        },
      })
        .then(res => res.json())
}

function flightByAircraftIcao(icao) {
  
  let endTimeUnix = new Date();
  endTimeUnix.setDate(endTimeUnix.getDate() -1 );
  endTimeUnix = Math.floor( endTimeUnix.getTime() / 1000 );

  
  let startTimeUnix = new Date();
  startTimeUnix.setDate(startTimeUnix.getDate() -2 );
  startTimeUnix = Math.floor( startTimeUnix.getTime() / 1000 );

  const url = `https://opensky-network.org/api/flights/aircraft?icao24=${icao}&begin=${startTimeUnix}&end=${endTimeUnix}`

  return fetch(url, {
    methods: 'GET',
    })
      .then(res => res.json())
      .then(flights => flights[0])
}

export { onFlightTrack , allActiveFlights, flightByAircraftIcao};