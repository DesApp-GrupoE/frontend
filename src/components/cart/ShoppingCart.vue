<template>
	<div class="panel-cart">
		<h2 v-if="products.length < 1">Your shopping cart is empty</h2>
		<div class="col-12 products" v-if="products.length > 0">
			<div class="row bold">
				<div class="col-md-6 col-12">Your products</div>
				<div class="col-md-6 d-md-block d-none">
					<div class="row d-flex justify-content-center text-center">
						<div class="col-4">Price</div>
						<div class="col-3 padding-left-0">Quantity</div>
						<div class="col-3">Subtotal</div>
						<div class="col-2"></div>
					</div>
				</div>
			</div>

			<CartRow class="row product" v-for="product in products" :key="`product-${product.productId}`" 
					:product="product" @remove-product="removeProduct"/>
			
			<div class="row product footer d-flex justify-content-between">
				<span class="bold">Total</span>
				<span>$ {{totalAmount}}</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.panel-cart {
	margin-top: 20px;
	padding: 10px;
	background-color: #fff;
}

.row.product {
	padding-bottom: 10px;
	margin: 15px 0;
	border-top: 1px solid #888;
	padding: 15px 0;
}

</style>

<script>
import CartRow from './CartRow.vue'

import CartService from '@/service/cart/CartService.js';

export default {
	name: 'ShoppingCart',
	components: {
		CartRow
	},
	data() {
		return {
			products: []
		}
	},
	mounted() { 
		CartService.getShoppingCart()
		.then(response => {
			this.products = response.data.cartProducts;
		});
	},
	computed: {
		totalAmount: function() {
			return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
		}
	},
	methods: {
		removeProduct: function(idProduct) {
			CartService.removeProductById(idProduct)
				.then(() => {
					let product = this.products.find(p => p.productId === idProduct);
					if(product) {
						this.products.splice(this.products.indexOf(product), 1)
					}
				})
				.catch(response => {
					console.log(response);
				})
		},

	}
}
</script>