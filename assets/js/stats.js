const { createApp } = Vue

const app = createApp({
    data(){
        return{
            eventos : [],
            pasados : [] ,
            futuro : [],
            nombreEventoAsist : [],
            nombreEventoAsistMenor : [],
            nombreCapacidad : [],
            PorcentajeMenor : [],
            asistencia : [],
            asistencia2 : [],
            Porcentaje : [],
            attendance : [],
            categoOrdenada : [],
            catego : [],
            categoria : [],
            ganancias : [],
            capacidad : [],
            filtrado : [],
            categoriaFiltrada : []
            }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.eventos = data.events
                this.pasados =  data.events.filter((element) => (element.date < data.currentDate))
                this.futuro = data.events.filter((element) => (element.date > data.currentDate))
                this.filtrado = this.eventos.forEach(evento => !this.categoriaFiltrada.includes(evento.category)? this.categoriaFiltrada.push(evento.category): "")
                this.mayorCapacidad(this.eventos)
                this.calcularMayorAudiencia(this.pasados)
                this.calcularMenorAudiencia(this.pasados)
                // this.listarTabla(this.futuro, this.tableUP)
                // this.listarTabla(this.pasados, this.tableLast)

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
                this.nombreEventoAsistMenor = this.eventos.find(elemento => ((elemento.assistance) == minimo))
                this.PorcentajeMenor = ((minimo * 100) / ( TodoSumado )).toFixed(2)
                },

            mayorCapacidad(array){
                let capacidad = []
                array.map(evento => capacidad.push(parseFloat(evento.capacity)))
                let mayor = Math.max(...capacidad)
                this.nombreCapacidad = this.eventos.find(elemento => ((elemento.capacity) == mayor))
                },
            // listarTabla(array, ubicacion){
            //     array.forEach(item => !this.catego.includes(item.category)? this.catego.push(item.category) : "") //NO FUNCIONA INCLUDES
            //     this.categoOrdenada = this.catego.sort()
            // },
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