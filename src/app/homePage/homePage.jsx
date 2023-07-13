import './homePage.css'
import {SearchBar} from '../sharedComponents/searchBar/searchBar'

function HomePage( {setTrackedFlight} ) {

    const homePageStyle = {
        'color': '#424245',
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        'height': '100vh',
        'font-family': 'SF Pro Text,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif',
        'background-color': '#f5f5f7',
    }


    return (
        <main style={homePageStyle}>
            <h1>TrackAJet</h1>
            <SearchBar setTrackedFlight={setTrackedFlight} />

        </main>
    )
}

export { HomePage }