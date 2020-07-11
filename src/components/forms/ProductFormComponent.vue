<template>
  <div class="form-products">
    <b-form @submit="onSubmit" @reset="onReset">

      <div class="d-flex justify-content-between flex-wrap">
        <b-form-input id="form-address-region" class="form-group-product address"
          :placeholder="$t('productForm.yourAddress')" v-model="form.address" type="text" required >
        </b-form-input>
        <b-form-select id="form-address-kilometers" class="form-group-product kilometers"
          v-model="form.kilometers" :options="kilometers" required >
        </b-form-select>
      </div>

      <b-form-group id="product-group-form" label-for="product-form" >
        <b-form-input id="product-form"
          :placeholder="$t('productForm.findProducts')" v-model="form.product.name" type="text">
        </b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button type="submit" variant="primary">{{$t("Search")}}</b-button>
      </div>
    </b-form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-products {
  margin: 20px 0;
  padding: 20px;
  background-color: rgba(254, 254,254, 0.9);
  border-radius: 5px;
}

.form-group-product {
  margin-bottom: 10px;
}

.form-group-product.address {
  width: 70%;
}

.form-group-product.kilometers {
  width: 29%;
}

/* Media xs */
@media screen and (max-width: 576px) {
  .form-group-product.address {
    width: 100%;
  }

  .form-group-product.kilometers {
    width: 100%;
  } 
}
</style>

<script>
import ProductService from '@/service/product/ProductService.js'
import GoogleMapsService from '@/service/googleMaps/GoogleMapsService.js'

export default {
    name: 'ProductForm',
    data() {
      return {
        form: {
          address: '',
          kilometers: null,
          product: {
            name: ''
          }
        },
        kilometers: [{text: this.$t('productForm.selectRadioKm'), value: null }, 1, 3, 5, 7, 10]
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        GoogleMapsService.findPosition(this.form.address)
          .then(position => {
            return {
                county: 'county',
                region: 'region',
                kilometers: this.form.kilometers,
                latitude: position.geometry.location.lat,
                longitude: position.geometry.location.lng
              }
          })
          .catch(error => {
              console.log(error);
              return { kilometers: this.form.kilometers, county: 'test', region: 'test' }
          })
          .then((jsonAddress) => {
            let search = {
              address: jsonAddress,
              product: {
                name: this.form.product.name
              }
            }
            ProductService.findProducts(search)
              .then(response => {
                this.$emit("callback", response.data);
              })
              .catch(() => {
                this.$emit("callback", [])
              })
          });
      },
      onReset() {
        this.form.product = ''
    }
  }
}
</script>