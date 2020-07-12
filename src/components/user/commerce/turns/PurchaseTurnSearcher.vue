<template>
  <div class="row align-items-end">
    <div class="col-12 col-md-6 col-lg-4 mb-2">
      <label class="bold mb-0">{{$t('PurchaseTurnSearcher.dateFrom')}}</label>
      <VueCtkDateTimePicker id="dateFrom" v-model="formBusqueda.dateFrom" no-button-now no-button no-label
        :only-date="true" format="DD/MM/YYYY" formatted="ll"/>
    </div>
    <div class="col-12 col-md-6 col-lg-4 mb-2">
      <label class="bold mb-0">{{$t('PurchaseTurnSearcher.dateTo')}}</label>
      <VueCtkDateTimePicker id="dateTo" v-model="formBusqueda.dateTo" no-button-now no-button no-label
        :only-date="true" format="DD/MM/YYYY" formatted="ll" />
    </div>
    <div class="col-12 col-lg-4 mb-2 d-flex justify-content-end">
      <b-button variant="primary" v-on:click="searchTurns">{{$t('PurchaseTurnSearcher.searchTurns')}}</b-button>
    </div>
  </div>  
</template>

<script>
import PurchaseTurnService from '@/service/purchaseTurn/PurchaseTurnService.js'
import moment from 'moment'

export default {
  name: 'PurchaseTurnSearcher',
  props: {
    commerceId: Number
  },
  data() {
    return {
      formBusqueda: {
        dateFrom: moment().format("DD/MM/YYYY"),
        dateTo: moment().add(1, 'weeks').format("DD/MM/YYYY")
      }
    }
  },
  methods: {
    searchTurns() {
      PurchaseTurnService.getTurns(this.commerceId, this.formBusqueda.dateFrom, this.formBusqueda.dateTo)
        .then(response => {
          this.$emit("callback", response.data);
        })
        .catch(() => {
          this.$emit("callback", []);
        })
    }
  }

}
</script>