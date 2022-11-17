const { createApp } = Vue

const app = createApp({
    data(){
        return{
            eventos : [],
            pasados : [] ,
            futuro : [],
            nombreEventoAsist : [],
            asistencia : [],
            asistencia2 : [],
            Porcentaje : [],
            attendance : [],
            categoOrdenada : [],
            catego : [],
            categoria : [],
            ganancias : [],
            capacidad : []



          
            }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.eventos = data.events
                this.pasados =  data.events.filter((element) => (element.date < data.currentDate))
                this.futuro = data.events.filter((element) => (element.date > data.currentDate))
                this.eventos.forEach(evento => !this.categoriaFiltrada.includes(evento.category)? this.categoriaFiltrada.push(evento.category): "")
                this.mayorCapacidad(this.eventos)
                this.calcularMenorAudiencia(this.pasados)
                this.calcularMayorAudiencia(this.pasados)
                this.listarTabla(this.futuro, this.tableUP)
                this.listarTabla(this.pasados, this.tableLast)
                console.log(this.Porcentaje)

            })

            .catch(err => console.log(err))
            },
            methods: {
                
            calcularMayorAudiencia(array){
            let asistencia = []
            array.map(evento => asistencia.push(parseFloat(evento.assistance)))
            let mayoresAsist = Math.max(...asistencia)
            const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue;
            })
                this.nombreEventoAsist = this.eventos.find(elemento => ((elemento.assistance) == mayoresAsist))
                console.log(this.nombreEventoAsist)
                this.Porcentaje = ((mayoresAsist * 100) / (TodoSumado)).toFixed(2)
            },
            calcularMenorAudiencia(array){
                let asistencia = []
                array.map(evento => asistencia.push(parseFloat(evento.assistance)))
                let minimo = Math.min(...asistencia)
                
                const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                })
                this.nombreEventoAsist = this.eventos.find(elemento => ((elemento.assistance) == minimo))
                this.Porcentaje = ((minimo * 100) / ( TodoSumado )).toFixed(2)
                },

            mayorCapacidad(array){
                let capacidad = []
                array.map(evento => capacidad.push(parseFloat(evento.capacity)))
                let mayor = Math.max(...capacidad)
                this.nombreEventoAsist = this.eventos.find(elemento => ((elemento.capacity) == mayor))
                },
            listarTabla(array, ubicacion){
                array.forEach(item => !this.catego.includes(item.category)? this.catego.push(item.category) : "") //NO FUNCIONA INCLUDES
                this.categoOrdenada = this.catego.sort()
            },
            revenues(array, valor){
                this.categoria = array.filter(eventos => eventos.category === valor)
                this.ganancias = this.categoria.map(categoria => this.categoria.price * this.categoria.estimate? this.categoria.price * this.categoria.estimate : this.categoria.price * this.categoria.assistance)
                let totalGanancias = this.ganancias.reduce(function (previousValue, currentValue){
                    return previousValue + currentValue;
                })
                return numberFormat2.format(totalGanancias)
            },
            attendancePorcentaje(array, valor){
                this.asistencia = array.filter(eventos => eventos.category === valor)
                this.asistencia2 = this.asistencia.map(eventos => parseFloat(eventos.estimate? eventos.estimate : eventos.assistance))
                this.capacidad = this.asistencia.map(eventos => parseFloat(eventos.capacity))
                const capacidadSumado = capacidad.reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                })
                const todoSumado = this.asistencia2.reduce(function (previousValue, currentValue) {
                    return previousValue + currentValue;
                })
                this.Porcentaje = ((todoSumado * 100) / capacidadSumado).toFixed(3)
                console.log(this.Porcentaje)
                return Porcentaje
            }
                },


})

app.mount('#app')










// let url = "https://amazing-events.herokuapp.com/api/events"
// const mayorPrimero = document.getElementById('mayorPrimero')
// const mayorSegundo = document.getElementById('mayorSegundo')
// const mayorTercero = document.getElementById('mayorTercero')
// const menorPrimero = document.getElementById('menorPrimero')
// const menorSegundo = document.getElementById('menorSegundo')
// const menorTercero = document.getElementById('menorTercero')
// const capacidadPrimero = document.getElementById('capacidadPrimero')
// const capacidadSegundo = document.getElementById('capacidadSegundo')
// const capacidadTercero = document.getElementById('capacidadTercero')
// let categoriaFiltrada = []
// const tableUP = document.getElementById('tableUpcoming')
// const tableLast = document.getElementById('tablepasado')
// const options2 = { style: 'currency', currency: 'USD' };
// const numberFormat2 = new Intl.NumberFormat('en-US', options2);

