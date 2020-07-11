<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-primary mr-2" v-on:click="modalCreateProduct">{{$t('CommerceComp.createProduct')}}</button>
      <button class="btn btn-primary mr-2" v-on:click="showModalFileCsv">{{$t('CommerceComp.product.uploadMassive')}}</button>
    </div>

    <div class="table-responsive" v-if="products.length">
      <table class="table">
        <thead>
          <tr class="bold">
            <th></th>
            <th>Id</th>
            <th>{{$t('CommerceComp.product.name')}}</th>
            <th>{{$t('CommerceComp.product.stock')}}</th>
            <th>{{$t('CommerceComp.product.price')}}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <img :src="product.img" class="img-product" :alt="$t('ShoppingCart.imgProductAlt')"/>
            </td>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.stock}}</td>
            <td>{{product.price}}</td>
            <td>
              <font-awesome-icon class="pointer" icon="times-circle" v-on:click="removeProduct(product.id)"/>
            </td>
          </tr>
        </tbody>
      </table>
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
            v-number-pos-only required >
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

    <b-modal v-model="modalFileShow" :title="$t('CommerceComp.product.csv.title')" ok-only>
      <p>
        {{$t('CommerceComp.product.csv.shouldSelectFile')}} <span class="bold">.csv</span> {{$t('CommerceComp.product.csv.containsColumns')}}<br/>
        <span class="bold">id</span>: {{$t('CommerceComp.product.csv.idProduct')}}<br/>
        <span class="bold">name</span>: {{$t('CommerceComp.product.csv.nameProduct')}} <br/>
        <span class="bold">brand</span>: {{$t('CommerceComp.product.csv.brandProduct')}} <br/>
        <span class="bold">price</span>: {{$t('CommerceComp.product.csv.priceProduct')}} <br/>
        <span class="bold">img</span>: {{$t('CommerceComp.product.csv.imgProduct')}} <br/>
        {{$t('CommerceComp.product.csv.fieldMandatory')}}
      </p>
      <b-form-file v-model="file" :state="Boolean(file)" class="mr-3"
          :placeholder="$t('CommerceComp.product.selectFile')" drop-placeholder="Drop file here..." >
      </b-form-file>

       <template v-slot:modal-footer>
        <div class="w-100">
          <button class="btn btn-primary float-right" type="button" v-on:click="submitFile()">{{$t('CommerceComp.product.upload')}}</button>
        </div>
      </template>
    </b-modal>
  </div>
</template>


<style scoped>
.img-product {
	height: 80px;
	width: 70px;
}
</style>

<script>
// import CommerceService from '@/service/user/CommerceService.js';
import ProductService from '@/service/user/ProductService.js';

export default {
  name: 'AbmProducts',
  props: {
    commerce: Object
  },
  data() {
    return {
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
      modalFileShow: false,
      file: null
    }
  },
  mounted() {
    ProductService.findProducts(this.commerce.id)
        .then(response => {
          this.products = response.data;
        })
  },
  methods: {
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
    },

    showModalFileCsv() {
      this.modalFileShow = true;
      this.file = null;
    },

    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);
      ProductService.createProductsWithCsv(this.commerce.id, formData)
        .then((response) => {
          this.addProducts(response.data);
          this.modalResponse.title = this.$t('CommerceComp.product.success');
          this.modalResponse.msg = this.$t('CommerceComp.product.productsCreated');
          this.modalResponseShow = true;
          this.modalFileShow = false;
        })
        .catch(() => {
          this.modalResponse.title = "Error"
          this.modalResponse.msg = null;
          this.modalResponseShow = true;
          this.file = null;
        });
    },

    addProducts(products) {
      let existentProducts = products.filter(p => this.existsProduct(p));
      let newProducts = products.filter(p => !this.existsProduct(p));

      this.updateProducts(existentProducts);
      this.products = this.products.concat(newProducts);
      this.products.sort((p1, p2) => p1.id - p2.id);
    },

    existsProduct(product) {
      return this.products.find(p => p.id === product.id) != undefined;
    },

    updateProducts(products) {
      products.forEach(updatedProduct => {
        let actualProduct = this.products.find(p => p.id === updatedProduct.id)
        this.products.splice(this.products.indexOf(actualProduct), 1);
        this.products.push(updatedProduct);
      });
    }
  }
}
</script>