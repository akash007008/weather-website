const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWthc2gwNzA4IiwiYSI6ImNrNGs4a2hmbTA0eGIzZ3JzOHVwYXE0ODIifQ.97_Ybzf5neT2xaGcAHoJPg&limit=1'
    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect with location services..!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find the location.Please try again',undefined)
        }else{
            callback(undefined,{
                longitude : body.features[0].center[1],
                latitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode