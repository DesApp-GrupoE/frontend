<template>
	<div>
		<b-nav-item class="d-flex align-items-start justify-content-end" v-if="!isLogged" right>
			<router-link to="/auth">
				<font-awesome-icon icon="user-circle"/><span>{{$t('AuthNavItem.signIn')}}</span>
			</router-link>
		</b-nav-item>

		<LoggedNavDropdown v-if="isLogged" />
	</div>
</template>

<style scoped>
.nav-link {
	padding: 0;
}

a, a:hover {
  color: #fff;
  text-decoration: none;
}

.fa-user-circle {
	margin-right: 5px;
}
</style>

<script>
import AuthService from '@/service/auth/AuthService.js';

import LoggedNavDropdown from './LoggedNavDropdown.vue';

export default {
	name: 'AuthNavItem',
	components: {
		LoggedNavDropdown
	},
	data() {
		return {
			isLogged: false,
		}
	},

	mounted() {
		this.isLogged = AuthService.isLogged();
	}
}
</script>