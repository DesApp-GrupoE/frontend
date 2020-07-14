<template>
  <div class="col-12">
    <h2 class="bold">Sales</h2>
    <div class="table-responsive" v-if="sales.length > 0">
      <table class="table">
        <thead>
          <tr class="bold">
            <th>#</th>
            <th>{{$t('PurchaseList.client')}}</th>
            <th>{{$t('PurchaseList.date')}}</th>
            <th>{{$t('PurchaseList.total')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sale in sales" :key="sale.id">
            <td>{{sale.id}}</td>
            <td>{{sale.userName}}</td>
            <td>{{sale.date}}</td>
            <td>$ {{calculateTotal(sale.products)}}</td>
            <td>
              <b-button type="button" variant="success" @click="seeDetail(sale.id)" :title="$t('PurchaseList.seeDetail')">
                <font-awesome-icon icon="eye"/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal v-model="cartSaleDetailShow" ok-only size="lg">
      <PurchaseDetailComponent :purchase="saleSelected"/>
    </b-modal>
  </div>
</template>

<script>
import PurchaseDetailComponent from '@/components/user/purchase/PurchaseDetailComponent.vue';

import CommerceService from '@/service/user/CommerceService.js'

export default {
  name: 'SaleComponent',
  components: {
    PurchaseDetailComponent
  },
  data() {
    return {
      sales: [],
      saleSelected: null,
      cartSaleDetailShow: false
    }
  },
  mounted() {
    CommerceService.getSales()
      .then(response => {
        this.sales = response.data;
      })
      .catch(() => {
        this.sales = [];
      })
  },
  methods: {
    calculateTotal(products) {
      return products.reduce((total, product) => {
        return total + (product.quantity * product.price);
      }, 0)
    },

    seeDetail(saleId) {
      let sale = this.sales.find(s => s.id === saleId);
      this.saleSelected = sale;
      this.cartSaleDetailShow = true;
    }
  }
}
</script>