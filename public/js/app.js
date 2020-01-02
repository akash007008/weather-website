const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const messageFour = document.getElementById('message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const url ='/weather?address='+search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch(url).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent =data.forecast
            console.log(data)
            messageThree.textContent =data.high
            messageFour.textContent =data.low
        }
    })
})
})