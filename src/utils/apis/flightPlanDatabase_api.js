function getPlansByICAOs(depIcao, arrIcao) {
    const url = `https://api.flightplandatabase.com/search/plans?fromICAO=${depIcao}&toICAO=${arrIcao}&sort=popularity`

    const config = {
        method: 'GET',
        API_KEY: process.env.REACT_APP_FLIGHTPLAN_API_KEY
    }

    return fetch(url, config).then(res => res.json())
}

function getPlanDataById(id) {
    const url = `https://api.flightplandatabase.com/plan/${id}`

    const config = {
        method: 'GET',
        API_KEY: process.env.REACT_APP_FLIGHTPLAN_API_KEY
    }

    return fetch(url, config).then(res => res.json())
}

export { getPlansByICAOs, getPlanDataById }