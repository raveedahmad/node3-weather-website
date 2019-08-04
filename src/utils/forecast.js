const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/cf5f4d5b924a76161e7838a97a6f00aa/'+latitude+','+longitude+'?units=si'
    
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Error! Connection failed.', undefined)
        }else if(body.error){
            callback('Unable to find the location.', undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast