const request = require('request')

const search = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFtYWtyaXNobmFuYXJ1biIsImEiOiJjang2MzQ3dTYwN3JqNDRuMmJhNDBsOXF6In0.jUYA1zX6AVGWnh3F7DWrAQ&limit=1'
    request({ url: url, json: true }, (error, { body: { features } }) => {
      if (error) {
        callback({ error: "Unable to connect to location service" }, undefined)
      } else if (features.length === 0) {
        callback({ error: "Unable to find location" }, undefined)
      } else {
        callback(undefined, {
          longitude: features[0].center[0],
          latitude: features[0].center[1],
          location: features[0].place_name
        })
      }
    });
}

module.exports = {
    search: search
}
