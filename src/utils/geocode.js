const request = require('request');

const geocode =(address, callback) => {
      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZXN0ZWZyYW5jbzI5MDkiLCJhIjoiY2t0OGkyam16MTJzejJxcDRtN2VpbjhwcCJ9.bom4TAfjI-_26p1xXCaohg&limit=1'
      request({url, json:true}, (error, {body}) => {
            if (error) {
                  callback('Unable to connect to location geocode service!', undefined)
            } else if (body.error) {
                  callback('unkown response or invalid parsed parameters for geocoding', undefined)
            } else if (body.message) {
                  callback('Geocoding message: '+ body.message, undefined)
            // } else if ( response.statusCode !== 200){
            //       callback('response status = '+ response.statusCode+' Bad request')
            } else if (body.features.length === 0){
                  callback('Unable to find location, try another search',undefined)
            } else {
                  const data = body.features[0].center
                  const place = body.features[0].place_name
                  callback(undefined, {
                        latitude:data[0],
                        longitude:data[1],
                        place_name:decodeURIComponent(place)
                  })
            }
      })

}

module.exports = geocode