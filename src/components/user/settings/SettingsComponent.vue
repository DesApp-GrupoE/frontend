<template>
  <div class="col-12">
    <h1>{{$t('ProfileSettings.settings')}}</h1>
    <div class="mt-2">
      <h3>{{$t('ProfileSettings.twoFactorAuthentication')}}</h3>
      <span><input type="checkbox" v-model="form.auth2fa" @change="change2faStatus"> {{$t('SignUpModal.enable2faQuestion')}}</span>
      <div>
        <b-button variant="primary" class="pull-right ml-2" v-if="showBtnSave2fa" v-on:click="save2fa">{{$t('ProfileSettings.save')}}</b-button>
        <b-button variant="primary" class="pull-right" v-if="form.auth2fa" v-on:click="showModalQR">{{$t('ProfileSettings.seeQR')}}</b-button>
      </div>
    </div>

    <b-modal v-model="modalAuth2faShow" :title="$t('ProfileSettings.twoFactorAuthentication')" ok-only>
			<div v-if="form.auth2fa">
        <p>
          {{$t('AuthForm.modal2fa.scanQRwithApp')}} <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">Google Authenticator</a>
          {{$t('AuthForm.modal2fa.toGetCodeOf2fa')}}
        </p>
        <div class="text-center" v-html="qrHtml"></div>
			</div>
    </b-modal>

    <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
			<div v-if="modalResponse.msg">
				<h5>{{modalResponse.msg}}</h5>
			</div>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>
  </div>
</template>

<script>
import UserService from '@/service/user/UserService.js';
import AuthService from '@/service/auth/AuthService.js';

export default {
  name: 'SettingsComponent',
  data() {
    return {
      showBtnSave2fa: false,
      form: {
        auth2fa: false,
        secret: ''
      },
      modalAuth2faShow: false,
      modalResponseShow: false,
      modalResponse: {
        title: '',
        msg: ''
      }
    }
  },
  methods: {
    save2fa() {
      if(this.form.auth2fa) {
        this.enable2FA();
      } else {
        this.disable2FA();
      }
    },
    
    enable2FA() {
      AuthService.enable2FA()
        .then(() => {
          this.modalResponseShow = true;
          this.modalResponse.title = null;
          this.modalResponse.msg = this.$t('ProfileSettings.msg2faEnabled');
        })
        .catch(() => {
          this.showError();
        })
    },

    disable2FA() {
      AuthService.disable2FA()
        .then(() => {
          this.modalResponseShow = true;
          this.modalResponse.title = null;
          this.modalResponse.msg = this.$t('ProfileSettings.msg2faDisabled');
        })
        .catch(() => {
          this.showError();
        })
    },

    showError() {
      this.modalResponseShow = true;
      this.modalResponse.title = "Error";
      this.modalResponse.msg = null;
    },

    showModalQR(enabled) {
      this.auth2FaWasEnabled = enabled;
      this.modalAuth2faShow = true;
    },

    change2faStatus() {
      this.showBtnSave2fa = true;
    }
  },
  computed: {
    qrHtml() {
      let urlQR = "https://chart.googleapis.com/chart?chs=200x200&amp;chld=M%7C0&amp;cht=qr&amp;chl=otpauth://totp/DesAppE?secret=" + this.form.secret;
			return `<img src="${urlQR}" alt="QR segundo factor autenticación"/>`;
    },
  },
  mounted() {
    UserService.getProfile()
      .then(response => {
        this.form.auth2fa = response.data.auth2fa;
        this.status2faOnload = response.data.auth2fa;
      });

    AuthService.getSecret()
      .then(response => {
        this.form.secret = response.data.secret;
      });
  }
}
</script>