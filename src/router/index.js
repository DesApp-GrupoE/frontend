import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import i18n from '@/i18n/i18n.js';

import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import AuthView from '@/components/auth/AuthView.vue';
import ProfileComponent from '@/components/user/ProfileComponent.vue';
import CommerceComponent from '@/components/user/CommerceComponent.vue';
import AbmCommerce from '@/components/user/commerce/AbmCommerce.vue';
import AbmProducts from '@/components/user/commerce/AbmProducts.vue';
import AbmPurchaseTurn from '@/components/user/commerce/turns/AbmPurchaseTurn.vue';
import SettingsComponent from '@/components/user/settings/SettingsComponent.vue';
import OAuth2Redirect from '@/components/auth/oauth2/OAuth2Redirect.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oauth2/redirect',
    name: 'OAuth2',
    component: OAuth2Redirect
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/auth',
    name: 'AuthView',
    component: AuthView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      checkToken(to, from, next)
    },
    children: [
      {
        path: '/',
        name: 'ProfileComponent',
        component: ProfileComponent
      },
      {
        path: '/profile/commerce',
        name: 'CommerceComponent',
        component: CommerceComponent,
        children: [
          {
            path: '/profile/commerce/',
            name: 'AbmCommerce',
            component: AbmCommerce
          },
          {
            path: '/profile/commerce/products',
            name: 'AbmProducts',
            component: AbmProducts
          },
          {
            path: '/profile/commerce/turns',
            name: 'AbmPurchaseTurn',
            component: AbmPurchaseTurn
          }
        ]
      },
      {
        path: '/profile/settings',
        name: 'SettingsComponent',
        component: SettingsComponent
      },
    ]
  },
  {
    path :'*',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.language.language && store.state.language.language !== i18n.locale) {
    i18n.locale = store.state.language.language;
    next();
  } else if (!store.state.language.language) {
    store.dispatch('language/setLanguage', navigator.languages)
      .then(() => {
        i18n.locale = store.state.language.language;
        next();
      });
  } else {
    next();
  }
});

function checkToken(to, from, next) {
  let token = localStorage.getItem('token');
  if(token) {
    next();
  } else {
    window.location.href = "/";
  }
}

export default router
