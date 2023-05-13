// const airportData = require("./data/airports")

// function flightByAircraftIcao(icao) {
//   // const endTimeUnix = Math.floor(new Date().getTime() / 1000);
//   let endTimeUnix = new Date()
//   endTimeUnix.setDate(endTimeUnix.getDate() - 1)
//   endTimeUnix = Math.floor(endTimeUnix.getTime() / 1000)

//   let startTimeUnix = new Date()
//   startTimeUnix.setDate(startTimeUnix.getDate() - 2)
//   startTimeUnix = Math.floor(startTimeUnix.getTime() / 1000)

//   const url = `https://opensky-network.org/api/flights/aircraft?icao24=${icao}&begin=${startTimeUnix}&end=${endTimeUnix}`
//   return fetch(url, {
//     headers: {
//       Authorization: "Basic " + btoa("flightreacts:LMN4xp@t8rbJFx6"),
//     },
//   })
//     .then(res => res.json())
//     .then(flights => {
//       //console.log(flights[0])
//       let flight = flights[0]
//       let departureAirport = flight.estDepartureAirport
//       let arrivalAirport = flight.estArrivalAirport
//       //console.log(departureAirport)
//       //console.log(arrivalAirport)
//       let currentDistance

//       let departureAirportDetails = airportData.find(
//         airport => airport.icao === `${departureAirport}`
//       )
//       let arrivalAirportDetails = airportData.find(
//         airport => airport.icao === `${arrivalAirport}`
//       )
//       let departureLat = departureAirportDetails.latitude
//       let departureLon = departureAirportDetails.longitude
//       let arrivalLat = arrivalAirportDetails.latitude
//       let arrivalLon = arrivalAirportDetails.longitude
//       const distance = calculateDistance(
//         departureLat,
//         departureLon,
//         arrivalLat,
//         arrivalLon
//       )

//       console.log(
//         `Distance between ${departureAirport} and ${arrivalAirport}: ${distance.toFixed(
//           2
//         )} km`
//       )

//       let velocity = fetch(
//         `https://opensky-network.org/api/states/all?time=0&icao24=${icao}`,
//         {
//           headers: {
//             Authorization: "Basic " + btoa("flightreacts:LMN4xp@t8rbJFx6"),
//           },
//         }
//       )
//         .then(res => res.json())
//         .then(res => {
//           let vel = res.states[0][9]
//           let velInKm = vel * 3.6
//           console.log(velInKm)
//         })
//       //console.log(velocity)

//       let path = fetch(
//         `https://opensky-network.org/api/tracks/all?time=0&icao24=7c7a4a`,
//         {
//           headers: {
//             Authorization: "Basic " + btoa("flightreacts:LMN4xp@t8rbJFx6"),
//           },
//         }
//       )
//         .then(res => res.json())
//         .then(res => {
//           let p = res.path[res.path.length - 1]
//           currentDistance = calculateDistance(
//             p[1],
//             p[2],
//             arrivalLat,
//             arrivalLon
//           )
//           console.log(currentDistance)
//         })

//       let ETA = currentDistance / velocity
//       console.log(ETA) //1hr 26 min

//       //Helper function to calculate distance between two points in km using the Haversine formula
//       function calculateDistance(lat1, lon1, lat2, lon2) {
//         const earthRadius = 6371 // in km
//         const dLat = toRadians(lat2 - lat1)
//         const dLon = toRadians(lon2 - lon1)
//         const a =
//           Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//           Math.cos(toRadians(lat1)) *
//             Math.cos(toRadians(lat2)) *
//             Math.sin(dLon / 2) *
//             Math.sin(dLon / 2)
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//         const distance = earthRadius * c
//         return distance
//       }

//       // Helper function to convert degrees to radians
//       function toRadians(degrees) {
//         return (degrees * Math.PI) / 180
//       }

//       async function getVelocity(icao) {
//         return fetch(
//           `https://opensky-network.org/api/states/all?time=0&icao24=${icao}`,
//           {
//             headers: {
//               Authorization: "Basic " + btoa("flightreacts:LMN4xp@t8rbJFx6"),
//             },
//           }
//         )
//           .then(res => res.json())
//           .then(res => {
//             return res.states[0][9]
//           })
//       }
//     })
// }

// flightByAircraftIcao("7c7a4a")
