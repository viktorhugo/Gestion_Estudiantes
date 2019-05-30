<template>
  <div class="home">

    <div class="pt-5 mt-2">
    <img alt="Vue logo" src="../assets/logo.png">
    </div>

    <HelloWorld msg="Gestion cursos"/>
    <div class="container" v-if="estudiantes.length > 0">
        <table class="table ">
        
            <thead class="thead-dark text-dark">
            <tr>
                <th scope="col" class="align-middle">Nombre</th>
                <th scope="col" class="align-middle text-black">Incribirse a curso</th>
                <th scope="col" class="align-middle"> Cursos inscritos</th>                       
            </tr>
            </thead>

            <tbody >
                <tr v-for="estudiante in estudiantes" v-bind:key="estudiante._id">
                    <td>{{estudiante.nombre}}</td>
                    <td>
                        <b-btn  @click="datos(estudiante.nombre, estudiante._id)" v-b-modal.modal-center1 variant="white">
                            <i class="fas fa-chalkboard-teacher fa-2x text-info"></i>
                        </b-btn>
                    </td>
                    <td>
                        <b-btn  @click="cursosEst(estudiante._id)" v-b-modal.modal-center2 variant="white">                        
                            <i class="fas fa-id-card fa-1.5x text-success fa-2x"></i>
                        </b-btn>
                    </td>                    
                </tr>
            </tbody>
        </table>

        <b-modal id="modal-center1"
            variant="primary"
            centered title="Inscribase al Curso que desee"
            class="text-dark"
            header-bg-variant="link"
            header-text-variant="dark"
            body-bg-variant="info"
            footer-text-variant="ligth"
            footer-bg-variant="primary">

            <div v-if="cursos.length > 0">
                <table class="table ">        
                    <thead class="thead-dark text-dark">
                    <tr>
                        <th scope="col" class="align-middle">Curso</th>
                        <th scope="col" class="align-middle text-black">Incribirse</th>           
                    </tr>
                    </thead>

                    <tbody >
                        <tr v-for="curso in cursos" v-bind:key="curso._id">
                            <td class="text-white"><strong>{{curso.nombre  }}</strong></td>
                            <td>
                            <b-badge href="#" @click="add_estudiante(curso._id, curso.nombre)" variant="success">
                                <i class="fas fa-check-double fa-2x text-white "></i>
                            </b-badge>
                            </td>
                            
                        </tr>
                    </tbody>
                </table> 
             </div>
            <div v-else class="container">
                <b-button to="/cursos" class="m-1" variant="success">
                    No Tiene ningun curso para Incribirse, (volver a cursos)
                </b-button>
            </div>    

            <template slot="modal-footer" slot-scope="{ ok, cancel}">
                <b-button size="" variant="dark" @click="cancel()">
                Cancel
                </b-button>
            </template>
        </b-modal> 

         <b-modal id="modal-center2"
            variant="primary"
            centered title=" Cursos en los que esta inscrito"
            class="text-dark"
            header-bg-variant="primary"
            header-text-variant="dark"
            body-bg-variant="info"
            footer-text-variant="ligth"
            footer-bg-variant="white">
            
                <div v-if="cur_Est.length > 0">
                     <table class="table ">
        
                        <thead class="thead-dark text-dark">
                        <tr>
                            <th scope="col" class="align-middle">Curso</th>
                            <th scope="col" class="align-middle text-black">Darse de baja</th>           
                        </tr>
                        </thead>

                        <tbody >
                            <tr v-for="curso in cur_Est" v-bind:key="curso._id">
                                <td><strong>{{ curso.idCurso.nombre  }}</strong></td>
                                <td>
                                    <b-badge href="#" @click="del_curso(curso._id, curso.idEstudiante)" variant="dark">
                                        <i class="fas fa-2x fa-window-close text-primary"></i>
                                    </b-badge>                            
                                </td>
                                
                            </tr>
                        </tbody>
                    </table> 
                </div>
                <div v-else>
                    <b-badge variant="dark"><h4>No Tiene ningun curso inscrito</h4> </b-badge>
                </div> 

             <template slot="modal-footer" slot-scope="{ ok, cancel}">
                <b-button size="" variant="dark" @click="cancel()">
                Cancel
                </b-button>
            </template>
        </b-modal>
    </div>
    <div v-else class="">
      <b-badge variant="dark" class="m-5 cursor-pointer btn-success">
        <h4 class="cursor-pointer">No Tienes estudiantes para añadir a cursos</h4>
      </b-badge>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Swal from 'sweetalert2'
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
        estudiantes:"",
        cursos:"",
        idEstudiante:'',
        estudiante:'',
        idCurso:'',
        curso:'',
        cur_Est:Array,
        con:false,
         modalShow: false
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    this.get_data()
  },
  methods:{
    showModal() {
      this.$root.$emit('bv::hide::modal', 'modal-center2', '#btnShow')
    },
    get_data(){
        axios.get('http://localhost:8000/api/notas/asignarcursos')
        .then((res) => {
        this.estudiantes = res.data.all_Est
        this.cursos = res.data.all_Courses 
      })
    },
    datos(estudiante, idEstudiante){
        this.estudiante = estudiante
        this.idEstudiante = idEstudiante
    },
    add_estudiante(id){
        axios.post('http://localhost:8000/api/notas/asignarcursos', { idCurso:id , idEstudiante:this.idEstudiante }).then((data) => { 
            if (data.data.message == 'pass'){
                Swal.fire({
                    title: 'Añadido Correctamente al Curso',
                    type: 'success',
                    animation: true,
                    customClass: {
                        popup: 'animated tada'
                    }
                })
            }else{
                Swal.fire({
                    title: 'Oops...',
                    type: 'error',
                    text: 'Ya se encuentra inscrito en este curso',
                    animation: true,
                    customClass: {
                        popup: 'animated tada'
                    }
                })
            }
            
        })
 
    },
    cursosEst(id){
         axios.get(`http://localhost:8000/api/notas/${id}`)
            .then((res) => {
            this.cur_Est = res.data            
      })
    },
    del_curso(id){
       Swal.fire({
        title: 'Darte de Baja?',
        text: "estas seguro de darte de baja en este curso?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si estoy seguro',
        animation: false,
        customClass: {
          popup: 'animated tada'
        }}).then(async (result) => {
            if (result.value) {
                Swal.fire(
                    'Eliminado',
                    'Te has dado de baja en este curso',
                    'success',
                    axios.delete(`http://localhost:8000/api/notas/${id}`)
                )
                this.showModal()
            }
        })       
    }
  }
}
</script>
<style>
    .cursor-pointer{
        cursor: pointer;
    }
</style>