import { getFlightDataByFlightIATA } from '../../../utils/apis/flightlabs_api'
import { getPlansByICAOs, getPlanDataById } from '../../../utils/apis/flightPlanDatabase_api'
import { getFlightTrack } from '../../../utils/apis/opensky_api'

async function getFullFlightData(flightIata) {

    const flightData = await getFlightDataByFlightIATA(flightIata).then(res => res['response'][0])

    try {

        flightData['planID'] = await getPlansByICAOs(flightData['dep_icao'], flightData['arr_icao']).then(plans => plans[0]['id'])

        flightData['path'] = await getPlanDataById(flightData['planID']).then(plan => plan['route']['nodes'])

    } catch (error) {

        const openSkyPath = await getFlightTrackData(flightData['hex'])
        console.log('openSkyPath', openSkyPath)

        flightData['path'] = openSkyPath['path'].map(waypoint => ({ lat: waypoint[1], lon: waypoint[2] }))

    }


    return flightData
}

async function getFlightTrackData(icaoHex) {
    return await getFlightTrack(icaoHex.toLowerCase())
}

export { getFullFlightData }