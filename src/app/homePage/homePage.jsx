import './homePage.css'
import {SearchBar} from '../sharedComponents/searchBar/searchBar'

function HomePage( {setTrackedFlight} ) {


    return (
        <main>
            <h1>TrackAJet</h1>
            <SearchBar setTrackedFlight={setTrackedFlight} />

        </main>
    )
}

export { HomePage }