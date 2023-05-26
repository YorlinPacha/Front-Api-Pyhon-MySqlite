let app = Vue.createApp({
  data() {
      return {
        id: undefined,
        city: undefined,
        image: undefined,
        temperature: undefined,
        rain_probability: undefined,
        isError: undefined,
        isLoading: false ,
        response: undefined,  
        data: undefined,
        cities: [], // Agrega la propiedad "cities" para almacenar las opciones del select
      }
    },
    mounted() {
      this.getAllCity(); // Llama automáticamente a la función getAllCity al cargar la página
    },
  methods: {
 async getAllCity() {
      console.log("***ENTRAR A ALL");
      this.isLoading = true;
      this.isError = false;
      const url = "http://127.0.0.1:5000/cities/";
      const response = await fetch(url);
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("***Todas Cities", data);
        console.log("***Data index 1", data);

        // Limpiar la lista de opciones antes de agregar las nuevas opciones
        this.cities = [];
    
        // Recorrer los datos obtenidos y agregar cada objeto ciudad a la lista de opciones
        data.forEach(city => {
          this.cities.push(city);
        });
        console.log("*#*#* cities", this.cities[3][3]);  
        
        
      } else {
        this.isError = true;
      }
      this.isLoading = false;
      
    },
  async CreateCity() {
        const url = 'http://localhost:5000/cities';
        this.isError = false
        this.isLoading = true
        const response = await fetch(url, {
                                  method: 'POST',
                                  headers: {'Content-Type': 'application/json'},
                                  body: `{"id":"${this.id}", "name":"${this.name}", "temperature": ${this.temperature}, "rain_probability": ${this.rain_probability}}`
                                })
                               .catch((e) => {
                                 console.log('****ERROR', e)
                                 this.isLoading = false
                                 this.isError = true
                               })    
        this.isLoading = false
        if (!this.isError && response?.ok) {
          location.reload();
        } else {
          this.isError = true
        }
     },
  async DeleteCity(id) {
        const url = 'http://localhost:5000/cities/'+this.id;
        this.isError = false
        this.isLoading = true
        const response = await fetch(url, {
                                  method: 'DELETE',
                                  headers: {'Content-Type': 'application/json'}
                                })
                               .catch((e) => {
                                 console.log('****ERROR', e)
                                 this.isLoading = false
                                 this.isError = true
                               })    
        this.isLoading = false
        if (!this.isError && response?.ok) {
          location.reload();
        } else {
          this.isError = true
        }
      },
  async UpdateCity() {
        const url = 'http://localhost:5000/cities/'+this.id;
        this.isError = false
        this.isLoading = true
        const response = await fetch(url, {
                                  method: 'PUT',
                                  headers: {'Content-Type': 'application/json'},
                                  body: `{"id":"${this.id}", "name":"${this.name}", "temperature": ${this.temperature}, "rain_probability": ${this.rain_probability}}`
                                })
                               .catch((e) => {
                                 console.log('****ERROR', e)
                                 this.isLoading = false
                                 this.isError = true
                               })    
        this.isLoading = false
        if (!this.isError && response?.ok) {
          location.reload();
        } else {
          this.isError = true
        }
      },      
  }  
    
});

app.mount("#app");