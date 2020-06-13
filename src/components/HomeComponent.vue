<template>
  <div class="main">
    <ProductForm @callback="setProducts"/>
    <ProductList :products="products"/>
    <div v-show="products.length == 0 && findProducts">
      <h2>{{$t("HomeComponent.noResults")}}</h2>
    </div>
  </div>
</template>

<script>
import ProductForm from '@/components/forms/ProductFormComponent.vue';
import ProductList from '@/components/product/ProductList.vue'

import CartService from '@/service/cart/CartService.js';

export default {
  name: 'HomeComponent',
  components: {
    ProductForm,
    ProductList
  },
  data() {
    return {
      findProducts: false,
      products: []
    }
  },
  methods: {
    setProducts: function(products) {
      this.findProducts = true;
      this.products = products;
    }
  },
  mounted() {
		CartService.checkStatusKeyOrCreateShoppingCart();
	},
}
</script>