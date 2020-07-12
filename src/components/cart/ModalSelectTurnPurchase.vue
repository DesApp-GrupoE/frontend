<template>
  <div>
    <b-modal v-model="show" :title="$t('ModalTurnSelect.title')">
      <div>
        <input class="mr-2" type="radio" name="type-turn" v-model="deliveryType" value="ON_COMMERCE"> {{$t('ModalTurnSelect.ON_COMMERCE')}}<br/>
        <input class="mr-2" type="radio" name="type-turn" v-model="deliveryType" value="TO_ADDRESS"> {{$t('ModalTurnSelect.TO_ADDRESS')}}
      </div>
      <div class="mt-2" v-if="deliveryType === 'ON_COMMERCE'">
        <PurchaseTurnSearcher :commerceId="commerceId" @callback="setTurns"/>
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
        <input type="text" class="form-control" v-model="address">
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

export default {
  name: 'ModalSelectTurnPurchase',
  props: {
    commerceId: Number
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
    },

  }
}
</script>