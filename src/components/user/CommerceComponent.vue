<template>
  <div class="panel-profile">
    <div v-if="commerce">
      <p>
        {{$t('CommerceComp.commerce')}}: {{this.commerce.name}} <br/>
        {{$t('CommerceComp.address')}}: {{this.commerce.address}} {{this.commerce.addressNumber}}, {{this.commerce.location}} <br/>
        {{$t('CommerceComp.phone')}}: {{this.commerce.phone}}
      </p>
      <div class="mb-2">
        <button class="btn btn-primary mr-2" v-on:click="findProducts">{{$t('CommerceComp.products')}}</button>
        <button class="btn btn-primary mr-2" v-on:click="modalCreateProduct">{{$t('CommerceComp.createProduct')}}</button>
      </div>

      <div v-if="products.length">
        <div class="row mb-1">
          <div class="col-11">
            <div class="row bold header-product d-flex justify-content-center text-center">
              <div class="col-6">{{$t('CommerceComp.product.name')}}</div>
              <div class="col-3">{{$t('CommerceComp.product.stock')}}</div>
              <div class="col-3">{{$t('CommerceComp.product.price')}}</div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
        <hr>

        <div class="row mb-3" v-for="product in products" :key="product.id">
          <div class="col-11">
            <div class="row bold header-product d-flex justify-content-center text-center">
              <div class="col-6">{{product.name}}</div>
              <div class="col-3">{{product.stock}}</div>
              <div class="col-3">{{product.price}}</div>
            </div>
          </div>
          <div class="col-1">
            <font-awesome-icon class="pointer" icon="times-circle" v-on:click="removeProduct(product.id)"/>
          </div>
        </div>
      </div>

      <b-modal v-model="modalProduct" :title="$t('CommerceComp.product.formTitle')" hide-footer>
        <b-form @submit="onSubmitCreateProduct">
          <div class="d-flex justify-content-between flex-wrap">
            <b-form-input id="form-name" class="mb-2"
              :placeholder="$t('CommerceComp.product.name')" v-model="formProduct.name" type="text" required >
            </b-form-input>
            
            <b-form-input id="form-brand" class="mb-2"
              :placeholder="$t('CommerceComp.product.brand')" v-model="formProduct.brand" type="text" required >
            </b-form-input>

            <b-form-input id="form-price" class="mb-2"
              :placeholder="$t('CommerceComp.product.price')" v-model="formProduct.price" type="text" required >
            </b-form-input>

            <b-form-input id="form-stock" class="mb-2"
              :placeholder="$t('CommerceComp.product.stock')" v-model="formProduct.stock" type="text" 
              v-numeric-pos-only required >
            </b-form-input>

            <b-form-input id="form-img" class="mb-2"
              :placeholder="$t('CommerceComp.product.urlImage')" v-model="formProduct.img" type="text" required >
            </b-form-input>
          </div>

          <div class="d-flex justify-content-end">
            <b-button type="submit" variant="primary">{{$t('CommerceComp.product.create')}}</b-button>
          </div>
        </b-form>
      </b-modal>

      <b-modal v-model="modalResponseShow" :title="modalResponse.title" ok-only>
        <h5 v-if="modalResponse.msg">{{modalResponse.msg}}</h5>
        <h5 v-else>{{$t('ShoppingCart.modalError.tryAgain')}}</h5>
      </b-modal>
    </div>
    <div v-else>
      {{$t('CommerceComp.withoutCommerce')}}
    </div>
  </div>
</template>

<style scoped>
.panel-profile {
	padding: 10px;
	background-color: #fff;
}
</style>

<script>
import CommerceService from '@/service/user/CommerceService.js';
import ProductService from '@/service/user/ProductService.js';

export default {
  name: 'CommerceComponent',
  data() {
    return {
      commerce: null,
      products: [],
      modalProduct: false,
      modalResponseShow: false,
      formProduct: {
        name: null,
        price: null,
        stock: null,
        brand: null,
        img: null
      },
      modalResponse: {
				title: null,
				msg: null
			},
    }
  },
  mounted() {
    CommerceService.getCommerce()
      .then((response) => {
        this.commerce = response.data;
      })
  },
  methods: {
    findProducts() {
      ProductService.findProducts(this.commerce.id)
        .then(response => {
          this.products = response.data;
        })
    },
    removeProduct(productId) {
      ProductService.removeProduct(this.commerce.id, productId)
        .then(() => {
          let product = this.products.find(p => p.id === productId);
					if(product) {
						this.products.splice(this.products.indexOf(product), 1)
					}
        })
    },

    modalCreateProduct() {
      this.modalProduct = true;
    },

    onSubmitCreateProduct(evt) {
      evt.preventDefault();
      ProductService.createProduct(this.commerce.id, this.formProduct)
        .then(response => {
          this.products.push(response.data);
          this.formProduct = {};
          this.modalResponse.title = this.$t('CommerceComp.product.success');
          this.modalResponse.msg = this.$t('CommerceComp.product.productCreated');
          this.modalProduct = false;
				})
				.catch(error => {
					this.modalResponse.title = "Error"
					if(error.response.data) {
						this.modalResponse.msg = error.response.data.error;
					} else {
						// Set null para que muestre error generico
						this.modalResponse.msg = null;
					}
				})
				.then(() => {
					this.modalResponseShow = true;
				});
    }
  }
}
</script>
