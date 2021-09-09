const request = require('request');

const forecast = (latitude,longitud, callback) => {
      const url = 'http://api.weatherstack.com/current?access_key=7cd57209b3a3e0709b4d1fec4c60bcb7&query='+longitud+','+latitude+'&units=m'
      request( {url,json:true}, (error, {body}) => {
            if (error) {
                  callback('Unable to connect to weatherstack, check internet connection', undefined)
            } else if (body.error) {
                  callback('No hay coordenadas especificadas, revisar escritura y orden', undefined)
            } else {
                  const {temperature,description,
                        feelslike,time,pressure,
                        visibility,observation_time, weather_descriptions} = body.current
                  const {country,region} = body.location
                  callback(undefined,
                        'It is '+ weather_descriptions[0]+' in '+region+'-'+country+
                        ', actual temperature '+ temperature+'°C and feelslike '+feelslike+'°C at '
                         +observation_time+'.  '+visibility+' km visibilty.')
            }
      })
}
// forecast(122,45, (error, forecastdata)=>{
//       if (error){
//             console.log(error)
//       } else {
//             console.log(forecastdata)
//       }
// })
module.exports = forecast