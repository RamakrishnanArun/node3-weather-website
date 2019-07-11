const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/802a893c448de08093a0fc5fd69b4ee9/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&exclude=minutely,hourly,flags'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback({error: 'Unable to connect to weather service.'}, undefined)
        } else if (body.error) {
            callback({error: body.error}, undefined)
        } else {
            const summary = body.daily.data[0].summary
            const temperature = body.currently.temperature
            const rainChance = body.currently.precipProbability * 100
            const humidity = body.currently.humidity * 100
            const daySummary = summary + " The temperature is currently " + temperature + "C with a " + rainChance + "% chance of rain." + "The humidity is " + humidity + "%."
            callback(undefined, {
                summary,
                temperature,
                rainChance,
                humidity,
                daySummary 
            })
        }
    })
}

module.exports = {
    forecast: forecast
}
