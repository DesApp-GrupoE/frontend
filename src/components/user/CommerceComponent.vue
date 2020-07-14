<template>
  <div class="panel-profile pt-0">
    <div v-if="commerce">
      <b-nav id="nav" class="sidebar">
        <b-nav-item href="/profile/commerce/" class="m-1">
          <font-awesome-icon icon="home" class="mr-1"/>
        </b-nav-item>
        <b-nav-item href="/profile/commerce/products" class="m-1">
          <font-awesome-icon icon="shopping-basket" class="mr-1"/><span>{{$t('CommerceComp.products')}}</span>
        </b-nav-item>
        <!-- <b-nav-item href="/profile/commerce/hours" class="m-1">
          <font-awesome-icon icon="clock" class="mr-1"/><span>{{$t('CommerceComp.hours')}}</span>
        </b-nav-item> -->
        <b-nav-item href="/profile/commerce/turns" class="m-1">
          <font-awesome-icon icon="calendar-alt" class="mr-1"/><span>{{$t('CommerceComp.turns')}}</span>
        </b-nav-item>
        <b-nav-item href="/profile/commerce/sales" class="m-1">
          <font-awesome-icon icon="cash-register" class="mr-1"/><span>{{$t('CommerceComp.sales')}}</span>
        </b-nav-item>
      </b-nav>
      
      <div class="p-2">
        <router-view :commerce="commerce"></router-view>
      </div>
      
    </div>

    <div v-else class="col-12">
      <div class="mb-2">
        {{$t('CommerceComp.withoutCommerce')}}. <button class="btn-link" v-on:click="showFormCreateCommerce">{{$t('CommerceComp.doYouWantCreateACommerce')}}</button>
      </div>

      <b-form @submit="onSubmitCreateCommerce" v-if="showFormCommerce">
        <span class="bold">{{$t('CommerceComp.commerceData')}}</span>
        <div class="d-flex justify-content-between flex-wrap">
          <b-form-input id="form-name" class="mb-2"
            :placeholder="$t('CommerceComp.form.name')" v-model="formCommerce.name" type="text" required >
          </b-form-input>
          
          <b-form-input id="form-brand" class="mb-2"
            :placeholder="$t('CommerceComp.form.address')" v-model="formCommerce.address" type="text" required >
          </b-form-input>

          <b-form-input id="form-phone" class="mb-2 mt-1"
            :placeholder="$t('CommerceComp.form.phone')" v-model="formCommerce.phone" type="text" required >
          </b-form-input>
        </div>
        <div class="d-flex flex-wrap align-items-center mt-2">
          <div class="col-12 col-sm-3 pl-0">
            <span class="pr-2">
              <input type="checkbox" v-model="formCommerce.doDelivery" @change="changeDoDelivery($event)" > {{$t('CommerceComp.form.doDelivery')}}
            </span>
          </div>
          <div class="col-12 col-sm-4 pl-0 d-flex align-items-center">
            <b-form-input id="form-delivery-up" class="mb-2 mr-2" style="width: 90%" 
              :disabled="!formCommerce.doDelivery"
              :placeholder="$t('CommerceComp.form.deliveryUp')" v-model="formCommerce.deliveryUp" type="number">
            </b-form-input>
            <span>Km</span>
          </div>
        </div>
        <div class="mt-2">
          <span class="bold">{{$t('CommerceComp.sectors')}}</span>
          <div class="d-flex">
            <b-form-group>
              <b-form-checkbox v-model="formCommerce.sectors" v-for="option in sectors" 
                :key="option" :value="option" :name="`sector-${option}`" inline>
                {{$t(`Commerce.sector.${option}`)}}
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
        <div class="table-responsive pt-2">
          <span class="bold">{{$t('CommerceComp.form.hours.hours')}}</span>
          <table class="table">
            <thead>
              <tr>
                <th>{{$t('CommerceComp.form.hours.day')}}</th>
                <th>{{$t('CommerceComp.form.hours.openAt')}}</th>
                <th>{{$t('CommerceComp.form.hours.closeAt')}}</th>
                <th>{{$t('CommerceComp.form.hours.openToday')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hour in formCommerce.hours" :key="hour.day">
                <td>{{$t('CommerceComp.form.hours.days.'+hour.day)}}</td>
                <td><input type="time" v-model="hour.openAt"></td>
                <td><input type="time" v-model="hour.closeAt"></td>
                <td><input type="checkbox" v-model="hour.openToday"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex justify-content-end">
          <b-button type="submit" variant="primary">{{$t('CommerceComp.form.createCommerce')}}</b-button>
        </div>
      </b-form>
    </div>

    <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
      <h5 v-if="modalResponse.msg" v-html="modalResponse.msg"></h5>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>
  </div>
</template>

<style scoped>
.panel-profile {
	background-color: #fff;
}

.nav {
  background-color: #343a40;
}

.sidebar > li > a {
  color: #fff;
}


.btn-link {
  color: #2c3e50;
  border: 0;
  background-color: inherit;
  outline: none;
}

.btn-link:hover {
  color: #2c3e50;
  text-decoration: underline;
}

</style>

<script>
import CommerceService from '@/service/user/CommerceService.js';
import GoogleMapsService from '@/service/googleMaps/GoogleMapsService.js'

export default {
  name: 'CommerceComponent',
  data() {
    return {
      commerce: null,
      showFormCommerce: false,
      formCommerce: {
        name: null,
        phone: null,
        address: null,
        latitude: 0.0,
        longitude: 0.0,
        doDelivery: false,
        deliveryUp: null,
        sectors: [],
        hours: [
          { day: 'Monday', openAt: null, closeAt: null, openToday: false },
          { day: 'Tuesday', openAt: null, closeAt: null, openToday: false },
          { day: 'Wednesday', openAt: null, closeAt: null, openToday: false },
          { day: 'Thursday', openAt: null, closeAt: null, openToday: false },
          { day: 'Friday', openAt: null, closeAt: null, openToday: false },
          { day: 'Saturday', openAt: null, closeAt: null, openToday: false },
          { day: 'Sunday', openAt: null, closeAt: null, openToday: false },
        ]
      },
      modalResponseShow: false,
      modalResponse: {
				title: null,
				msg: null
			},
    }
  },
  computed: {
    sectors() {
      return this.$store.state.commerceSector.sectors
    }
  },
  mounted() {
    CommerceService.getCommerce()
      .then((response) => {
        this.commerce = response.data;
      })
  },
  methods: {
    showFormCreateCommerce() {
      this.showFormCommerce = true;
    },
    
    onSubmitCreateCommerce(evt) {
      evt.preventDefault();
      if(!this.isFormValid()) {
        return this.showModalValidationForm();
      }
      GoogleMapsService.findPosition(this.formCommerce.address)
        .then(position => {
          this.formCommerce.latitude = position.geometry.location.lat;
          this.formCommerce.longitude = position.geometry.location.lng;
        })
        .catch(() => {
          console.log("Sin conexión a Position Stack");
        })
        .then(() => {
          this.formCommerce.deliveryUp = Number(this.formCommerce.deliveryUp);
          return CommerceService.createCommerce(this.formCommerce);
        })
        .then((response) => {
          this.commerce = response.data;
          this.modalResponseShow = true;
          this.modalResponse.title = null;
          this.modalResponse.msg = "Commercio creado";
        })
        .catch((response) => {
          this.modalResponseShow = true;
          this.modalResponse.title = "Error";
          let errors = response.response.data.error;
          let errorMsg;
          if(errors) {
             errors.foreach(error => {
              errorMsg += this.$t(`Commerce.errors.${error}`) + "</br>";
            });
          } else {
            errorMsg = this.$t(`ModalResponse.error.tryAgain`);
          }
          this.modalResponse.msg = errorMsg;
        })
    },

    isFormValid() {
      return this.isDataCommerceValid() && this.isSectorValid() 
        && this.isHoursValid() && this.isDeliveryUpValid();
    },

    isDataCommerceValid() {
      return this.formCommerce.name && this.formCommerce.address && this.formCommerce.phone;
    },

    isSectorValid() {
      return this.formCommerce.sectors.length > 0;
    },

    isHoursValid() {
      return this.formCommerce.hours.some(hour => hour.day && hour.openAt && hour.closeAt && hour.openToday);
    },

    isDeliveryUpValid() {
      let deliveryUp = Number(this.formCommerce.deliveryUp);
      return !this.formCommerce.doDelivery || (this.formCommerce.doDelivery && !isNaN(deliveryUp))
    },

    showModalValidationForm() {
      let error = ""
      if(!this.isDataCommerceValid()) {
        error += this.$t(`CommerceComp.validations.commerceData`) + " <br/>";
      }
      if(!this.isSectorValid()) {
        error += this.$t(`CommerceComp.validations.sectors`) + " <br/>";
      }
      if(!this.isDeliveryUpValid()) {
        error += this.$t(`CommerceComp.validations.hours`) + " <br/>";
      }
      if(!this.isHoursValid()) {
        error += this.$t(`CommerceComp.validations.hours`) + " <br/>";
      }
      this.modalResponseShow = true;
      this.modalResponse.title = "Advertencia";
      this.modalResponse.msg = error;
    },

    changeDoDelivery(event) {
      if(!event.target.checked) {
        this.formCommerce.deliveryUp = null;
      }
    }
  }
}
</script>
