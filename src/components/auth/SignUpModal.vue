<template>
	<div>
		<b-modal v-model="modalFormShow" :title="$t('SignUpModal.titleForm')" hide-footer>
			<b-form @submit="onSubmitSignUp">
				<div class="d-flex justify-content-between flex-wrap">
					<b-form-input id="form-sign-up-name" class="mb-2"
						:placeholder="$t('SignUpModal.yourName')" v-model="form.name" type="text" required >
					</b-form-input>
					
					<b-form-input id="form-sign-up-surname" class="mb-2"
						:placeholder="$t('SignUpModal.yourSurname')" v-model="form.surname" type="text" required >
					</b-form-input>

					<b-form-input id="form-sign-up-email" class="mb-2"
						:placeholder="$t('SignUpModal.email')" v-model="form.email" type="email" required >
					</b-form-input>

					<b-form-input id="form-sign-up-password" class="mb-2"
						:placeholder="$t('SignUpModal.password')" v-model="form.password" type="password" required >
					</b-form-input>
				</div>

				<div class="d-flex justify-content-end">
					<b-button type="submit" variant="primary">{{$t('SignUpModal.signUp')}}</b-button>
				</div>
			</b-form>
		</b-modal>

		<b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
			<h5 v-if="modalResponse.msg">{{modalResponse.msg}}</h5>
			<h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
		</b-modal>
	</div>
</template>

<script>
import AuthService from '@/service/auth/AuthService.js';

export default {
	name: 'SignUpModal',
	data() {
		return {
			modalFormShow: false,
			modalResponseShow: false,
			modalResponse: {
				title: null,
				msg: null
			},
			form: {
				name: '',
				surname: '',
				email: '',
				password: ''
			},
		}
	},
	methods: {
		showModal() {
			this.modalFormShow = true;
		},
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
				});
		}
	}
}
</script>	