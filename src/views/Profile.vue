<template>
  <div class="d-flex panel-home">
    <b-nav id="nav" vertical class="col-2 sidebar">
      <b-nav-item href="/profile/">
        <font-awesome-icon icon="user-circle" class="mr-1"/><span>{{$t('ProfileView.profile')}}</span>
      </b-nav-item>
      <b-nav-item href="/profile/commerce">
        <font-awesome-icon icon="store" class="mr-1"/><span>{{$t('ProfileView.commerce')}}</span>
      </b-nav-item>
    </b-nav>

    <div class="col-10">
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
}

.sidebar > li:hover {
  text-decoration: underline;
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
