const { createApp } = Vue

const app = createApp({
    data(){
        return{
            eventos : [],
            queryString : undefined,
            params : undefined,
            id : undefined,
            buscarId : undefined,

            }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
              this.eventos = data.events
              this.buscarIdF()
              
              
            })

            .catch(err => console.log(err))
            },
            methods: {
              buscarIdF(){
                this.queryString = location.search 
                this.params = new URLSearchParams(this.queryString)
                this.id = this.params.get("id")
                this.buscarId = this.eventos.find(eventos => (eventos._id == this.id))
              }

                }

})

app.mount('#app')













// let url = "https://amazing-events.herokuapp.com/api/events"

// traerDatos(url)

// function traerDatos (url){
//   fetch (url)
//       .then(response => response.json())
//           .then(data => {
//               let eventos = data.events
//               const queryString = location.search 
//               const params = new URLSearchParams(queryString)
//               const id = params.get("id")
//               const buscarId = eventos.find(eventos => (eventos._id == id))
//               eventosHome = data.events
//               categorias = eventosHome
//               crearDetalles(buscarId)
//           })      

//           .catch(error => console.error(error.message))
// }

// function crearDetalles(buscarId) {
//         let contenedorDetails = document.getElementById("contenedorDetails")
//         if(buscarId.assistance !== undefined){
//           contenedorDetails.className = 'card mb-3'
//           contenedorDetails.innerHTML =`<div class="row g-0 ">
//           <div class="col-md-4 ">
//             <img src="${buscarId.image}" class="img-fluid rounded-start d-placeholder-img" style="width: 400px ; height: 200px" alt="${buscarId.name}">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h2 class="card-title">${buscarId.name}</h2>
//               <div><span>${buscarId.category} ~ </span><span class = "fecha">${buscarId.date}</span></div>
//               <ul>
//                 <li><span>Place: <span class="numeros">${buscarId.place}</span></span></li>
//                 <li><span>Capacity: <span class="numeros">${buscarId.capacity}</span></span></li>
//                 <li><span>Assistance: <span class="numeros">${buscarId.assistance}</span></span></li>
//               </ul>
//               <p class="card-text descripcion">${buscarId.description}</p>
//               <p class="card-text"><small class="text-muted">Price: <span class = "dolar">$</span><span class = "numeros">${buscarId.price}</span></small></p>
//             </div>
//           </div>
//         </div>`
//         }else{
//           contenedorDetails.className = 'card mb-3'
//           contenedorDetails.innerHTML =`<div class="row g-0 ">
//           <div class="col-md-4 ">
//             <img src="${buscarId.image}" class="img-fluid rounded-start d-placeholder-img" style="width: 400px ; height: 200px" alt="${buscarId.name}">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h2 class="card-title">${buscarId.name}</h2>
//               <div><span>${buscarId.category} ~ </span><span class = "fecha">${buscarId.date}</span></div>
//               <ul>
//                 <li><span>Place: <span class="numeros">${buscarId.place}</span></span></li>
//                 <li><span>Capacity: <span class="numeros">${buscarId.capacity}</span></span></li>
//                 <li><span>Estimate: <span class="numeros">${buscarId.estimate}</span></span></li>
//               </ul>
//               <p class="card-text">${buscarId.description}</p>
//               <p class="card-text"><small class="text-muted">Price: <span class = "dolar">$</span><span class = "numeros">${buscarId.price}</span></small></p>
//             </div>
//           </div>
//         </div>`
//         }
//       console.log(buscarId.assistance)
//     return contenedorDetails
// }