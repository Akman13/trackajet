import { useEffect, useState } from 'react';
import { flightNumToCallsign } from '../utils/airlines';
import { onFlightTrack } from '../utils/opensky_api';
import '../components/SearchBar.css'

export default function SearchBar( { flights, setTrackedFlight, trackedFlight, setIsLoading, isLoading } ){

    const [error, setError] = useState("")
    const [formData, setFormData] = useState()
	const [error,setError] = useState(false)

    const handleSubmit = (e) => {

        e.preventDefault()

		setIsLoading(true)
        
        const callSign = flightNumToCallsign(formData);
        const requiredFlight = flights.filter(flight => flight[1] === callSign);

		if(requiredFlight[0] === undefined){
			console.log('not found')
			setError(true)
			return
		} else {
			setError(false)
		}
    
        onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res])) 
		
		setIsLoading(false)
    }

    const handleChange = (e) => {

	const handleChange = e => {
		setFormData(e.target.value)
	}

	const loading = isLoading

	return (
		<>
		<form
			className='flight-search'
			onChange={handleChange}
			onSubmit={handleSubmit}>
			<div className='search-wrapper'>
				<input
					type='text'
					id='search'
					name='search'
					placeholder='Enter flight number'
				/>
				<button type='submit'>Search</button>
			</div>
		</form>
		{error && (<div className='not-found'>Flight number not found</div>)}
		{error && (<div className="beacon"></div>)}
		</>

	)
}
