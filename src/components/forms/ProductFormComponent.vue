<template>
  <div class="form-products">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="product-group-form"
        label-for="product-form"
      >
        <b-form-input
          id="product-form"
          v-model="form.product"
          type="text"
          required
          placeholder="Find products"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-end">
        <b-button type="submit" variant="primary">Search</b-button>
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
</style>

<script>
import ProductService from '@/service/product/ProductService.js'

export default {
    name: 'ProductForm',
    data() {
      return {
        form: {
          product: ''
        }
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        ProductService.findProducts(this.form)
          .then(products => {
            this.$emit("callback", products)
          })
          .catch(() => {
            this.$emit("callback", [])
          })        
      },
      onReset() {
        this.form.product = ''
    }
  }
}
</script>