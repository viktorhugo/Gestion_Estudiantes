<template>
  <div class="home pt-5 mt-2">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Cursos"/>
    <div class="container">
      <table class="table ">
      
        <thead class="thead-dark text-dark">
          <tr>
            <th scope="col" class="align-middle">Nombre</th>
            <th scope="col" class="align-middle text-black">Editar Curso</th>
            <th scope="col" class="align-middle">Ver estudiantes Inscritos</th>
            <th scope="col" class="align-middle">eliminar</th>
          </tr>
        </thead>

        <tbody >
          <tr v-for="curso in cursos" v-bind:key="curso._id">

            <td><strong> {{curso.nombre}}</strong></td>
            
            <td>
              <b-btn  @click="datos(curso.nombre, curso._id)" v-b-modal.modal-center2 variant="white">
               <i class="fas fa-edit fa-2x text-info"></i>
              </b-btn>
            </td>

            <td>
              <b-btn  @click="buscar_est(curso._id)" v-b-modal.modal-center1 variant="white">
                <i class="fas fa-users fa-2x text-success"></i>
              </b-btn>
            </td>

            <td>
              <b-btn  class=""  variant="white" @click="del_curso(curso._id)">                
                <i class="fas fa-calendar-times fa-2x text-primary text-primary"></i>
              </b-btn>
            </td>

          </tr>
        </tbody>
      </table>

        <b-modal id="modal-center1"
          variant="primary"
          centered title="estudiantes en el curso"
          class="text-dark"
          header-bg-variant="success"
          header-text-variant="dark"
          body-bg-variant="light"
          footer-text-variant="ligth"
          footer-bg-variant="success">
            <div v-if="estBuscados.length > 0">
              <table class="table ">
                  <thead class="thead-dark text-dark">
                  <tr>
                      <th scope="col" class="align-middle">Nombre</th>          
                  </tr>
                  </thead>

                  <tbody >
                      <tr v-for="curso in estBuscados" v-bind:key="curso._id">
                          <td><strong>{{ curso.idEstudiante.nombre  }}</strong></td>                          
                      </tr>
                  </tbody>
              </table> 
            </div>
            <div v-else>
              <b-badge variant="dark"><h4>No Tiene ningun estudiante inscrito</h4> </b-badge>
            </div>


            <template slot="modal-footer" slot-scope="{ ok, cancel}">
                  <b-button size="" variant="dark" @click="cancel()">
                    Cancel
                  </b-button>
             </template>
      </b-modal>

      <b-modal id="modal-center2"
          variant="primary"
          centered title="Actualizar Estudiante"
          class="text-dark"
          header-bg-variant="success"
          header-text-variant="dark"
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
              </b-container>
            </b-form-group>

            <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                  <b-button size="" variant="dark" @click="cancel()">
                    Cancel
                  </b-button>
                  <b-button size="" variant="info" @click="hide('forget'); act_curso()">
                      Actualizar
                  </b-button>
             </template>
      </b-modal>        
    </div>

    <footer>
      <div> 
        <div class="" variant="success">
          <b-btn class="m-3" @click="datos()" v-b-tooltip.hover title="Añadir un Curso"
            v-b-modal.modal-center3 variant="white">
            <i class="fas fa-plus-circle fa-4x  text-success"></i>
          </b-btn>
          <b-modal id="modal-center3"
            variant="primary"
            centered title="Añadir un Curso"
            class="text-dark"
            header-bg-variant="secondary"
            header-text-variant="dark"
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

                </b-container>
              </b-form>

              <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
                  <b-button size="" variant="dark" @click="cancel()">
                    Cancel
                  </b-button>
                  <b-button size="" variant="info" @click="hide('forget'); add_curso()">
                      Agregar
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
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'home',
  data() {
    return {
      cursos:"",
      nombre:"",
      iden:"",
      estBuscados:''
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
      axios.get('http://localhost:8000/api/cursos')
      .then((res) => {
        this.cursos = res.data
      })
    },
     del_curso(id){ //
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
            axios.delete(`http://localhost:8000/api/cursos/${id}`).then(() => {this.get_data()})
          )
        }
      })
    },
    datos(nombre, id){
      this.nombre = nombre
      this.iden = id
    },
    act_curso(){
      axios.put(`http://localhost:8000/api/cursos/${this.iden}`, { nombre:this.nombre}).then(() => { 
        this.nombre =""
        this.iden =""
        this.get_data()
      })
    },
    add_curso(){
      Swal.fire({
        title: 'Curso Añadido Correctamente',
        type: 'success',
        animation: true,
        customClass: {
          popup: 'animated tada'
        }
      })
      axios.post('http://localhost:8000/api/cursos', { nombre:this.nombre}).then(() => { 
        this.nombre =""
        this.get_data()
      })
    },
    buscar_est(id){
      this.estBuscados = 0
      axios.get(`http://localhost:8000/api/cursos/${id}`)
      .then((res) => {
        if (res.data.length > 0){
          this.estBuscados = res.data
        }else{
          this.estBuscados = 0
        } 
      })
    }
    
  }
}
</script>
