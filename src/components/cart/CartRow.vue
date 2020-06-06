<template>
	<div>
		<div class="col-md-6 col-12 d-flex align-items-start">
			<img :src="product.img" class="img-product" alt="Product Image"/>
			{{product.name}}<br/>
			{{product.brand}}
		</div>
		<div class="col-md-6 col-12 product-detail-xs">
			<div class="row d-block d-md-none">
				<div class="row bold header-product d-flex justify-content-center text-center">
					<div class="col-4">Price</div>
					<div class="col-3 padding-left-0">Quantity</div>
					<div class="col-3">Subtotal</div>
					<div class="col-2"></div>
				</div>
			</div>
			<div class="row d-flex justify-content-center align-items-center text-center">
				<div class="col-4">$ {{product.price}}</div>
				<div class="col-3 padding-left-0">
					<input class="form-control" type="number" min="1" disabled="disabled" v-model="product.quantity">
				</div>
				<div class="col-3">$ {{product.price * product.quantity}}</div>
				<div class="col-2 d-flex justify-content-end">
					<font-awesome-icon class="pointer" icon="times-circle" v-on:click="remove(product.productId)"/>
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
		// removeProduct: { type: Function }
	},
	methods: {
		remove : function(id) {
			this.$emit('remove-product', id);
		}
	}
}
</script>