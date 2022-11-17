const { createApp } = Vue

const app = createApp({
    data(){
        return{
            filtradosPast : [],
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
                this.filtradosPast =  data.events.filter((element) => (element.date < data.currentDate))
                this.categoriasInput = this.filtradosPast
                this.filtrarCategorias()
                // this.buscarInput()
            })

            .catch(err => console.log(err))
            },
            methods: {

            filtrarCategorias(){
            let fn = (categoria) => categoria.category
            this.categoriasFiltradas = [...new Set((this.filtradosPast.filter(fn).map((fn))))]
                },

            buscarInput(){
                this.categoriasInput = this.filtradosPast.filter( evento => evento.name.toLowerCase().trim().includes( this.busquedaArea.toLowerCase().trim() ) )
                }
    },
    computed:{
        filtrar(){
            const filtrarConChecked = this.filtradosPast.filter( evento => this.checked.includes( evento.category ) || this.checked.length === 0)
            this.categoriasInput = filtrarConChecked.filter( evento => evento.name.toLowerCase().trim().includes(this.busquedaArea.toLowerCase().trim()))
    }
}

})

app.mount('#app')