<template>
  <div class="d-flex justify-content-around flex-wrap panel p-4">
    <div class="col-12 col-sm-5">
      <AuthForm />
      <hr class="line">
      <div class="d-flex flex-column align-items-center mt-2">
        <span class="mb-2">{{$t('AuthView.orSignInWith')}}</span>
        <AuthSocial />
      </div>
    </div>
    <div class="vertical-line d-none d-sm-block"></div>
    <div class="col-12 col-sm-5 sign-up-form">
      <SignUpForm />
    </div>
  </div>
</template>

<style scoped>
.panel {
	margin-top: 20px;
	padding: 10px;
	background-color: #fff;
}

.vertical-line {
  border-left: 2px solid #f0f0f0;
}

.line {
  color: #f0f0f0;
}

@media screen and (max-width: 576px) {
  .sign-up-form {
    border-top: 2px solid #f0f0f0;
    margin: 20px 0;
    padding: 20px 0; 
  }
}
</style>

<script>
import AuthForm from '@/components/auth/AuthForm.vue';
import SignUpForm from '@/components/auth/SignUpForm.vue';
import AuthSocial from '@/components/auth/AuthSocial.vue';

export default {
  name: 'AuthView',
  components: {
    AuthForm,
    SignUpForm,
    AuthSocial
  }
}
</script>