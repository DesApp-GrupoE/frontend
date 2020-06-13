<template>
	<b-nav-item right>
		<!--  Login  -->
		<div class="d-flex justify-content-end align-items-center auth" v-on:click="showModal">
			<font-awesome-icon icon="user-circle"/> <span>Sign In</span>
		</div>

		<b-modal v-model="modalShow" title="Login" hide-footer>
			<div class="row m-2 justify-content-end">
				<input type="text" class="form-control input-login" placeholder="email">
				<input type="password" class="form-control input-login" placeholder="password">
			</div>
			<button class="btn btn-primary float-right">Login</button>
		</b-modal>
	</b-nav-item>
</template>

<style scoped>
.nav-link {
	padding: 0;
}

.input-login {
	margin-bottom: 10px;
}

.auth {
	color: #fff;
}

.fa-user-circle {
	margin-right: 5px;
}
</style>

<script>
export default {
	name: 'AuthNavItem',
	data() {
		return {
			modalShow: false
		}
	},
	methods: {
		showModal: function() {
			this.modalShow = true;
		}
	}
}
</script>