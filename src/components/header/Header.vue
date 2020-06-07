<template>
    <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand href="#">
          <router-link to="/">Home</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <router-link to="/cart">{{$t("Cart")}} <font-awesome-icon icon="shopping-cart"/></router-link>
            </b-nav-item>

            <b-nav-item-dropdown right>
              <!--  Language  -->
              <template slot="button-content">
                <span>{{$t('Language')}}</span> <font-awesome-icon icon="globe-americas"/>
              </template>
              <b-dropdown-item href="#" v-for="(lang, i) in langs" :key="`Lang${i}`" 
                                :value="lang" @click="changeLanguage(lang)">
                <div class="d-flex justify-content-between">
                  {{$t('lang.'+ lang)}}
                </div>
              </b-dropdown-item>
            </b-nav-item-dropdown>        
          </b-navbar-nav>
        </b-collapse>        
      </div>
    </b-navbar>
</template>

<style scoped>
#nav {
  font-weight: bold;
  background-color: #082f61 !important;
}

#nav a {
  color: #fff;
  text-decoration: none;
}

.nav-collapse {
  text-align: right
}

ul.dropdown-menu a {
    color: #082f61 !important;
}

.img-flag {
  width: 20px;
  height: 20px;
}
</style>

<script>
export default {
    name: 'Header',
    data () {
      return { 
        langs: ['es', 'en'] 
      }
    },
    methods: {
      changeLanguage: function(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch('language/setLanguage', lang);
      }
    }
}
</script>