<template>
	<div class="card card-product">
		<div>
			<label class="card-title-product pl-2 pr-2">{{product.nameCommerce}}</label>
			<div class="card-content">
				<img :src="product.img" class="card-img-top card-img-product" :alt="$t('productCard.imgProductAlt')"/>
			</div>
			<b-card-text class="p-2">
				<span class="card-title-product">{{product.brand}}</span><br/>
				{{product.name}}<br/>
			</b-card-text>
		</div>
		<div>
			<span class="pl-2 pb-2">$ {{product.price}}</span>
			<div class="d-flex justify-content-around align-items-center mb-1">
				<!-- <b-button type="button" variant="secondary" v-on:click="seeDetail(product.id)" :title="$t('productCard.seeDetail')">
					<font-awesome-icon icon="eye"/>
				</b-button> -->
				<b-button class="btn-product" type="button" variant="primary" v-on:click="addToCart(product.id)" v-if="!added">
				{{$t('productCard.add')}}
				</b-button>
				<b-button class="btn-product" type="button" variant="success" :title="$t('productCard.infoQuantities')" v-if="added">
					{{$t('productCard.added')}}
				</b-button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.card-product {
	justify-content: space-between;
	width: 18.5%;
	margin: 5px;
  padding: 10px;
	border: 0px;
	border-radius: 0;
	background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-text {
	min-height: 70px;
}

.card-title-product {
	font-weight: bold;
	color: #082f61;
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
	width: 65%;
}

/* Media sm bootstrap */
@media screen and (max-width: 768px) {
  .card-product {
    width: 31%;
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