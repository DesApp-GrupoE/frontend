<template>
  <b-nav-item-dropdown class="d-flex align-items-start justify-content-end auth-dropdown" right>
    <template slot="button-content">
      <font-awesome-icon class="m-0" icon="user-circle"/> <span>{{$t('LoggedNavDropdown.welcome')}} {{getNameUser()}}</span>
    </template>
    <b-dropdown-item href="/profile">
      <router-link to="/profile" class="black">{{$t('LoggedNavDropdown.profile')}}</router-link>
    </b-dropdown-item>
    <b-dropdown-item href="#" v-on:click="logout">
      {{$t('LoggedNavDropdown.signOut')}}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<style scoped>
.black {
  color: #000;
}
</style>

<style>
/* Este style no es scoped porque no puede agregarle estilo al b-nav-item-dropdown, ya que es un componente del cual
	no tengo control */
/* Para el dropdown de usuario logueado */
li.auth-dropdown > a.nav-link.dropdown-toggle {
	color: #fff;
	padding: 0;
}
</style>

<script>
import AuthService from '@/service/auth/AuthService.js';

export default {
  name: 'LoggedNavDropdown',
  methods: {
    logout() {
      AuthService.logout()
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          window.location.reload();
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          window.location.reload();
        })
    },

    getNameUser() {
      return localStorage.getItem('userName');
    }
  }
  
}
</script>