<template>
  <div>
    <div class="social-icon btn-google" title="Gmail"><font-awesome-icon :icon="['fab', 'google']"/></div>
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
  name: 'AuthSocial'
}
</script>