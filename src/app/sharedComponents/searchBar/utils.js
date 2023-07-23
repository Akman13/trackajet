import { getFlightDataByFlightIATA, getNewDataByFlightIATA } from '../../../utils/apis/airlabs_api'
import { getPlansByICAOs, getPlanDataById } from '../../../utils/apis/flightPlanDatabase_api'
import { getFlightTrack } from '../../../utils/apis/opensky_api'

async function getFullFlightData(flightIata) {
    // const flightData = await getFlightDataByFlightIATA(flightIata).then(res => res['response'][0])
    const flightData = await getNewDataByFlightIATA(flightIata).then(res => res['response'])

    try {

        flightData['planID'] = await getPlansByICAOs(flightData['dep_icao'], flightData['arr_icao']).then(plans => plans[0]['id'])

        flightData['path'] = await getPlanDataById(flightData['planID']).then(plan => plan['route']['nodes'])
        
        const numerator = ( (Date.now() / 1000) - flightData.dep_estimated_ts || flightData.dep_actual_ts )
        const denominator = (flightData.arr_estimated_ts || flightData.arr_actual_ts) - (flightData.dep_estimated_ts || flightData.dep_actual_ts)
        const percentTravelled = 100 * numerator / denominator
        flightData['percentCalculated'] = percentTravelled

        const timeRemainingMins = Math.floor(((flightData.arr_estimated_ts || flightData.arr_time_ts) - (Date.now() / 1000)) / 60)
        const timeRemainingString = Math.floor(timeRemainingMins % 60) == 0 ? `${timeRemainingMins / 60}hr` : `${Math.floor(timeRemainingMins / 60)}hr and ${Math.floor(timeRemainingMins - Math.floor(timeRemainingMins / 60)*60)}min`
        flightData['timeRemainingString'] = timeRemainingString
        // console.log('timeRemainingString', flightData['timeRemainingString'])

    } catch (error) {

        const openSkyPath = await getFlightTrackData(flightData['hex'])
        // console.log('openSkyPath', openSkyPath)

        flightData['path'] = openSkyPath['path'].map(waypoint => ({ lat: waypoint[1], lon: waypoint[2] }))

    }

    if (flightData['status'] !== 'en-route') throw new Error('This flight is yet to take off.')

    return flightData
}

async function getFlightTrackData(icaoHex) {
    return await getFlightTrack(icaoHex.toLowerCase())
}

export { getFullFlightData, getNewDataByFlightIATA }