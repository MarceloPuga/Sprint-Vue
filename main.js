const url = `https://moviestack.onrender.com/api/movies/`;
const apiKey = `0ff70d54-dc0b-4262-9c3d-776cb0f34dbd`;
const { createApp } = Vue;

const options = {
  headers: {
    "x-api-key": apiKey,
  },
};
const opt = {
  data() {
    return {
      movies: [],
      generos: [],
      search: "",
      select: "all",
      moviesFiltrados: [],
      favoritos: [],
     
    };
  },

  beforeCreate() {

     
    fetch(url, options)
      .then((res) => res.json())
      .then((info) => {
        
        this.movies = info.movies
        this.moviesFiltrados = this.movies
        this.generos = [...new Set(this.movies.map(movie => (movie.genres)).flat())]
        this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
       console.log(this.favoritos)
      })

      .then((Error) => console.log(Error));
  },

  methods:{
filtrarPorTitulo(event){
this.search = event.target.value
console.log(this.search)
  this.filtrar()
},
filtrarPorGenero(event){
  this.select = event.target.value
  
  this.filtrar()
},
filtrar(){
const filtrado = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase()) && ( this.select == "all" || (movie.genres.includes(this.select) )))
this.moviesFiltrados = filtrado
},
addFavs(id) {

  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  if (!favoritos.includes(id)) {
      this.favoritos.push(id)
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
  }
  else {
      this.favoritos = this.favoritos.filter(movie => movie !== id)
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos))
  }

},
  },
  create() { },
};



const app = createApp(opt);
app.mount("#app");
