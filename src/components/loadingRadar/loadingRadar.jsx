import { Rings } from 'react-loader-spinner'
import './loadingRadar.css'

function LoadingRadar() {


    return (
        <div className="loading">
            <section className="loading-text">
                <p>Fetching local flights</p>
                <span className="dot1">.</span>
                <span className="dot2">.</span>
                <span className="dot3">.</span>
            </section>
            <Rings
                height="100%"
                width="100%"
                color="#4fa94d"
                radius="2"
                wrapperClass="radar"
                visible={true}
                ariaLabel="rings-loading"
            />
        </div>
    )
}

export default LoadingRadar