// traerDatos(url)

// function traerDatos (url){
//     fetch (url)
//         .then(response => response.json())
//             .then(data => {
//                 eventos = data.events
//                 pasados =  data.events.filter((element) => (element.date < data.currentDate))
//                 futuro = data.events.filter((element) => (element.date > data.currentDate))
//                 eventos.forEach(evento => !categoriaFiltrada.includes(evento.category)? categoriaFiltrada.push(evento.category): "")
//                 mayorCapacidad(eventos)
//                 calcularMenorAudiencia(pasados)
//                 calcularMayorAudiencia(pasados)
//                 listarTabla(futuro, tableUP) //listaUpcoming
//                 listarTabla(pasados, tableLast)
                
//             })      
//             .catch(error => console.error(error.message))
// }
// function calcularMayorAudiencia(array){
//     let asistencia = []
//     array.map(evento => asistencia.push(parseFloat(evento.assistance)))
//     let mayoresAsist = Math.max(...asistencia)
//     const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
//         return previousValue + currentValue;
//     })
//         let nombreEventoAsist = eventos.find(elemento => ((elemento.assistance) == mayoresAsist))
//         let Porcentaje = ((mayoresAsist * 100) / (TodoSumado)).toFixed(2)
//             mayorPrimero.innerHTML = `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an attendance of ${Porcentaje} %`
// }
// function calcularMenorAudiencia(array){
//     let asistencia = []
//     array.map(evento => asistencia.push(parseFloat(evento.assistance)))
//     let minimo = Math.min(...asistencia)
    
//     const TodoSumado = asistencia.reduce(function (previousValue, currentValue) {
//         return previousValue + currentValue;
//     })
//     let nombreEventoAsist = eventos.find(elemento => ((elemento.assistance) == minimo))
//     let Porcentaje = ((minimo * 100) / ( TodoSumado )).toFixed(2)
//         menorPrimero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: had an attendance of ${Porcentaje} %`
//     }

// function mayorCapacidad(array){
//     let capacidad = []
//     array.map(evento => capacidad.push(parseFloat(evento.capacity)))
//     let mayor = Math.max(...capacidad)
//     let nombreEventoAsist = eventos.find(elemento => ((elemento.capacity) == mayor))
//             capacidadPrimero.innerHTML += `<span>${nombreEventoAsist.name.toUpperCase()}</span>: with a capacity of ${nombreEventoAsist.capacity} people`
//     }
// function listarTabla(array, ubicacion){
//     catego = []
//     array.forEach(item => !catego.includes(item.category)? catego.push(item.category) : "")
//     let categoOrdenada = catego.sort()
//     categoOrdenada.forEach(eventos=>{
//         let lista = document.createElement('tr')
//         lista.innerHTML = `<td>${eventos}</td>
//         <td class="text-start">${revenues(array, eventos)}</td>
//         <td class="text-start">${attendancePorcentaje(array, eventos)}%</td>`
//         ubicacion.appendChild(lista)
//     })
// }
// function revenues(array, valor){
//     categoria = array.filter(eventos => eventos.category === valor)
//     ganancias = categoria.map(categoria => categoria.price * categoria.estimate? categoria.price * categoria.estimate : categoria.price * categoria.assistance)
//     totalGanancias = ganancias.reduce(function (previousValue, currentValue){
//         return previousValue + currentValue;
//     })
//     return numberFormat2.format(totalGanancias)
// }
// function attendancePorcentaje(array, valor){
//     asistencia = array.filter(eventos => eventos.category === valor)
//     asistencia2 = asistencia.map(eventos => parseFloat(eventos.estimate? eventos.estimate : eventos.assistance))
//     capacidad = asistencia.map(eventos => parseFloat(eventos.capacity))
//     const capacidadSumado = capacidad.reduce(function (previousValue, currentValue) {
//         return previousValue + currentValue;
//     })
//     const todoSumado = asistencia2.reduce(function (previousValue, currentValue) {
//         return previousValue + currentValue;
//     })
//     let Porcentaje = ((todoSumado * 100) / capacidadSumado).toFixed(3)
//     return Porcentaje
// }