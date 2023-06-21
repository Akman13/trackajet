// import './MaintenanceMessage.css'
import './maintenanceMessage.css'

function MaintenanceMessage() {

    return (
        <div className="maintenance">
            <p>Unfortunately the OpenSky API is currently down and we cannot fetch your flights today.</p>
            <p>We appreciate your patience while we investigate alternative APIs - Thank you!</p>
        </div>

    )
}

export default MaintenanceMessage