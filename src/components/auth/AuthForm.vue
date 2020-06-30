<template>
  <div>
    <b-form @submit="onSubmitSignIn">
      <h3 class="text-center">{{$t('AuthForm.signIn')}}</h3>
      <div class="d-flex justify-content-between flex-wrap pt-2">
        <b-form-input id="form-sign-in-email" class="mb-2"
          :placeholder="$t('AuthNavItem.formSignIn.Email')" v-model="form.email" type="email" required >
        </b-form-input>
        <b-form-input id="form-sign-in-password" class="mb-2"
          :placeholder="$t('AuthNavItem.formSignIn.Password')" v-model="form.password" type="password" required >
        </b-form-input>
      </div>
      <div class="d-flex justify-content-center pt-2 pb-2">
        <button type="submit" class="btn btn-primary">{{$t('AuthNavItem.signIn')}}</button>
      </div>
    </b-form>

    <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
      <h5 v-if="modalResponse.msg">{{modalResponse.msg}}</h5>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>
  </div>
</template>

<style scoped>

</style>

<script>
import AuthService from '@/service/auth/AuthService.js';
import UserService from '@/service/user/UserService.js';

export default {
  name: 'AuthForm',
  data() {
		return {
			modalLogin: false,
			form: {
				email: '',
				password: ''
			},
			modalResponseShow: false,
			modalResponse: {
				title: 'Error',
				msg: null
			},
		}
	},
	methods: {
		onSubmitSignIn(evt) {
			evt.preventDefault(); // Esto evita que se recargue la pagina a causa del submit
			AuthService.signIn(this.form)
				.then((response) => {
					let token = `${response.data.type} ${response.data.token}`;
					localStorage.setItem('token', token)
					return UserService.getProfile();
				})
				.then((response) => {
					let user = response.data;
					localStorage.setItem('userName', user.name);
					window.location.href = "/";
				})
				.catch(error => {
					this.modalResponse.title = "Error"
					if(error.response.data) {
						this.modalResponse.msg = error.response.data.error;
					} else {
						// Set null para que muestre error generico
						this.modalResponse.msg = null;
					}
					this.modalResponseShow = true;
				})
		}
	},
}
</script>