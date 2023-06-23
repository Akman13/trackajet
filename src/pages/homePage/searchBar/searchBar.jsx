import { useState } from 'react'
import './searchBar.css'

import { getFullFlightData } from './utils'

import { getFlightDataByFlightIATA } from '../../../utils/apis/flightlabs_api'
import { getPlansByICAOs, getPlanDataById } from '../../../utils/apis/flightPlanDatabase_api'

function SearchBar({ setTrackedFlight }) {

	const [formData, setFormData] = useState()
	const [invalidInput, setInvalidInput] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const flightIata = formData;

		try {
			const flightData = await getFullFlightData(flightIata)


			setTrackedFlight(flightData)
			setInvalidInput(false)

		} catch (error) {
			setInvalidInput(true)
		}
	}

	const handleChange = e => {
		setFormData(e.target.value)
	}

	return (
		<section className='flight-search'>
			<form
				onSubmit={handleSubmit}
				onChange={handleChange}>
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
			{invalidInput &&
				<div className='invalid-input'>
					<p>The flight number you have entered could not be found.</p>
					<p>Please ensure the flight number is both valid and for a live flight</p>
				</div>
			}
		</section>
	)
}

export { SearchBar }