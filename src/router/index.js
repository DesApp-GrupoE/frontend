import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import i18n from '@/i18n/i18n.js';

import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import ProfileComponent from '@/components/user/ProfileComponent.vue';
import CommerceComponent from '@/components/user/CommerceComponent.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
        path: '/commerce',
        name: 'CommerceComponent',
        component: CommerceComponent
      }
    ]
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
