const url = "https://moviestack.onrender.com/api/movies/"
const key = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const option = {
    headers: {
        'X-API-KEY': key
    }
}

const { createApp } = Vue
const optionsVue = {
    data() {
        return {
            id: null,
            movie: [],
        }
    },
    beforeCreate(){
        const search = location.search
        const params = new URLSearchParams(search)
        this.id = params.get('id')
        fetch (url+this.id, option)
          .then(response => response.json())
          .then (data => {
            this.movie = data
            console.log(this.movie)
          })
            .catch(error => console.log(error))



    },

}


const app = createApp(optionsVue)
app.mount('#app')
