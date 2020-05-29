import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasHeart, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fasHeart, faHeart, faPlus, faShoppingCart);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    cart: {
      quantity: 0,
      items: [],
    },
    favorites: [],
  },
  getters: {
    cartItems: (state) => {
      return state.cart.items;
    }
  },
  actions: {
    addToCart({ state, commit }, product) {
      const cartItem = state.cart.items.find(item => item.beer.bid === product.beer.bid);
      if (!cartItem) {
        commit('addProductToCart', { product });
      } else {
        commit('incrementProductQuantity', cartItem);
      }
    },
    addToFavorites({ state, commit }, product) {
      const favorite = state.favorites.find(item => item.id === product.beer.bid);
      console.log({ favorite, product });
      if (!favorite) {
        commit('addProductToFavorites', { id: product.beer.bid });
      }
    },
  },
  mutations: {
    addProductToCart (state, { product }) {
      product.quantity = 1;
      state.cart.items.push(product);
      state.cart.quantity++;
    },
    incrementProductQuantity (state, { id }) {
      const cartItem = state.cart.items.find(item => item.id === id);
      cartItem.quantity++;
      state.cart.quantity++;
    },
    addProductToFavorites (state, { id }) {
      state.favorites.push({
        id,
      });
    }
  }
})

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

new Vue({
  el: "#app",
  store,
  render: h => h(App)
})
