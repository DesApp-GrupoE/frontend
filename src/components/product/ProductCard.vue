<template>
	<div class="card card-product">
		<div class="card-content">
			<img :src="product.img" class="card-img-top card-img-product" :alt="$t('productCard.imgProductAlt')"/>
		</div>
		<b-card-text class="text-center">
			{{product.name}}<br/>
			$ {{product.price}}
		</b-card-text>
		<div class="text-center">
			<b-button class="btn-product" type="button" variant="primary" v-on:click="addToCart(product.id)" v-if="!added">
				{{$t('productCard.add')}}
			</b-button>
			<b-button class="btn-product" type="button" variant="success" :title="$t('productCard.infoQuantities')" v-if="added">
				{{$t('productCard.added')}}
			</b-button>
		</div>
		<div class="text-center">
			<b-button class="btn-product" type="button" variant="primary" v-on:click="seeDetail(product.id)">
				{{$t('productCard.seeDetail')}}
			</b-button>
		</div>
	</div>
</template>

<style scoped>
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

.btn-product {
	width: 150px;
	margin-bottom: 10px;
}

/* Media sm bootstrap */
@media screen and (max-width: 768px) {
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
import CartService from '@/service/cart/CartService.js';

export default {
	name: 'ProductCard',
	props: {
		product: Object
	},
	data() {
		return {
			added: false
		}
	},
	methods: {
		addToCart: function(id) {
			CartService.addProductToCart(id)
				.then(() => this.added = true )
				.catch(() => {
					this.$emit("errorOnAddProduct")
				})
		},

		seeDetail: function(id) {
			// todo implement
			console.log(id);
		}
	}
}
</script>