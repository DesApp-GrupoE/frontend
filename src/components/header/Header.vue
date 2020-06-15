<template>
  <div>
    <b-navbar id="nav" toggleable="sm" type="dark" variant="dark">
      <div class="container d-flex align-items-start">
        <b-navbar-brand class="p-0">
          <router-link to="/">Home</router-link>
        </b-navbar-brand>

        <div class="d-flex-justify-content-end">
          <AuthNavItem class="d-lg-block d-none" />

          <div class="d-flex justify-content-end align-items-center">
            <AuthNavItem class="d-flex justify-content-center align-items-center d-lg-none auth-dropdown" />
            <b-navbar-toggle target="nav-collapse">
              <template>
                <font-awesome-icon icon="bars"/>
              </template>
            </b-navbar-toggle>
          </div>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto pull-right">
              <b-nav-item-dropdown right>
                <!--  Language  -->
                <template slot="button-content">
                  <font-awesome-icon icon="globe-americas"/> <span>{{$t('Language')}}</span>
                </template>
                <b-dropdown-item href="#" v-for="(lang, i) in langs" :key="`Lang${i}`"
                                  :value="lang" @click="changeLanguage(lang)">
                  <div class="d-flex justify-content-between">
                    {{$t('lang.'+ lang)}}
                  </div>
                </b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item>
                <router-link to="/cart"><font-awesome-icon icon="shopping-cart"/> {{$t("Cart")}}</router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
    </b-navbar>
  </div>
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

.auth-dropdown {
  margin-right: 10px;
}
</style>



<script>
import AuthNavItem from '@/components/auth/AuthNavItem.vue';

export default {
    name: 'Header',
    components: {
      AuthNavItem
    },
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