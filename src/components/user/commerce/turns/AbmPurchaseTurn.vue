<template>
  <div>
    <PurchaseTurnSearcher :commerceId="commerce.id" @callback="setTurns"/>
    <CreatePurchaseTurn :commerceId="commerce.id" @success="addTurn" />

    <div v-if="turns.length > 0">
      <div class="row mb-1">
        <div class="col-11">
          <div class="row bold header-product d-flex justify-content-center text-center">
            <div class="col-6">Fecha</div>
            <div class="col-3">Tipo de entrega</div>
            <div class="col-3">Tomado</div>
          </div>
        </div>
        <div class="col-1"></div>
      </div>
      <hr>

      <div class="row mb-3" v-for="turn in turns" :key="turn.id">
        <div class="col-11">
          <div class="row bold header-product d-flex justify-content-center text-center">
            <div class="col-6">{{turn.date}}</div>
            <div class="col-3">{{turn.deliveryType}}</div>
            <div class="col-3">No</div>
          </div>
        </div>
        <div class="col-1">
          <font-awesome-icon class="pointer" icon="times-circle"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseTurnSearcher from './PurchaseTurnSearcher.vue';
import CreatePurchaseTurn from './CreatePurchaseTurn.vue';

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
    }
  },
  methods: {
    setTurns(purchaseTurns) {
      this.turns = purchaseTurns;
    },

    addTurn(purchaseTurn) {
      this.turns.push(purchaseTurn);
    }
  }
}
</script>