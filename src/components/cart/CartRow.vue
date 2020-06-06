<template>
	<div>
		<div class="col-md-6 col-12 d-flex align-items-start">
			<img :src="product.img" class="img-product" :alt="$t('ShoppingCart.imgProductAlt')"/>
			{{product.name}}<br/>
			{{product.brand}}
		</div>
		<div class="col-md-6 col-12 product-detail-xs">
			<div class="row d-block d-md-none">
				<div class="row bold header-product d-flex justify-content-center text-center">
					<div class="col-4">{{$t('ShoppingCart.price')}}</div>
					<div class="col-3 padding-left-0">{{$t('ShoppingCart.quantity')}}</div>
					<div class="col-3">{{$t('ShoppingCart.subTotal')}}</div>
					<div class="col-2"></div>
				</div>
			</div>
			<div class="row d-flex justify-content-center align-items-center text-center">
				<div class="col-4">$ {{product.price}}</div>
				<div class="col-3 padding-left-0">
					<input class="form-control" v-numeric-pos-only v-model="product.quantity" v-on:change="updateQuantityProduct()">
				</div>
				<div class="col-3">$ {{calculateSubTotal}}</div>
				<div class="col-2 d-flex justify-content-end">
					<font-awesome-icon class="pointer" icon="times-circle" v-on:click="remove()"/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.row.product.footer {
	padding: 15px 10px;
}

.img-product {
	height: 100px;
	width: 100px;
}

@media screen and (max-width:576px){
	.product-detail-xs {
		padding: 10px 0 0 0;
	}
}
</style>

<script>
export default {
	name: 'CartRow',
	props: {
		product: { type: Object},
	},
	methods: {
		remove: function() {
			this.$emit('remove-product', this.product.productId);
		},

		updateQuantityProduct: function() {
			let quantity = Number(this.product.quantity)
			if(!isNaN(quantity)) {
				this.$emit('update-quantity', this.product.productId, this.product.offerId, this.product.quantity);
			}
		}
	},

	computed: {
		calculateSubTotal: function() {
			let quantity = Number(this.product.quantity);
			if(!isNaN(quantity)) {
				return this.product.price * quantity
			} else {
				return 0;
			}
		}
	}
}
</script>