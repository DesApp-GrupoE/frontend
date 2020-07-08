<template>
	<div>
		<b-form @submit="onSubmitSignUp">
			<h3 class="text-center">{{$t('SignUpModal.signUp')}}</h3>
			<div class="d-flex justify-content-between flex-wrap pt-2">
				<b-form-input id="form-sign-up-name" class="mb-2"
					:placeholder="$t('SignUpModal.yourName')" v-model="form.name" type="text" required >
				</b-form-input>
				
				<b-form-input id="form-sign-up-surname" class="mb-2"
					:placeholder="$t('SignUpModal.yourSurname')" v-model="form.surname" type="text" required >
				</b-form-input>

				<b-form-input id="form-sign-up-email" class="mb-2"
					:placeholder="$t('SignUpModal.email')" v-model="form.email" type="email" required >
				</b-form-input>

				<b-form-input id="form-sign-up-password" :state="passwordState" aria-describedby="form-sign-up-password-feedback"
						:placeholder="$t('SignUpModal.password')" v-model="form.password" type="password" required >
				</b-form-input>
				<b-form-invalid-feedback id="form-sign-up-password-feedback">
					{{$t('SignUpModal.passwordValidationMsg')}}
				</b-form-invalid-feedback>
			</div>

			<div class="d-flex justify-content-center pt-2 pb-2">
				<b-button type="submit" variant="primary">{{$t('SignUpModal.signUp')}}</b-button>
			</div>
		</b-form>

		<b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
			<h5 v-if="modalResponse.msg">{{modalResponse.msg}}</h5>
			<h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
		</b-modal>
	</div>
</template>

<script>
import AuthService from '@/service/auth/AuthService.js';

export default {
	name: 'SignUpForm',
	data() {
		return {
			modalResponseShow: false,
			modalResponse: {
				title: null,
				msg: null
			},
			form: {
				name: '',
				surname: '',
				email: '',
				password: null
			},
		}
	},
	methods: {
		onSubmitSignUp(evt) {
			evt.preventDefault(); // Esto evita que se recargue la pagina a causa del submit
			AuthService.signUp(this.form)
				.then(() => {
					this.modalResponse.title = null;
					this.modalResponse.msg = this.$t('SignUpModal.successfullySignUp');
					this.modalFormShow = false;
				})
				.catch(error => {
					this.modalResponse.title = "Error"
					if(error.response.data) {
						this.modalResponse.msg = error.response.data.error;
					} else {
						// Set null para que muestre error generico
						this.modalResponse.msg = null;
					}
				})
				.then(() => {
					this.modalResponseShow = true;
					this.resetForm();
				});
		},

		resetForm() {
			this.form.name = '';
			this.form.surname = '';
			this.form.email = '';
			this.form.password = null;
		}
	},

	computed: {
		passwordState() {
			if(this.form.password == null) {
				return undefined;
			}
			// Regex para validar que al menos exista una mayuscula, una minuscula, un número y 8 caracteres
			const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
			return regex.test(this.form.password);
		}
	}
}
</script>	