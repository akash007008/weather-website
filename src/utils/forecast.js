const request=require('request')
const forecast = (longitude,latitude,callback) => {
    const url = 'https://api.darksky.net/forecast/af738cd090e8d30988120447f588faab/'+longitude+','+latitude+'?units=si'
    request({url, json : true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services..!',undefined)
        }else if(body.error){
            callback('Unable to fetch location. Please Try Again',undefined)
        }else{
            callback(undefined,body.daily.summary+' The current temprature is '+body.currently.temperature +' degrees and '+body.currently.precipProbability+'% chances of rain.')
        }
    })
}

module.exports = forecast