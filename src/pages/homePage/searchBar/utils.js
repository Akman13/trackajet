import { getFlightDataByFlightIATA } from '../../../utils/apis/flightlabs_api'
import { getPlansByICAOs, getPlanDataById } from '../../../utils/apis/flightPlanDatabase_api'

async function getFullFlightData(flightIata) {

    const flightData = await getFlightDataByFlightIATA(flightIata).then(res => res['response'][0])

    flightData['planID'] = await getPlansByICAOs(flightData['dep_icao'], flightData['arr_icao']).then(plans => plans[0]['id'])

    flightData['path'] = await getPlanDataById(flightData['planID']).then(plan => plan['route']['nodes'])

    return flightData
}

export { getFullFlightData }