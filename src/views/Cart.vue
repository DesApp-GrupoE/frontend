<template>
  <div class="cart">
    <ShoppingCart/>
  </div>
</template>

<script>
import ShoppingCart from '@/components/cart/ShoppingCart.vue';


export default {
  name: 'Cart',
  components: {
    ShoppingCart
  }
}
</script>