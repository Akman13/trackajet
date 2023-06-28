import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api'

import planeIcon from '../../../assets/plane.png'
import './map.css'

const containerStyle = {
    width: '100vw',
    height: '100vh',
    margin: 'auto',
}

const traversedPathOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#FF0000',
}

const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 3,
    strokeColor: "red"
};

const unTraversedPathOptions = {
    icons: [{
        icon: lineSymbol,
        offset: "0",
        repeat: "18px"
    }],
    strokeColor: '#ffffff00',
    strokeOpacity: 1,
    strokeWeight: 2,
}

const initialCenter = {
    lat: -3.745,
    lng: -38.523,
}

const elonJetCenter = {
    lat: 33.92074,
    lng: -118.32704,
}

function Map({ trackedFlight }) {
    const [center, setCenter] = useState(initialCenter)
    const [traversedPath, setTraversedPath] = useState([])
    const [unTraversedPath, setUntraversedPath] = useState([])



    useEffect(() => {
        const pathProximities = trackedFlight['path'].map((node, index) => Math.sqrt((node['lat'] - trackedFlight['lat']) ** 2 + (node['lon'] - trackedFlight['lng']) ** 2))
        // console.log('maps trackedFlight', trackedFlight)

        const nearestNodeIndex = pathProximities.indexOf(Math.min(...pathProximities))

        // console.log('nearestNodeIndex', nearestNodeIndex)

        setCenter({
            lat: trackedFlight['path'][nearestNodeIndex]['lat'],
            lng: trackedFlight['path'][nearestNodeIndex]['lon']
        })

        // Want to split the path array at the nearestNodeIndex point
        const traversedPath = trackedFlight['path'].slice(0, nearestNodeIndex + 1)
        const unTraversedPath = trackedFlight['path'].slice(nearestNodeIndex)

        setTraversedPath(traversedPath.reduce((acc, curr) => {
            return [...acc, { ["lat"]: curr['lat'], ["lng"]: curr['lon'] }]
        }, []))

        setUntraversedPath(unTraversedPath.reduce((acc, curr) => {
            return [...acc, { ["lat"]: curr['lat'], ["lng"]: curr['lon'] }]
        }, []))

    }, [trackedFlight])


    return (

        <>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>

                <GoogleMap
                    options={{
                        mapTypeControl: false
                    }}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}>

                    <Polyline path={unTraversedPath} options={unTraversedPathOptions} />
                    <Polyline path={traversedPath} options={traversedPathOptions} />

                    <Marker
                        position={center}
                        icon={{
                            url: planeIcon,
                        }} />

                </GoogleMap>

            </LoadScript>
        </>
    )
}

export default React.memo(Map)