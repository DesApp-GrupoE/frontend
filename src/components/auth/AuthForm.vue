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
			<div v-if="modalResponse.msg">
				<h5 >{{modalResponse.msg}}</h5>
				<div></div>
			</div>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>

		<b-modal v-model="modal2FaShow" :title="$t('AuthForm.modal2fa.title')" hide-footer size="lg">
			<p>
				{{$t('AuthForm.modal2fa.scanQRwithApp')}} <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">Google Authenticator</a>
				{{$t('AuthForm.modal2fa.toGetCodeOf2fa')}}
			</p>
			<div class="text-center" v-html="modal2Fa.qrHtml"></div>
			<div class="mt-2 mb-2">
				<span>{{$t('AuthForm.modal2fa.insertValidationCode2fa')}}</span>
				<input type="text" class="form-control" v-model="modal2Fa.code">
			</div>
			<div class="d-flex justify-content-end">
				<button class="btn btn-primary" v-on:click="validateCodeQR">{{$t('AuthForm.modal2fa.validate')}}</button>
			</div>
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
			modal2FaShow: false,
			form: {
				email: '',
				password: ''
			},
			modalResponseShow: false,
			modalResponse: {
				title: 'Error',
				msg: null
			},
			modal2Fa: {
				qrHtml: null,
				code: null
			}
		}
	},
	methods: {
		onSubmitSignIn(evt) {
			evt.preventDefault(); // Esto evita que se recargue la pagina a causa del submit
			AuthService.signIn(this.form)
				.then((response) => {
					if(response.data.secretKey) {
						this.handleAuthSuccessWith2FA(response.data)
					} else {
						this.handleAuthSuccessWithToken(response.data);
					}
				})
				.catch(error => {
					this.handleErrorRequest(error);
				})
		},

		handleAuthSuccessWithToken(data) {
			let token = `${data.type} ${data.token}`;
			localStorage.setItem('token', token)
			UserService.getProfile()
				.then((response) => {
					let user = response.data;
					localStorage.setItem('userName', user.name);
					window.location.href = "/";
				})
				.catch(error => {
					this.handleErrorRequest(error);
				})
		},

		handleAuthSuccessWith2FA(data) {
			let urlQR = "https://chart.googleapis.com/chart?chs=200x200&amp;chld=M%7C0&amp;cht=qr&amp;chl=otpauth://totp/DesAppE?secret=" + data.secretKey;
			let tagImg = `<img src="${urlQR}" alt="QR segundo factor autenticación"/>`
			this.modal2FaShow = true;
			this.modal2Fa.qrHtml = tagImg;
		},

		handleErrorRequest(error) {
			this.modalResponse.title = "Error"
			if(error.response && error.response.data) {
				this.modalResponse.msg = error.response.data.error;
			} else {
				// Set null para que muestre error generico
				this.modalResponse.msg = null;
			}
			this.modalResponseShow = true;
		},

		validateCodeQR() {
			let json = {
				email: this.form.email,
				code: this.modal2Fa.code
			}
			AuthService.validateCodeQR(json)
				.then((response) => {
					this.handleAuthSuccessWithToken(response.data);
				})
				.catch(error => {
					this.handleErrorRequest(error);
				})
		}
	},
}
</script>