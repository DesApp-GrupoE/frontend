<template>
  <div class="col-12">
    <h2 class="bold">{{$t('PurchaseList.purchases')}}</h2>
    <div class="table-responsive" v-if="purchases.length > 0">
      <table class="table">
        <thead>
          <tr class="bold">
            <th>#</th>
            <th>{{$t('PurchaseList.commerce')}}</th>
            <th>{{$t('PurchaseList.date')}}</th>
            <th>{{$t('PurchaseList.total')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in purchases" :key="purchase.id">
            <td>{{purchase.id}}</td>
            <td>{{purchase.nameCommerce}}</td>
            <td>{{purchase.date}}</td>
            <td>$ {{calculateTotal(purchase.products)}}</td>
            <td>
              <b-button type="button" variant="success" @click="seeDetail(purchase.id)" :title="$t('PurchaseList.seeDetail')">
                <font-awesome-icon icon="eye"/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h3>{{$t('PurchaseList.noPurchases')}}</h3>
    </div>

    <b-modal v-model="showPurchaseDetail" ok-only size="lg">
      <PurchaseDetailComponent :purchase="purchaseSelected"/>
    </b-modal>
  </div>
</template>

<style scoped>
.table > tbody > tr > td {
  vertical-align: middle;
}
</style>

<script>
import PurchaseDetailComponent from '@/components/user/purchase/PurchaseDetailComponent.vue';

import ProductService from '@/service/purchase/PurchaseService.js';

export default {
  name: 'PurchaseListComponent',
  components: {
    PurchaseDetailComponent
  },
  data() {
    return {
      purchases: [],
      purchaseSelected: null,
      showPurchaseDetail: false
    }
  },
  mounted() {
    ProductService.getPurchases()
      .then(response => {
        this.purchases = response.data;
      })
      .catch(() => {
        this.purchases = [];
      });
  },
  methods: {
    calculateTotal(products) {
      return products.reduce((total, product) => {
        return total + (product.quantity * product.price);
      }, 0)
    },

    seeDetail(purchaseId) {
      let purchase = this.purchases.find(p => p.id === purchaseId);
      this.purchaseSelected = purchase;
      this.showPurchaseDetail = true;
    }
  }
}
</script>