<template>
  <div>
    <PurchaseTurnSearcher :commerceId="commerce.id" @callback="setTurns"/>
    <CreatePurchaseTurn :commerceId="commerce.id" @success="addTurn" />

    <div class="table-response mt-3" v-if="turns.length > 0">
      <table class="table">
        <thead>
          <tr class="bold">
            <th>{{$t('AbmPurchaseTurn.date')}}</th>
            <th>{{$t('AbmPurchaseTurn.deliveryType')}}</th>
            <th>{{$t('AbmPurchaseTurn.free')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turn in turns" :key="turn.id">
            <td>{{turn.date}}</td>
            <td>{{$t('AbmPurchaseTurn.'+turn.deliveryType)}}</td>
            <td>{{(turn.idUser != null ? $t('AbmPurchaseTurn.no'): $t('AbmPurchaseTurn.yes'))}}</td>
            <td>
              <b-button type="button" variant="danger" @click="deleteTurn(turn.id)" 
                :disabled="turn.idUser != null" :title="$t('AbmPurchaseTurn.delete.' + (turn.idUser == null))">
                <font-awesome-icon class="pointer" icon="times-circle"/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
      <h5 v-if="modalResponse.msg" v-html="modalResponse.msg"></h5>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
    </b-modal>
  </div>
</template>

<script>
import PurchaseTurnSearcher from './PurchaseTurnSearcher.vue';
import CreatePurchaseTurn from './CreatePurchaseTurn.vue';

import PurchaseTurnService from '@/service/purchaseTurn/PurchaseTurnService.js';

export default {
  name: 'AbmPurchaseTurn',
  components: {
    PurchaseTurnSearcher,
    CreatePurchaseTurn
  },
  props: {
    commerce: Object,
  },
  data() {
    return {
      turns: [],
      modalResponseShow: false,
      modalResponse: {
        title: null,
        msg: null
      }
    }
  },
  methods: {
    setTurns(purchaseTurns) {
      this.turns = purchaseTurns;
    },

    addTurn(purchaseTurn) {
      this.turns.push(purchaseTurn);
    },

    deleteTurn(turnId) {
      PurchaseTurnService.deleteTurn(turnId)
        .then(() => {
          let turn = this.turns.find(t => t.id === turnId);
          this.turns.splice(this.turns.indexOf(turn), 1)
          this.modalResponse.msg = this.$t('AbmPurchaseTurn.deleted')
          this.modalResponseShow = true;
        })
        .catch(() => {
          this.modalResponse.title = "Error"
          this.modalResponse.msg = null
          this.modalResponseShow = true;
        });
    }
  }
}
</script>