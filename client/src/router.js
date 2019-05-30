import Vue from 'vue'
import Router from 'vue-router'
import Estudiantes from './views/Estudiantes.vue'
import Cursos from './views/Cursos.vue'
import Gestion from './views/Gestion.vue'
import Home from './views/Home.vue'
import Gestion_notas from './views/Gestion_notas.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cursos',
      name: 'cursos',
      component: Cursos
    },
    {
      path: '/estudiantes',
      name: 'Estudiante',
      component: Estudiantes
    },
    {
      path: '/gestion',
      name: 'Gestion',
      component: Gestion
    },
    {
      path: '/gestion_notas',
      name: 'Gestion_notas',
      component: Gestion_notas
    }
  ]
})
