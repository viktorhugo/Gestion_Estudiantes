<template>
  <div class="home">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Estudents"/>  
    </div>

  <div class="container">
    <table class="table ">
    <thead class="thead-dark text-dark">
      <tr>
        <th scope="col" class="align-middle">Nombre</th>
        <th scope="col" class="align-middle">Edad</th>
        <th scope="col" class="align-middle text-black">Editar</th>
        <th scope="col" class="align-middle">eliminar</th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="estudiante in estudiantes">
        <td>{{estudiante.nombre}}</td>
        <td>{{estudiante.edad}}</td>
        <td>
          <b-btn  class="" v-b-modal.modal-center variant="success" > 
            <i class="fas fa-edit text-dark"></i> 
          </b-btn>
        </td>
        <td>
          <b-btn  class="" v-b-modal.modal-center variant="info" @click="del_estudiante(estudiante._id)">
            <i class="fas fa-trash-alt text-danger"></i>  
          </b-btn>
        </td>
      </tr>
    </tbody>
  </table>
  </div>

<footer>
  <div> 
    <div class="" variant="success">
      <b-btn  @click="show=true" class="ml-2 mb-3 butt" v-b-modal.modal-center1 variant="info">
        <i class="fas fa-user-plus fa-4x text-dark" ></i>
      </b-btn>

      <b-modal id="modal-center1"
          variant="primary"
          centered title="Agregue el Estudiante"
          class="text-dark"
          header-bg-variant="dark"
          header-text-variant="light"
          body-bg-variant="light"
          body-text-variant="dark"
          footer-bg-variant="warning"
          footer-text-variant="dark">

          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Nombre:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input id="input-small" v-model="nombre" required></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1 mt-2">
              <b-col sm="2">
                <label for="input-small">Edad:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input id="input-small" v-model="edad" required></b-form-input>
              </b-col>
            </b-row>
          </b-container>
            
          <b-btn size="sm" class="m-2 float-right  butt" variant="success" @click="add_estudiante()">
              Añadir
          </b-btn>
      </b-modal>
    </div>
  </div>
</footer>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';

export default {
  data() {
    return {
      estudiantes: "",
      nombre:"",
      edad: ""
    }
  },
  mounted() {
    this.get_data()
  },
  components: {
    HelloWorld
  },
  methods:{
    get_data(){
      axios.get('http://localhost:8000/api/estudiantes')
      .then((res) => {
        this.estudiantes = res.data
      })
    },
     del_estudiante(id){
      axios.delete(`http://localhost:8000/api/estudiantes/${id}`).then(() => {this.get_data()})
    },
    add_estudiante(){
      axios.post('http://localhost:8000/api/estudiantes', { nombre:this.nombre, edad:this.edad}).then(() => { 
        this.get_data()
        this.nombre =""
        this.edad =""
      })
    }


  }
}
</script>
