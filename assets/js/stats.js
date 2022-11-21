const { createApp } = Vue

const app = createApp({
    data(){
        return{
            eventos : [],
            nuevoArrayEventos : [],
            currentDate : [],
            fecha : '',
            eventosComing : [],
            eventosPast : [],
            categoriasUpComing : [],
            categoriasSinRepetir : [],
            objetosComingTabla : [],
            objetosPastTabla : [],
            calcularPorcentajeMayor : [],
            calcularPorcentajeMenor : [],
            capacidadMayor : []
            
            }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.currentDate = data.currentDate
                this.eventos = data.events
                this.fecha = data.currentDate
                this.crearNuevoObjeto(this.eventos)
                this.eventosComing = this.nuevoArrayEventos.filter(item => item.estimate)
                this.eventosPast = this.nuevoArrayEventos.filter(item => item.assistance)
                this.categoriasUpcoming = Array.from(new Set(this.eventosComing.filter(evento => evento.category).map(evento => evento.category)))
                this.categoriasPast = Array.from(new Set(this.eventosPast.filter(evento => evento.category).map(evento => evento.category)))
                this.objetoCategoriasUpcoming()
                this.objetoCategoriasPast()
                this.tablaPrincipio()
                this.calcularPorcentajeMayor = this.nuevoArrayEventos.find(e => e.name == this.porcentajeMayorAsistencia)
                this.calcularPorcentajeMenor = this.nuevoArrayEventos.find(e => e.name == this.porcentajeMenorAsistencia)
                this.capacidadMayor = this.nuevoArrayEventos.find(e => e.name == this.mayorCapacidad)
                console.log(this.calcularPorcentajeMayor)
            })
            .catch(err => console.log(err))
            },
            methods: {
                crearNuevoObjeto(array){
                    
                    this.nuevoArrayEventos = array.map(evento => {
                        let aux
                        if(evento.estimate){
                            return aux = {
                                category : evento.category,
                                name : evento.name,
                                date : evento.date,
                                estimate : evento.estimate,
                                price : evento.price,
                                image : evento.image,
                                description : evento.description,
                                capacity : evento.capacity,
                                _id : evento._id,
                                place : evento.place,
                                porcentaje : evento.estimate * 100 / evento.capacity,
                                revenues : evento.estimate * evento.price
                            }
                        }else{
                            return aux = {
                                category : evento.category,
                                name : evento.name,
                                date : evento.date,
                                assistance : evento.assistance,
                                price : evento.price,
                                image : evento.image,
                                description : evento.description,
                                capacity : evento.capacity,
                                _id : evento._id,
                                place : evento.place,
                                porcentaje : evento.assistance * 100 / evento.capacity,
                                revenues : evento.assistance * evento.price
                            }
                        }
                    })
                },
                objetoCategoriasUpcoming(){
                    this.objetosComingTabla = this.categoriasUpcoming.map(event =>{
                        let aux;
                        return aux = {
                            category : event,
                            revenues : this.eventosComing.filter(e => e.category == event).map(element => element.revenues).reduce((actual, total) => actual += total, 0),
                            estimate : this.eventosComing.filter(e=> e.estimate),
                            capacity : this.eventosComing.filter(e => e.capacity),
                            porcentaje : this.eventosComing.map(e => e.assistance * 100 / e.capacity)
                        }
                    })
                    
                },
                objetoCategoriasPast(){
                    this.objetosPastTabla = this.categoriasPast.map(event =>{
                        let aux;
                        return aux = {
                            category : event,
                            revenues : this.eventosPast.filter(e => e.category == event).map(element => element.revenues).reduce((actual, total) => actual += total, 0),
                            assistance : this.eventosPast.filter(e=> e.assistance),
                            capacity : this.eventosPast.filter(e => e.capacity),
                        }
                    })
                },
                tablaPrincipio(){
                    this.porcentajeMayorAsistencia = this.nuevoArrayEventos.filter(e => e.date < this.currentDate).filter(e => e.porcentaje).sort( (a,b) => b.porcentaje - a.porcentaje ).map(e => e.name).slice(0,1)
                    this.porcentajeMenorAsistencia = this.nuevoArrayEventos.filter(e => e.date < this.currentDate).filter(e => e.porcentaje).sort( (a,b) => b.porcentaje - a.porcentaje ).map(e => e.name).slice(-1)
                    this.mayorCapacidad = this.nuevoArrayEventos.filter(e => e.capacity).sort( (a,b) => b.capacity - a.capacity ).map(e => e.name).slice(0,1)
                }
            }
    })

app.mount('#app')