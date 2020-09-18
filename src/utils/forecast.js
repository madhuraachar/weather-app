const request = require('request');

const forecast = (latitude, longitute, callback) => {
        const url = `http://api.weatherstack.com/current?access_key=8102cb175981625f10b57d1f4edc6959&query=${latitude},${longitute}&units=f`
        request({url, json: true }, (error, {body})=>{
        if(error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find loaction", undefined)
        }else {
            const currentWeather = body.current
            callback(undefined, `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degree out. But is feels like ${currentWeather.feelslike} degree out`)
        }
    })
};

module.exports = forecast