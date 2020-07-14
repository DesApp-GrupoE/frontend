<template>
  <div>
    <b-modal v-model="show" :title="$t('ModalTurnSelect.title')">
      <div>
        <div>
          <input class="mr-2" type="radio" name="type-turn" v-model="deliveryType" value="ON_COMMERCE"> {{$t('ModalTurnSelect.ON_COMMERCE')}}
        </div>
        <div v-if="commerce.doDelivery">
          <input class="mr-2" type="radio" name="type-turn" v-model="deliveryType" value="TO_ADDRESS"> {{$t('ModalTurnSelect.TO_ADDRESS')}}
        </div>
        <div v-else>
          <span>{{$t('ModalTurnSelect.thisCommerceDoesntDoDelivery')}}</span>
        </div>
      </div>
      <div class="mt-2" v-if="deliveryType === 'ON_COMMERCE'">
        <PurchaseTurnSearcher :commerceId="commerceId" @callback="setTurns" v-bind:onlyFree="true"/>
        <div class="table-responsive" v-if="turns.length > 0">
          <table class="table text-center">
            <thead>
              <tr class="bold">
                <th>{{$t('ModalTurnSelect.dateTurn')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="turn in turns" :key="turn.id">
                <td>
                  <input class="mr-2" type="radio" name="turn-purchase" v-model="turnSelected" :value="turn.id"> {{turn.date}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-2" v-if="deliveryType === 'TO_ADDRESS'">
        <label>{{$t('ModalTurnSelect.address')}}</label>
        <b-input-group>
          <b-form-input v-model="address"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success" v-on:click="findAddress">
              <font-awesome-icon icon="search"/>
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <div class="m-2" v-if="showMap" v-html="map"></div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <button class="btn btn-primary float-right" type="button" v-on:click="selectTurn()">{{$t('ModalTurnSelect.select')}}</button>
        </div>
      </template>
		</b-modal>
  </div>
</template>

<script>
import PurchaseTurnSearcher from '@/components/user/commerce/turns/PurchaseTurnSearcher.vue';

import GoogleMapsService from '@/service/googleMaps/GoogleMapsService.js';


export default {
  name: 'ModalSelectTurnPurchase',
  props: {
    commerceId: Number,
    commerce: Object
  },
  components: {
    PurchaseTurnSearcher
  },
  data() {
    return {
      show: false,
      turns: [],
      turnSelected: null,
      deliveryType: null,
      address: '',
      showMap: false,
      map: '',
      canDoDelivery: false
    }
  },
  
  methods: {
    showModal() {
      this.show = true;
    },

    hideModal() {
      this.show = false;
    },

    setTurns(purchaseTurns) {
      this.turns = purchaseTurns.filter(t => t.deliveryType === 'ON_COMMERCE');
    },

    selectTurn() {
      if(this.deliveryType === null) {
        return alert(this.$t('ModalTurnSelect.youShouldSelectDeliveryType'));
      }
      let purchase = {};
      purchase.deliveryType = this.deliveryType;
      purchase.turnId = this.deliveryType === 'ON_COMMERCE' ? this.turnSelected : null;

      if(this.deliveryType === 'ON_COMMERCE') {
        if(this.turnSelected == null) {
          return alert(this.$t('ModalTurnSelect.youShouldSelectAHour'));
        }
        let turn = this.turns.find(t => t.id === this.turnSelected);
        purchase.turnHour = turn.date;

      } else {

        if(this.address === '') {
          return alert(this.$t('ModalTurnSelect.insertAddress'));
        }
        if(!this.canDoDelivery) {
          let msg = `${this.t('ModalTurnSelect.thisCommerceOnlyDoesDeliveryAt')} ${this.commerce.deliveryUp} ${this.t('ModalTurnSelect.kmAndYourAddressIsOutOfIt')}`
          return alert(msg);
        }
        purchase.address = this.address;
      }
      this.resetTurn();
      this.hideModal();
      this.$emit('select', purchase, this.commerceId);
    },

    resetTurn() {
      this.turns = [];
      this.turnSelected = null;
      this.deliveryType = null;
      this.address = '';
      this.showMap = false;
      this.map = '';
      this.canDoDelivery = false;
    },

    findAddress() {
      let address = this.address;
      let addressCommerce = this.commerce.address;
      this.map = `<img style="width: 100%" src="https://maps.googleapis.com/maps/api/staticmap?
              center=${addressCommerce}
              &markers=color:red|label:C|${addressCommerce}
              &markers=color:blue|${address}
              &size=500x400&path=color:0xff0000ff|weight:5|${addressCommerce}|${address}
              &key=${process.env.VUE_APP_GOOGLE_API_KEY}" alt="map">`;
      this.showMap = true;

      GoogleMapsService.findDistanceBetween(addressCommerce, address)
        .then(response => {
          let distanceInMetres = response.data.rows[0].elements[0].distance.value;
          let distanceInKm = distanceInMetres * 0.001;
          this.canDoDelivery = distanceInKm <= this.commerce.deliveryUp;
        })
        .catch(error => console.log(error))
    }

  }
}
</script>