const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF2ZWVkYWhtZWQiLCJhIjoiY2p5dG8zamx3MDVxMTNkbXo2ZGM0YmVjZCJ9.v5N3uO9HI3HuaakUFU_sQw&limit=1'
    request({url, json: true},(error, {body}) => {
        if (error){
        callback('Error! Connection failed.', undefined)
        }else if(body.features.length===0){
            callback('Unable to find the location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode