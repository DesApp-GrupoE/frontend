<template>
  <div>
    {{$t('AbmCommerce.name')}}: {{this.commerce.name}} <br/>
    {{$t('AbmCommerce.address')}}: {{this.commerce.address}} <br/>
    {{$t('AbmCommerce.phone')}}: {{this.commerce.phone}} <br/>
    <div>
      {{$t('AbmCommerce.sectors')}}:
      <span v-for="sector in this.commerce.sectors" :key="sector">{{$t(`Commerce.sector.${sector}`)}} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AbmCommerce',
  props: {
    commerce: Object
  }
}
</script>