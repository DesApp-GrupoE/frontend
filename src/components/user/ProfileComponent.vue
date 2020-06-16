<template>
  <div class="panel-profile" v-if="user">
    Name: {{user.name}} <br/>
    Surname: {{user.surname}} <br/>
    Email: {{user.email}} <br/>
  </div>
</template>

<style scoped>
.panel-profile {
	padding: 10px;
	background-color: #fff;
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
