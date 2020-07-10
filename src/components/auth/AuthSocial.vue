<template>
  <div>
    <div class="social-icon btn-google" title="Gmail" v-on:click="loginGoogle">
      <font-awesome-icon :icon="['fab', 'google']"/>
    </div>
  </div>
</template>

<style scoped>
.social-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer
}

.btn-facebook {
    background-color: #3b5998;
    color: #fff;
}

.btn-google {
    background-color: #ea4335;
    color: #fff;
}
</style>

<script>
export default {
  name: 'AuthSocial',
  methods: {
    loginGoogle() {
      var child = this.openPopUp(process.env.VUE_APP_GOOGLE_AUTH_URL, 500, 500);
      // Creo intervalo asincronico para consultar si el popup cerro, esto se dispara cada medio segundo
      var loop = setInterval(function() {   
        if(child.closed) {
          clearInterval(loop);
          window.location.href = "/";
        }
      }, 500);
    },

    openPopUp(url, width, height) {
      //Allow for borders.
      let leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
      //Allow for title and status bars.
      let topPosition = (window.screen.height / 2) - ((height / 2) + 50);
      //Open the window.
      let configs = `status=no,height=${height}, width=${width}, resizable= yes, left= ${leftPosition}, top = ${topPosition},
        screenX=${leftPosition}, screenY=${topPosition}, toolbar=no,menubar=no,scrollbars=no,location=no,directories=no`
      return window.open(url, "PopUp", configs);
    }

  }
}
</script>