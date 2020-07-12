<template>
  <div class="panel-cart">
    <h2 class="bold">{{$t('FinalizePurchase.purchaseResume')}}</h2>
    <div class="table-responsive" v-if="purchases.length > 0">
      <table class="table">
        <thead>
          <tr class="bold">
            <th>{{$t('FinalizePurchase.commerce')}}</th>
            <th>{{$t('FinalizePurchase.deliveryType')}}</th>
            <th>{{$t('FinalizePurchase.dateTurn')}}</th>
            <th>{{$t('FinalizePurchase.total')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in purchases" :key="purchase.id">
            <td>{{purchase.nameCommerce}}</td>
            <td>{{$t('FinalizePurchase.' + purchase.deliveryType)}}</td>
            <td>{{purchase.turnHour}}</td>
            <td>$ {{calculateTotal(purchase.products)}}</td>
            <td>
              <!-- <b-button type="button" variant="success">
                <font-awesome-icon icon="eye"/>
              </b-button> -->
              <b-button type="button" variant="primary" class="ml-1" 
                @click="showModalTurn(purchase.commerceId)" :title="$t('FinalizePurchase.selectTurn')">
                <font-awesome-icon icon="calendar-alt"/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pt-2 d-flex justify-content-end">
      <b-button type="button" variant="primary" class="pull-right" v-on:click="finalizePurchase">{{$t('FinalizePurchase.finalizePurchase')}}</b-button>
    </div>

    <ModalSelectTurnPurchase ref="modalTurn" :commerceId="commerceId" @select="loadDataTurn" />

    <!-- Modal response -->
    <b-modal v-model="modalResponseShow" :title="modalResponse.title" @hidden="cerrarYVolverAHome(modalResponse.ok)">
      <h5 v-if="modalResponse.msg" v-html="modalResponse.msg"></h5>
      <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
      <template v-slot:modal-footer>
        <div class="w-100">
          <button class="btn btn-primary float-right" type="button" @click="cerrarYVolverAHome(modalResponse.ok)">Ok</button>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<style scoped>
.panel-cart {
	margin-top: 20px;
	padding: 10px;
	background-color: #fff;
  min-height: 75vh;
}

.table > tbody > tr > td {
  vertical-align: middle;
}
</style>

<script>
import ModalSelectTurnPurchase from './ModalSelectTurnPurchase.vue';
import CartService from '@/service/cart/CartService.js';
import PurchaseService from '@/service/purchase/PurchaseService.js'

export default {
  name: 'FinalizePurchase',
  components: {
    ModalSelectTurnPurchase
  },
  data() {
    return {
      purchases: [],
      commerceId: 0,
      modalResponseShow: false,
      modalResponse: {
        title: '',
        msg: ''
      }
    }
  },
  mounted() {
    CartService.generatePurchases()
      .then(response => {
        this.purchases = response.data;
        if(this.purchases.length < 1) {
          this.$router.push({ name: 'Home' });
        }
      })
      .catch(() => {
        this.$router.push({ name: 'Home' });
      })
  },
  methods: {
    calculateTotal(products) {
      return products.reduce((total, product) => {
        return total + product.quantity + product.price;
      }, 0)
    },

    showModalTurn(commerceId) {
      this.commerceId = commerceId;
      this.$refs.modalTurn.showModal()
    },

    setTurns(purchaseTurns) {
      this.turns = purchaseTurns.filter(t => t.deliveryType === 'ON_COMMERCE');
    },

    loadDataTurn(turnData, commerceId) {
      let purchase = this.purchases.find(p => p.commerceId === commerceId);
      purchase.deliveryType = turnData.deliveryType;
      purchase.turnId = turnData.turnId;
      purchase.turnHour = turnData.turnHour;
      purchase.address = turnData.address;
    },

    finalizePurchase() {
      let purchases = []
      this.purchases.forEach(purchase => {
        let newPurchase = {};
        newPurchase.commerceId = purchase.commerceId;
        newPurchase.deliveryType = purchase.deliveryType;
        newPurchase.turnId = purchase.turnId;
        newPurchase.address = purchase.address;
        purchases.push(newPurchase);
      });

      if(!this.isValid(purchases)) {
        return alert(this.$t('FinalizePurchase.youShouldSelectDeliveryType'));
      }

      PurchaseService.finalizePurchases(purchases)
        .then(() => {
          CartService.removeCart();
          this.modalResponse.title = null;
          let msg = `<h3>${this.$t('FinalizePurchase.purchaseMade')}</h3><a href='/profile/purchase'>${this.$t('FinalizePurchase.doClickHereIfYouWantSeeYourPurchases')}</a>`
          this.modalResponse.msg = msg
          this.modalResponse.ok = true;
          this.modalResponseShow = true;
        })
        .catch(() => {
          this.modalResponse.title = "Error";
          this.modalResponse.msg = null;
          this.modalResponse.ok = false;
          this.modalResponseShow = true;
        })
    },

    isValid(purchases) {
      return purchases.every(p => {
        return (p.deliveryType == 'TO_ADDRESS' && p.address !== '') ||
          (p.deliveryType == 'ON_COMMERCE' && p.turnId !== null);
      });
    },

    cerrarYVolverAHome(ok) {
      if(ok) {
        this.$router.push({ name: 'Home' });
      }
      this.modalResponseShow = false;
    }
  }
}
</script>