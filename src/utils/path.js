function getPath(icao) {
  return fetch(
    `https://opensky-network.org/api/tracks/all?time=0&icao24=${icao}`,
    {
      headers: {
        Authorization: "Basic " + btoa("react-flights:testing@123"),
      },
    }
  )
    .then(res => res.json())
    .then(res => {
      let p = res.path[res.path.length - 1]
      return p
    })
}

export { getPath }
