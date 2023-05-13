// import { useState, useEffect } from "react";
// import airportData from "./data/airports";
// import {onFlightTrack , allActiveFlights, flightByAircraftIcao} from "./utils/opensky_api"
// import { getVelocity } from "./utils/velocity";

// function FlightByAircraftIcao({ icao }) {
//   const [distance, setDistance] = useState(null);
//   const [velocity, setVelocity] = useState(null);
//   const [currentDistance, setCurrentDistance] = useState(null);
//   const [eta, setEta] = useState(null);

//   useEffect(() => {
//     let isMounted = true;
//     const endTimeUnix = Math.floor(new Date().getTime() / 1000);
//     const startTimeUnix = endTimeUnix - 86400;
//     let flight = flightByAircraftIcao(icao)

//         const departureAirport = flight.estDepartureAirport;
//         const arrivalAirport = flight.estArrivalAirport;

//         const departureAirportDetails = airportData.find(
//           (airport) => airport.icao === `${departureAirport}`
//         );
//         const arrivalAirportDetails = airportData.find(
//           (airport) => airport.icao === `${arrivalAirport}`
//         );
//         const departureLat = departureAirportDetails.latitude;
//         const departureLon = departureAirportDetails.longitude;
//         const arrivalLat = arrivalAirportDetails.latitude;
//         const arrivalLon = arrivalAirportDetails.longitude;
//         const dist = calculateDistance(
//           departureLat,
//           departureLon,
//           arrivalLat,
//           arrivalLon
//         );
//         setDistance(dist.toFixed(2));

//         let vel = getVelocity(icao)

//               setVelocity(vel);

//               let p = getPath(icao)

//             const p = res.path[res.path.length - 1];
//             const currDist = calculateDistance(p[1], p[2], arrivalLat, arrivalLon);
//             if (isMounted) {
//               setCurrentDistance(currDist);
//             }
//           });
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, [icao]);

//   useEffect(() => {
//     if (distance && velocity && currentDistance) {
//       const etaTime = currentDistance / velocity;
//       const etaHours = Math.floor(etaTime);
//       const etaMinutes = Math.round((etaTime - etaHours) * 60);
//       setEta(`${etaHours} hr ${etaMinutes} min`);
//     }
//   }, [distance, velocity, currentDistance]);

//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const earthRadius = 6371; // in km
//     const dLat = toRadians(lat2 - lat1)
//     const dLon = toRadians(lon2 - lon1)
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRadians(lat1)) *
//         Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2)
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//     const distance = earthRadius * c
//     return distance
//   }

//   // Helper function to convert degrees to radians
//   function toRadians(degrees) {
//     return (degrees * Math.PI) / 180
//   }
// }
