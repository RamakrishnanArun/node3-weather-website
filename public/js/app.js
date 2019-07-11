const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ""
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    // Don't allow the submit to reload the page (default behaviour)
    e.preventDefault()
    const searchLocation = search.value

    messageOne.textContent = "Searching ..."
    messageTwo.textContent = ""
    
    fetch('http://localhost:3000/weather?address=' + searchLocation).then((response) => {
    response.json().then( ( data ) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.daySummary
        }
    })
})
})
