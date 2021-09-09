const request = require('request');

const forecast = (latitude,longitud, callback) => {
      const url = 'http://api.weatherstack.com/current?access_key=7cd57209b3a3e0709b4d1fec4c60bcb7&query='+longitud+','+latitude+'&units=m'
      request( {url,json:true}, (error, {body}) => {
            if (error) {
                  callback('Unable to connect to weatherstack, check internet connection', undefined)
            } else if (body.error) {
                  callback('No hay coordenadas especificadas, revisar escritura y orden', undefined)
            } else {
                  const temp = body.current.temperature
                  const description = body.current.weather_descriptions[0]
                  const feelslike = body.current.feelslike
                  const time = body.current.observation_time
                  callback(undefined,description+', actual temperature '+ temp+' celcius at '+time+', feelink like '+feelslike+' celcius.')
            }
      })
}

module.exports = forecast