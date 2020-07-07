<template>
  <div>
    <div class="d-flex justify-content-end">
      <b-button variant="primary" v-on:click="formShow = true">{{$t("CreatePurchaseTurn.createTurn")}}</b-button>
    </div>

    <b-modal v-model="formShow" :title="$t('CreatePurchaseTurn.createTurn')" hide-footer>
      <b-form @submit="createTurn">
        <div class="d-flex flex-wrap align-items-center">
          <VueCtkDateTimePicker id="date-turn" v-model="form.date" no-button-now no-button no-label
            minute-interval="15" format="DD/MM/YYYY HH:mm" formatted="lll"/>
        </div>
        
        <b-form-select id="input-3" class="form-control mt-2" v-model="form.deliveryType" :options="deliveryTypes" required />
        
        <div class="pt-3">
          <b-button variant="primary" class="float-right" type="submit">{{$t("CreatePurchaseTurn.create")}}</b-button>
        </div>
      </b-form>
    </b-modal>

    <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
      <h5 v-if="modalResponse.msg" v-html="modalResponse.msg"></h5>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import PurchaseTurnService from '@/service/purchaseTurn/PurchaseTurnService.js'

export default {
  name: 'CreatePurchaseTurn',
  props: {
    commerceId: Number
  },
  data() {
    return {
      modalResponseShow: false,
      modalResponse: {
        title: null,
        msg: null
      },
      formShow: false,
      form: {
        idCommerce: 0,
        date: moment().hours(0).minutes(0).format("DD/MM/YYYY HH:mm"),
        deliveryType: ''
      },
      deliveryTypes: [
        { text: this.$t('TypeDelivery.ON_COMMERCE'), value: "ON_COMMERCE" }, 
        { text: this.$t('TypeDelivery.TO_ADDRESS'), value: "TO_ADDRESS" }
      ]
    }
  },
  methods: {
    setDate(date) {
      this.form.date = date;
    },

    createTurn(event) {
      event.preventDefault();
      this.form.idCommerce = this.commerceId;
      PurchaseTurnService.createTurn(this.form)
        .then(response => {
          this.modalResponse.title = null;
          this.modalResponse.msg = this.$t('CreatePurchaseTurn.turnCreated');
          this.formShow = false;
          this.modalResponseShow = true;
          this.$emit("success", response.data);
        })
        .catch()
    }
  }
}
</script>