<template>
	<div class="d-flex flex-wrap list-products" v-show="products.length > 0">
		<ProductCard v-for="product in products" :product="product" :key="`product-${product.id}`" 
					@errorOnAddProduct="showModalError"
		/>

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
import ProductCard from './ProductCard.vue';

export default {
	name: 'ProductList',
	components: {
		ProductCard
	},
	props: {
		products: Array
	},
	data() {
		return {
			modalErrorShow: false
		}
	},
	methods: {
		showModalError() {
			this.modalErrorShow = true;
		}
	}
}
</script>