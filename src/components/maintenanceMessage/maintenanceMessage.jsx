// import './MaintenanceMessage.css'
import './maintenanceMessage.css'

function MaintenanceMessage() {

    return (
        <div className="maintenance">
            <p>Unfortunately the OpenSky API is currently down and we cannot fetch your flights right now.</p>
            <p>We are currently implementing a workaround to keep TrackAJet running and appreciate your patience while we do so - Thank you!</p>
        </div>

    )
}

export default MaintenanceMessage