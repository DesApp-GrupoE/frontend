<template>
	<div class="panel-cart">
		<h2 v-if="products.length < 1">{{$t('ShoppingCart.yourCartEmpty')}}</h2>
		<div class="col-12 products" v-if="products.length > 0">
			<div class="row bold">
				<div class="col-md-6 col-12">{{$t('ShoppingCart.yourProducts')}}</div>
				<div class="col-md-6 d-md-block d-none">
					<div class="row d-flex justify-content-center text-center">
						<div class="col-4">{{$t('ShoppingCart.price')}}</div>
						<div class="col-3 padding-left-0">{{$t('ShoppingCart.quantity')}}</div>
						<div class="col-3">{{$t('ShoppingCart.subTotal')}}</div>
						<div class="col-2"></div>
					</div>
				</div>
			</div>

			<CartRow class="row product" v-for="product in products" :key="`product-${product.productId}`" 
					:product="product" @remove-product="removeProduct" @update-quantity="updateQuantity"/>
			
			<div class="row product footer d-flex justify-content-between">
				<span class="bold">{{$t('ShoppingCart.total')}}</span>
				<span>$ {{totalAmount}}</span>
			</div>
			
			<div class="d-flex justify-content-end" v-if="products.length > 0">
				<b-button variant="primary" class="pull-right" v-on:click="goToFinalizePurchases">{{$t('ShoppingCart.buy')}}</b-button>
			</div>
		</div>

		<b-modal v-model="modalShow" :title="$t('ShoppingCart.modalUpdate.title')" hide-footer>
			<h4>{{$t('ShoppingCart.modalUpdate.pleaseWait')}}</h4>
			<b-progress :value="100" variant="primary" :animated="true" class="mt-3 progress-updating"></b-progress>
		</b-modal>

		<b-modal v-model="modalErrorShow" :title="$t('ShoppingCart.modalError.title')" hide-footer>
			<h4>{{$t('ShoppingCart.modalError.tryAgain')}}</h4>
			<b-button class="btn-modal-ok" variant="primary" block @click="reloadCart">Ok</b-button>
		</b-modal>
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

.btn-modal-ok {
	width: 100px;
	float: right;
}

.progress-updating {
	margin-bottom: 1rem;
}
</style>

<script>
import CartRow from './CartRow.vue'

import CartService from '@/service/cart/CartService.js';
import AuthService from '@/service/auth/AuthService.js';

export default {
	name: 'ShoppingCart',
	components: {
		CartRow
	},
	data() {
		return {
			products: [],
			modalShow: false,
			modalErrorShow: false,
			pickedProperty: null,
			modalSendProcess: false,
			form: {
				name: '',
				surname: '',
				email: '',
				password: null
			},
		}
	},
	mounted() { 
		CartService.getShoppingCart()
		.then(response => {
			this.products = response.data.cartProducts;
		})
		.catch(() => {
			this.modalErrorShow = true;
		});
	},
	computed: {
		totalAmount: function() {
			return this.products.reduce((total, product) => {
					let quantity = Number(product.quantity);
					if(!isNaN(quantity)) {
						return total + (product.price * product.quantity);
					} else {
						return 0;
					}
				}, 0);
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
				.catch(() => {
					this.modalErrorShow = true;
				})
		},

		updateQuantity: function(idProduct, idOffer, quantity) {
			if(quantity && quantity > 0) {
				this.modalShow = true;
				if(idProduct && !idOffer) {
					this.updateProductQuantity(idProduct, quantity);
				}
			}
		},

		updateProductQuantity: function(idProduct, quantity) {
			CartService.updateProductQuantity(idProduct, quantity)
				.then(() => {
					this.modalShow = false;
				})
				.catch(() => {
					this.modalErrorShow = true;
				})
		},

		reloadCart: function() {
			window.location.reload();
		},

		goToFinalizePurchases() {
			if(!AuthService.isLogged()) {
				return alert('Debes iniciar sesión para realizar tu compra');
			}
			this.$router.push({ name: 'FinalizePurchase' })
		}

	}
}
</script>