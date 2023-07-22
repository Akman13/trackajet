import './homePage.css'
import { SearchBar } from '../sharedComponents/searchBar/searchBar'
import { GlobalFlights } from './globalFlights/globalFlights'
import { useEffect, useState } from 'react'
/* TODO:
Create a carousel/slider component to display the flight cards
Consider pushing this down into FlightCards, and passing to it the prop of isSmallScreen from here */

function HomePage({ setTrackedFlight }) {


    const homePageStyle = {
        'color': '#424245',
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        'height': '100vh',
        'font-family': 'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
        'background-color': '#f5f5f7',
        'padding-top': '9.3em'
    }


    return (
        <main style={homePageStyle}>
            <h1>TrackAJet</h1>
            <SearchBar setTrackedFlight={setTrackedFlight} />
            <GlobalFlights setTrackedFlight={setTrackedFlight} />
        </main>
    )
}

export { HomePage }