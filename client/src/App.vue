<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" class="center" type="dark" variant="info">
        <b-navbar-brand  to="/"> Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse nav" is-nav>
          <b-navbar-nav class="a">
              <b-nav-item to="/estudiantes">Estudiantes</b-nav-item>
              <b-nav-item to="/cursos">Cursos</b-nav-item>
            <b-nav-item-dropdown text="Gestion cursos y notas" >
              <b-dropdown-item to="/gestion">ES</b-dropdown-item>              
              <b-dropdown-item to="/gestion">COS</b-dropdown-item>              
              <b-dropdown-item to="/gestion">AS</b-dropdown-item>              
              <b-dropdown-item to="/gestion">AD</b-dropdown-item>              
                           
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
</style>
