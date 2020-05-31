<template>
  <div id="app">
    <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">
          <router-link to="/">Home</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <router-link to="/cart">Cart <font-awesome-icon icon="shopping-cart"/></router-link>
            </b-nav-item>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>        
      </div>
    </b-navbar>
    <router-view class="container"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  font-weight: bold;
  background-color: #082f61 !important;
}

#nav a {
  color: #fff;
  text-decoration: none;
}

.nav-collapse {
  text-align: right
}
</style>
