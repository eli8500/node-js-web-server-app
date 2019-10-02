console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('[name="search"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch('/weather?address='+encodeURIComponent(search.value)).then((res)=>{
        res.json().then(data =>{
            if(data.error){
                console.log('Error: ',data.error)
                messageOne.textContent = 'Error: '+data.error
                messageTwo.textContent = ''
            }else{
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
            }
            
        })
    })
})