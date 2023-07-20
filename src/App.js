import { useState } from "react"
import "./App.css"
// import HomePage from "./pages/HomePage"
import { HomePage } from "./app/homePage/homePage"
import { MapPage } from "./app/mapPage/mapPage"


function App() {

  const [trackedFlight, setTrackedFlight] = useState({})

  return (
    <div className="App">
      {Object.keys(trackedFlight).length === 0 && <HomePage setTrackedFlight={setTrackedFlight} />}

      {Object.keys(trackedFlight).length !== 0 && <MapPage trackedFlight={trackedFlight} setTrackedFlight={setTrackedFlight} />}
    </div>
  )
}

export default App
