<template>
  <div></div>
</template>

<script>
import UserService from '@/service/user/UserService.js';

export default {
  name: 'OAuth2Redirect',
  mounted() {
    let data = this.$route.query;
    if(data && data.token) {
      localStorage.setItem('token', `Bearer ${data.token}`);
      UserService.getProfile()
          .then((response) => {
            let user = response.data;
            localStorage.setItem('userName', user.name);
            window.close();
          })
          .catch(() => {
            window.close();
          })
    } else {
      window.close();
    }
  }
}
</script>