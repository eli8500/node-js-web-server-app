const request = require('request')
const geocode = (address,callback)=>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZWxpODUwMCIsImEiOiJjanV4ZWJjdDUwNTg1NDNtYXRvamZwc2M1In0.VLFXlT_lGg_cAGPEXBNMyg';
    request({url:geocodeUrl,json:true},(error,{body})=>{
        if(error){
            callback('Error connect to  geocode api', undefined)
        }else if(body.message){
            callback('Error in geocode api: ' + response.body.message, undefined)
        }else if(body.features.length == 0 ){
            callback('Error in geocode api: unable to find location', undefined)
        }else{
            const lat = body.features[0].center[1]
            const lng = body.features[0].center[0]
            const location = body.features[0].place_name
            
            callback(undefined , {lat,lng,location})
        }
    
    })
}

module.exports = geocode