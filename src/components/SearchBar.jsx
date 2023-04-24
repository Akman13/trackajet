import { useEffect, useState } from 'react';
import { flightNumToCallsign } from '../utils/airlines';
import { onFlightTrack } from './../utils/opensky_api';


export default function SearchBar( { flights, setTrackedFlight, trackedFlight } ){

    const [error, setError] = useState("")
    const [formData, setFormData] = useState()
    const [flightICAO, setFlightICAO] = useState({})

    const handleSubmit = (e) => {

        e.preventDefault()
        
        const callSign = flightNumToCallsign(formData);
        const requiredFlight = flights.filter(flight => flight[1] === callSign);
        setTrackedFlight(requiredFlight)
        
        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }
    }

    const handleChange = (e) => {

        setFormData(e.target.value)
    }

    return (

        <>
        <form className='search-form' onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder='Flight number...'/>
            <button>Search</button>
        </form>
        </>
    )
    
}
