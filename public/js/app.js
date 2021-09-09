// todo codigo corrido en aqui será corrido en Client Side Javascript. 
// no sera corrido en node js, pues no es posible
// como es corrido en cliente side javascript, es posible usar la API Fectch
// la cual es usada en la mayoria de exploradores modernos.


// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//       response.json().then((data) => {
//             console.log(data)
//       })
// })         

// -------------- main constant or variables from frontend -----------------
const weatherForm = document.querySelector('form') // seleccionando el tag form de la pagina index.hbs
const search = document.querySelector('input')
const messagesOne = document.querySelector('#message-1') //seleccionar el tag con id=message-1
// messagesOne.textContent='From javascript'
const messageTwo = document.querySelector('#message-2') //seleccionar el tag con id=message-1

// ---------- auxiliar function ----------------------
const addressFecth = ((address) =>{ // function to fetch the addres and get the forecast
      fetch('/weather?address='+address).then((response) =>{ // ****Cambio HEROKU (la url)
      response.json().then((data) =>{
            if (data.error) {
                  console.log(data.error)
                  messagesOne.textContent= data.error
                  messageTwo.textContent= '' 
                  return 
            }
            console.log(data.location)
            console.log(data.forecast)
            messagesOne.textContent = data.location  
            messageTwo.textContent = data.forecast

      })
      
}) 
})



// agregando un escuchador de eventos a dicha clase, para ejecutar acciones cuando algo ocurra con esa clase
weatherForm.addEventListener('submit', (event) =>{
      event.preventDefault(); //prevenir que la pagina se refresque inmediatamente, luego de subir el form
      const location = search.value
      messagesOne.textContent= 'Loading...'
      messageTwo.textContent= '...'
      addressFecth(location)

})