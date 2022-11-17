const { createApp } = Vue

const app = createApp({
    data(){
        return{
            eventosHome : [],
            categoriasFiltradas : [] ,
            categoriasInput : [],
            checked : [],
            busquedaArea : ''
          
            }
    },
    created(){
        fetch('https://amazing-events.herokuapp.com/api/events')
            .then(response => response.json())
            .then(data => {
                this.eventosHome = data.events
                this.categoriasInput = data.events
                this.filtrarCategorias()
                // this.buscarInput()
            })

            .catch(err => console.log(err))
            },
            methods: {

            filtrarCategorias(){
            let fn = (categoria) => categoria.category
            this.categoriasFiltradas = [...new Set((this.eventosHome.filter(fn).map((fn))))]
                },

            buscarInput(){
                this.categoriasInput = this.eventosHome.filter( evento => evento.name.toLowerCase().trim().includes(this.busquedaArea.toLowerCase().trim()))
                }
    },
    computed:{
        filtrar(){
            const filtrarConChecked = this.eventosHome.filter( evento => this.checked.includes( evento.category ) || this.checked.length === 0)
            this.categoriasInput = filtrarConChecked.filter( evento => evento.name.toLowerCase().trim().includes(this.busquedaArea.toLowerCase().trim()))
    }
}

})

app.mount('#app')


