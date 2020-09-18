const request = require('request');

const geocode = (address, callback) => {
    //encodeURIComponent() ---- special character ex ? becomea %3F
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFkaHVyYS1hY2hhcnlhIiwiYSI6ImNrY3NxZDVsdDE4YXkyeG9jOXoza2ZwYTUifQ.SJoMaVvF-kPKj8dkZZ2Ifw&limit=1`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find loaction. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode