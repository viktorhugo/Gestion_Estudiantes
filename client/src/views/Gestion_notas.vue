<template>
  <div class="home pt-5 mt-2">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg=" Agregar Calificaciónes"/>
    <div class="container" v-if="cursos.length > 0">

      <table class="table ">
      
        <thead class="thead-dark text-dark">
          <tr>
            <th scope="col" class="align-middle">Nombre</th>
            <th scope="col" class="align-middle text-black"> Evaluar Estudiantes</th>
          </tr>
        </thead>

        <tbody >
          <tr v-for="curso in cursos" v-bind:key="curso._id">

            <td><strong> {{curso.nombre}}</strong></td>          

            <td>
              <b-btn  @click="buscar_est(curso._id)" v-b-modal.modal-center1 variant="white">
                <i class="fas fa-user-clock fa-2x text-success"></i>
              </b-btn>
            </td>

          </tr>
        </tbody>
      </table>

        <b-modal id="modal-center1"
          variant="primary"
          centered title="Evaluar curso"
          class="text-dark"
          header-bg-variant="success"
          header-text-variant="dark"
          body-bg-variant="light"
          footer-text-variant="ligth"
          footer-bg-variant="success">

            <div v-if="estBuscados.length > 0">
               <label class="p" for="cur">Nombre de Evaluación</label>
              <b-form-input id="cur" v-model="evaluacion" class=" mb-4" placeholder="Ejemplo: programacion " autofocus></b-form-input>
              <hr>
              <table class="table ">
                  <thead class="thead-dark text-dark">
                  <tr>
                      <th scope="col" class="align-middle">Nombre</th>          
                      <th scope="col" class="align-middle">Calificacion</th>
                      <th scope="col" class="align-middle">Calificar estudiante</th>

                  </tr>
                  </thead>

                  <tbody >
                      <tr v-for="curso in estBuscados" v-bind:key="curso._id">
                        
                          <td><strong>{{ curso.idEstudiante.nombre  }}</strong></td>                          
                          <td>
                            <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0"
                              placeholder="Nota" type="number"  v-model="curso.calificacion" >
                            </b-input>
                          </td>
                          <td>
                            <b-btn  @click="guardarCal(curso.idCurso._id, curso.idEstudiante._id, curso.calificacion)" 
                              v-b-modal.modal-center1 variant="white">
                              <i class="fas fa-check-double fa-2x text-success "></i>
                            </b-btn>                          
                          </td>
                      </tr>
                  </tbody>
              </table> 
            </div>

            <div v-else>
              <b-badge variant="dark"><h4>No Tiene ningun estudiante inscrito</h4> </b-badge>
            </div>

            <template slot="modal-footer" slot-scope="{ ok, cancel}">
                  <b-button  variant="dark" @click="cancel()">
                    Salir
                  </b-button>
             </template>
      </b-modal>

    </div> 
    <div v-else class="">
      <b-badge variant="dark" to="/cursos" class="m-5 btn btn-success">
        <h4>No Tiene cursos para evaluar, Ir a añadir cursos</h4>
      </b-badge>
    </div>  

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
//import Swal from 'sweetalert2'

export default {
  name: 'home',
  data() {
    return {
      cursos:"",
      estBuscados:'',
      evaluacion:""
    }
  },
  mounted() {
    this.get_data()
  },
  saveCall(){

  },
  components: {
    HelloWorld
  },
  methods:{
    get_data(){// 
      axios.get('http://localhost:8000/api/cursos')
      .then((res) => {
        this.cursos = res.data
      })
    },
    guardarCal(idCurso,idEstudiante, calificacion){
      axios.post(`http://localhost:8000/api/notas/cursos`,{idCurso, idEstudiante, calificacion, nombreEvaluacion: this.evaluacion } )
      console.log(idCurso, idEstudiante, calificacion, this.evaluacion);      
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
<style>
  .pointer {
   cursor: pointer; 
   
  }
</style>
