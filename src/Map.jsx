import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api'
import planeIcon from './plane.png'
import './Map.css'

const containerStyle = {
    width: '80vw',
    height: '80vh',
    margin: 'auto',
}


const elonJetCenter = {
    lat: 33.92074,
    lng: -118.32704,
}


const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    paths: [
        { lat: -3.745, lng: -38.523 },
        { lat: -4.7451, lng: -38.523 },
        { lat: -5, lng: -38.523 },
        { lat: -6, lng: -38.523 }
    ]
}

const initialCenter = {
    lat: -3.745,
    lng: -38.523,
}


function Map({ trackedFlight }) {


    const [center, setCenter] = useState(initialCenter)
    const [path, setPath] = useState([])



    useEffect(() => {

        const pathLength = trackedFlight[1].path.length -1


        setPath(trackedFlight[1].path.reduce((acc, curr) => {

            return [...acc, { ["lat"]: curr[1], ["lng"]: curr[2] }]
        }, [])
        )

        setCenter({
            lat: trackedFlight[1].path[pathLength][1],
            lng: trackedFlight[1].path[pathLength][2],
        })

    }, [trackedFlight])


    const handleElonJetClick = () => {
        setCenter(elonJetCenter)
    }

    console.log(trackedFlight[0][0])

	return(

        <>

            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}>
                    <Polyline path={path} options={options} />
                    <Marker
                        position={center}
                        icon={{
                            url: planeIcon,
                            // anchor: new window.google.maps.Point(25, 25),
                    }}/>
                </GoogleMap>

                <button className='elon' onClick={handleElonJetClick}>Fly with Elon!</button>

            </LoadScript>
        
        
        </>



        
    )
}

export default React.memo(Map)