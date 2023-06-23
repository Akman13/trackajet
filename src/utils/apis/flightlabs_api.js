function getFlightDataByFlightIATA(iataCode) {
    const url = `https://airlabs.co/api/v9/flights?api_key=${process.env.REACT_APP_AIRLAB_API_KEY}&flight_iata=${iataCode}`

    return fetch(url, {
        methods: 'GET',
    })
        .then(res => res.json())
}

function getFlightDataByFlightICAO(icaoCode) {
    const url = `https://airlabs.co/api/v9/flights?api_key=${process.env.REACT_APP_AIRLAB_API_KEY}&flight_icao=${icaoCode}`

    return fetch(url, {
        methods: 'GET',
    })
        .then(res => res.json())
}



export { getFlightDataByFlightIATA, getFlightDataByFlightICAO }