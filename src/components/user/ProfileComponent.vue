<template>
  <div class="panel-profile" v-if="user">
    <b-alert class="color-black" :show="!user.auth2fa" dismissible>
      {{$t('ProfileComp.auth2FaInfo')}} <a class="alert-link" href="/profile/settings">{{$t('ProfileComp.settings')}}</a>
    </b-alert>
    {{$t('ProfileComp.name')}}: {{user.name}} <br/>
    {{$t('ProfileComp.surname')}}: {{user.surname}} <br/>
    {{$t('ProfileComp.email')}}: {{user.email}} <br/>
  </div>
</template>

<style scoped>
.panel-profile {
	padding: 10px;
	background-color: #fff;
}

.alert-link {
  color: inherit !important;
}
</style>

<script>
import UserService from '@/service/user/UserService.js';

export default {
  name: 'ProfileComponent',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    UserService.getProfile()
      .then(response => {
        this.user = response.data;
        localStorage.setItem('userId', response.data.id)
      })
  }
}
</script>
