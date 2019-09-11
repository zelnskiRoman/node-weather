const request = require('request');

const geoCode = (adress, callback) => {
    const urlLocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiemVsbnNraSIsImEiOiJjano4ZnlwczcwMjV5M2tsbDVhYXVtaHc5In0.FxAejTbxH4Olna_7Tx8L1w`
    //console.log(urlLocation)
    request({
        url: urlLocation,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (response.body.message) {
            callback('Unable to connect to location services!')
        } else if (response.body.features.length === 0) {
            callback('Cannot find yur location!')
        } else {
            const first = response.body.features[0].center[1];
            const second = response.body.features[0].center[0];
            const location = response.body.features[0].place_name
            //console.log(first, second, location)
            callback(undefined, first, second, location)
        }
    })
}

const weather = (error, first = undefined, second = undefined, location = undefined, callback = undefined) => {
    //console.log(first, second, location)
    if (error) {
        callback(error, undefined, undefined)
    } else {
        const url = `https://api.darksky.net/forecast/feab6e140081013df75e7b9061dca3c8/${first},${second}?lang=ru&units=si`

        request({
            url: url,
            json: true
        }, (error, response) => {
            if (error) {
                callback('Unable to fetch data!', undefined, undefined)
            } else if (response.body.error) {
                callback('Unable to find location', undefined, undefined)
            } else {
                callback(undefined, response.body.currently, location)
            }
        });
    }
}

module.exports = {
    geoCode,
    weather
}