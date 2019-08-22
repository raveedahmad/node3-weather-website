const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading..... '
    messageTwo.textContent=''

    fetch('/weather?address='+ encodeURI(location)).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = 'Forecast: '+ data.forecast 
            }
        })
    })
})

document.querySelector('#send-location').addEventListener('click', ()=>{
    if (!navigator.geolocation){
        return alert('Geo location not supported')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude, position.coords.longitude)
        messageOne.textContent='Loading..... '
        messageTwo.textContent=''
    
        fetch('/weather?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((response) =>{
            response.json().then((data) =>{
                if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = 'For your current location.'
                    messageTwo.textContent = 'Forecast: '+ data.forecast 
                }
            })
        })
        // socket.emit('sendLocation', {
        //     lattitude: position.coords.latitude,
        //     longitude: position.coords.longitude
        // }, ()=>{
        //     console.log('Location shared!')
        // })
    })
})