<template>
  <div id="app" class="body" >
    <div>
      <b-navbar toggleable="lg" class="rigth fixed-top" type="dark" variant="info">
        <b-navbar-brand to="/">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav center>
          <b-navbar-nav class="a">
              <b-nav-item to="/estudiantes">Estudiantes</b-nav-item>
              <b-nav-item to="/cursos">Cursos</b-nav-item>
            <b-nav-item-dropdown text="Gestion cursos y notas" >
              <b-dropdown-item to="/gestion">Gestion cursos </b-dropdown-item>              
              <b-dropdown-item to="/gestion_notas">Gestion notas</b-dropdown-item>                              
            </b-nav-item-dropdown>
          </b-navbar-nav> 

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" variant="success" @click="buscar()">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>User</em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.a {
  font-weight: bold;
  color: #2c3e50;
}
.body{
   
}
</style>
