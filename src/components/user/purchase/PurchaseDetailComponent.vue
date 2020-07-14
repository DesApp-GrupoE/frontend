<template>
  <div class="col-12" v-if="this.purchase">
    <h3 class="bold">{{$t('PurchaseDetail.purchaseDetail')}}: #{{this.purchase.id}}</h3>
    <p>
      <span class="bold">{{$t('PurchaseDetail.commerce')}}: </span>{{this.purchase.nameCommerce}} <br/>
      <span class="bold">{{$t('PurchaseDetail.date')}}: </span>{{this.purchase.date}}
    </p>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="bold">
            <th></th>
            <th>{{$t('PurchaseDetail.product.name')}}</th>
            <th>{{$t('PurchaseDetail.product.price')}}</th>
            <th>{{$t('PurchaseDetail.product.quantity')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in this.purchase.products" :key="product.id">
            <td>
              <img :src="product.img" class="img-product" :alt="$t('ShoppingCart.imgProductAlt')"/>
            </td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.quantity}}</td>
          </tr>
        </tbody>
      </table>
      <div class="mt-1 pull-right">
        <span>{{$t('PurchaseDetail.total')}}: $ {{this.calculateTotal()}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-product {
	height: 80px;
	width: 70px;
}
</style>

<script>
export default {
  name: 'PurchaseDetailComponent',
  props: {
    purchase: Object
  },
  mounted() {
    if(!this.purchase) {
      this.returnToList();
    }
  },
  methods: {
    calculateTotal() {
      return this.purchase.products.reduce((total, product) => {
        return total + (product.quantity * product.price);
      }, 0)
    },

  }
}
</script>