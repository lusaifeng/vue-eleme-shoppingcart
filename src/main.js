// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import App from './App'
import VueResource from 'vue-resource'
import './less/css.less'

Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    cartTotal: 0,
    cartProducts: {}
  },
  mutations: {
    changeCartAmount: function (state, payload) {
      payload.food.cart_number += (payload.opt === 'increment' ? 1 : -1)
      if (payload.food.cart_number < 1) {
        delete state.cartProducts[payload.index]
      } else {
        Vue.set(state.cartProducts, payload.index, payload.food)
      }

      var total = 0
      for (var index in state.cartProducts) {
        var food = state.cartProducts[index]
        total = food.specfoods[0].price * food.cart_number + total
      }
      state.cartTotal = total
    },
    emptyCart: function () {
      for (var k in store.state.cartProducts) {
        store.state.cartProducts[k].cart_number = 0
      }
      store.state.cartProducts = {}
      store.state.cartTotal = 0
    }
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
