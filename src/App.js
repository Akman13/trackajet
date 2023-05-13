import "./App.css"
import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar"
// import Map from "./Map"
import HomePage from "./pages/HomePage"
import FlightByAircraftIcao from "./components/Test2"

function App() {
  return (
    <div className="App">
      <HomePage />
      <FlightByAircraftIcao icao={"7c6dde"} />
      {/* <Map /> */}
    </div>
  )
}

export default App
