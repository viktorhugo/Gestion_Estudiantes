<template>
  <div class="home">
    <div class="home pt-5 mt-2">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Estudiantes"/>  
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
        <tr v-for="estudiante in estudiantes" v-bind:key="estudiante._id" >
          <td>{{estudiante.nombre}}</td>
          <td>{{estudiante.edad}}</td>
          <td>
            <b-btn  @click="datos( estudiante.nombre,estudiante.edad, estudiante._id)"  class="" v-b-modal.modal-center2 variant="white">
              <i   class="fas fa-2x fa-user-edit"></i>  
            </b-btn>

          </td>
          <td>
            <b-btn  class="" v-b-modal.modal-center variant="white" @click="del_estudiante(estudiante._id)">
              <i class="fas fa-2x fa-user-times text-primary" ></i> 
            </b-btn>
          </td>
        </tr>
      </tbody>
    </table>
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
                <b-form>
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
                </b-form>

                <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                  <b-button size="" variant="dark" @click="cancel()">
                    Cancel
                  </b-button>
                  <b-button size="" variant="info" @click="hide('forget'); add_estudiante()">
                      Crear Estudiante
                  </b-button>
                </template>
          </b-modal>
  </div>

<footer>
  <div> 
    <div>
      <b-btn class="ml-2 mb-3 butt" @click="datos()" v-b-tooltip.hover title="Añadir un estudiante"
       v-b-modal.modal-center1 variant="white">
        <i class="fas fa-user-plus fa-4x text-info" ></i>
      </b-btn>

      <b-modal id="modal-center2"
          variant="primary"
          centered title="Actualizar Estudiante"
          class="text-dark"
          header-bg-variant="dark"
          header-text-variant="white"
          body-bg-variant="light"
          footer-text-variant="ligth"
          footer-bg-variant="success">
            <b-form-group>
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
            </b-form-group>

            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
               <b-button size="" variant="dark" @click="cancel()">
                Cancel
              </b-button>
                <b-button size="" variant="info" @click="hide('forget'); act_estudiante()">
                    Guardar
                </b-button>
            </template>

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
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      estudiantes: "",
      nombre:"",
      edad: "",
      iden:""
    }
  },
  mounted() {
    this.get_data()
  },
  components: {
    HelloWorld
  },
  methods:{
    get_data(){// hace peticion a la API de los estudiantes
      axios.get('http://localhost:8000/api/estudiantes')
      .then((res) => {
        this.estudiantes = res.data
      })
    },
     del_estudiante(id){ //
     Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        animation: false,
        customClass: {
          popup: 'animated tada'
        }}).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
            axios.delete(`http://localhost:8000/api/estudiantes/${id}`).then(() => {this.get_data()})
          )
        }
      })      
    },
    add_estudiante(){
      
      axios.post('http://localhost:8000/api/estudiantes', { nombre:this.nombre, edad:this.edad}).then(() => { 
        Swal.fire({
          title: 'Estudiante Añadido Correctamente',
          type: 'success',
          animation: true,
          customClass: {
            popup: 'animated tada'
          }
        })
        this.get_data()
        this.nombre =""
        this.edad =""
      })
    },
    datos(nombre, edad, id){
      this.nombre = nombre
      this.edad = edad
      this.iden = id
    },
    act_estudiante(){
      axios.put(`http://localhost:8000/api/estudiantes/${this.iden}`, { nombre:this.nombre, edad:this.edad}).then(() => { 
        this.nombre =""
        this.edad =""
        this.iden =""
        this.get_data()
      })
    }
    

  }
}
</script>
