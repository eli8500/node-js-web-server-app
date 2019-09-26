const request = require('request')
const forecast = (lat,lng, callback)=>{
        let url = 'https://api.darksky.net/forecast/381a2f118254407cc2ac1d3b279e7575/'
        url+=lat + ',' + lng
        url+='?units=si&lang=en'

        request({url,json:true},(error, {body})=>{
            if(error){
                callback('Error connect to  weather api' + error, undefined)
            }else if(body.error){
                callback('Error in weather api: ' + body.error, undefined)
            }else{
                const currently = body.currently
                const str = body.daily.data[0].summary + ' It\'s is currently '+ currently.temperature + ' degrees out. There is a '+currently.precipProbability+'% of change of rain.'
                callback(undefined, str)
            }
        })
}

module.exports = forecast