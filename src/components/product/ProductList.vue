<template>
	<div class="d-flex list-products" v-show="products.length > 0">
		<div class="card card-product" v-for="product in products" :key="`product-${product.id}`">
			<div class="card-content">
				<img :src="product.img" class="card-img-top card-img-product" alt="Product Image"/>
			</div>
			<b-card-text class="text-center">
				{{product.name}}<br/>
				$ {{product.price}}
			</b-card-text>
			<div class="text-center">
				<b-button type="button" variant="primary" v-on:click="addToCart(product.id)">Add</b-button>
			</div>
		</div>

		<b-modal button-size="sm" ref="user-not-logged" ok-only title="Warning">
			<div class="d-block text-center">
				<h3>You must be logged to use this funcionality</h3>
			</div>
		</b-modal>
	</div>
</template>

<style scoped>
.list-products {
	padding-top: 10px;
	flex-wrap: wrap;
}

.card-product {
	width: 24%;
	margin: 5px;
  padding: 10px;
	border: 0px;
	border-radius: 0;
	background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-title {
	margin-top: 0.75rem;
}

label > .card-title {
	width: 100%;
	font-weight: bold;
}

.card-content {
	position: relative;
	width: 100%;
	padding-top: 100%;
}

.card-img-product {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

/* Media sm bootstrap */
@media screen and (max-width: 768px) {
  .list-products {
    justify-content: space-between;
  }

  .card-product {
    width: 48%;
  }
}

/* Media xs bootstrap */
@media screen and (max-width: 576px) {
  .card-product {
    width: 100%;
  }
}
</style>

<script>
import CartService from '@/service/cart/CartService.js'
import AuthService from '@/service/auth/AuthService.js'

export default {
	name: 'ProductList',
	props: {
		products: Array
	},
	methods: {
		addToCart: function(id) {
			if(!AuthService.isLogged()) {
				return this.showModal();
			}
			CartService.addProductToCart(id)
				.then(result => console.log(result))
				.catch((error) => {
					console.log(error);
				})
		},

		showModal() {
        this.$refs['user-not-logged'].show()
      }
	}
}
</script>