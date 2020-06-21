<template>
	<div>
		<b-nav-item class="d-flex align-items-start justify-content-end" v-if="!isLogged" right>
			<!--  Login  -->
			<div class="d-flex justify-content-end align-items-center auth" v-on:click="showModalLogin">
				<font-awesome-icon icon="user-circle"/> <span>{{$t('AuthNavItem.signIn')}}</span>
			</div>
			<b-modal v-model="modalLogin" v-if="modalLogin && !isLogged" :title="$t('AuthNavItem.formOfSignIn')" hide-footer>
				<b-form @submit="onSubmitSignIn">
					<div class="d-flex justify-content-between flex-wrap mb-2">
						<b-form-input id="form-sign-in-email" class="mb-2"
							:placeholder="$t('AuthNavItem.formSignIn.Email')" v-model="form.email" type="email" required >
						</b-form-input>
						<b-form-input id="form-sign-in-password" class="mb-2"
							:placeholder="$t('AuthNavItem.formSignIn.Password')" v-model="form.password" type="password" required >
						</b-form-input>
					</div>

					<div class="d-flex justify-content-between">
						<button class="btn btn-default sign-up" v-on:click="showModalSignUp">{{$t('AuthNavItem.signUp')}}</button>
						<button type="submit" class="btn btn-primary">{{$t('AuthNavItem.signIn')}}</button>
					</div>
				</b-form>
			</b-modal>

			<b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
				<h5 v-if="modalResponse.msg">{{modalResponse.msg}}</h5>
				<h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
			</b-modal>

			<SignUpModal ref="SignUp"/>
		</b-nav-item>

		<LoggedNavDropdown v-if="isLogged" />
	</div>
</template>

<style scoped>
.sign-up {
	border: solid 2px #082f61;
	border-radius: 5px;
}

.nav-link {
	padding: 0;
}

.auth {
	color: #fff;
}

.fa-user-circle {
	margin-right: 5px;
}
</style>

<script>
import AuthService from '@/service/auth/AuthService.js';
import UserService from '@/service/user/UserService.js';

import SignUpModal from './SignUpModal.vue';
import LoggedNavDropdown from './LoggedNavDropdown.vue';

export default {
	name: 'AuthNavItem',
	components: {
		SignUpModal,
		LoggedNavDropdown
	},
	data() {
		return {
			isLogged: false,
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
		showModalLogin: function() {
			this.modalLogin = true;
		},
		showModalSignUp: function() {
			this.modalLogin = false;
			this.$refs.SignUp.showModal();
		},
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
					window.location.reload();
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
	mounted() {
		this.isLogged = AuthService.isLogged();
	}
}
</script>