<template>
  <div class="d-flex panel-home" style="min-height: 75vh;">
    <b-nav id="nav" vertical class="col-2 sidebar">
      <b-nav-item href="/profile/">
        <font-awesome-icon icon="user-circle" class="mr-1"/><span class="hide-xs">{{$t('ProfileView.profile')}}</span>
      </b-nav-item>
      <b-nav-item href="/profile/commerce">
        <font-awesome-icon icon="store" class="mr-1"/><span class="hide-xs">{{$t('ProfileView.commerce')}}</span>
      </b-nav-item>
      <b-nav-item href="/profile/purchase">
        <font-awesome-icon icon="shopping-bag" class="mr-1"/><span class="hide-xs">Compras</span>
      </b-nav-item>
      <b-nav-item href="/profile/settings">
        <font-awesome-icon icon="cog" class="mr-1"/><span class="hide-xs">{{$t('ProfileView.settings')}}</span>
      </b-nav-item>
    </b-nav>

    <div class="col-10 pr-0 pl-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.panel-home {
  margin-top: 20px;
  margin-bottom: 20px;
	padding: 10px;
	background-color: #fff;
}

.nav {
  background-color: #343a40;
}

.sidebar > li > a {
  color: #fff;
  padding-right: 0;
}

.sidebar > li:hover {
  text-decoration: underline;
}

@media screen and (max-width:576px){
	.hide-xs {
		display: none;
	}
}
</style>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      tab : 1
    }
  }
}
</script>
