<template>
  <div>
		<paginate class="paginate-list d-flex flex-wrap list-products" name="products-list" :list="products" :per="15" v-if="hasProducts">
			<ProductCard v-for="product in paginated('products-list')" :product="product" :key="`product-${product.id}`"
				@errorOnAddProduct="showModalError" />
		</paginate>

		<paginate-links v-if="hasProducts" for="products-list" :limit="3" :show-step-links="true" :async="true"
			class="justify-content-center" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}" />

		<!-- Modal error add to cart -->
		<b-modal v-model="modalErrorShow" :title="$t('ShoppingCart.modalError.title')" ok-only>
			<h4>{{$t('ShoppingCart.modalError.tryAgain')}}</h4>
		</b-modal>

  </div>
</template>

<style scoped>
.list-products {
  padding-top: 10px;
  flex-wrap: wrap;
}

/* Media sm bootstrap */
@media screen and (max-width: 768px) {
  .list-products {
    justify-content: space-between;
  }
}
</style>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard
  },
  props: {
    products: Array
  },
  data() {
    return {
      paginate: ["products-list"],
			modalErrorShow: false
    };
  },
  methods: {
    showModalError() {
      this.modalErrorShow = true;
    }
	},
	computed: {
		hasProducts() {
			return this.products.length > 0;
		}
	}
};
</script>