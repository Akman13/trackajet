import { useEffect, useState } from 'react';
import { flightNumToCallsign } from '../../utils/airlines';
import { onFlightTrack } from '../../utils/apis/opensky_api';

import './searchBar.css'

export default function SearchBar( { flights, setTrackedFlight, trackedFlight, setIsLoading, isLoading } ){

    
    const [formData, setFormData] = useState()

    const handleSubmit = (e) => {

        e.preventDefault()

		setIsLoading(true)
        
        const callSign = flightNumToCallsign(formData);
        const requiredFlight = flights.filter(flight => flight[1] === callSign);
		console.log('searchBar requiredFlight', requiredFlight)
        // console.log('searchBar flights', flights)
        console.log('searchBar callSign', callSign)
        setTrackedFlight(requiredFlight)
        
        if(requiredFlight[0][0].length !== undefined){
            onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res]))   
        }

		if(requiredFlight[0] === undefined){
			console.log('not found')
			return
		}
    
        onFlightTrack(requiredFlight[0][0]).then(res => setTrackedFlight([...requiredFlight, res])) 
		
		setIsLoading(false)
    }


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
		</>

	)
}
