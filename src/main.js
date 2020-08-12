console.log('Version 4')
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// UIKit
import css from 'uikit/dist/css/uikit.css';
import Icons from 'uikit/dist/js/uikit-icons';
import UIkit from 'uikit/dist/js/uikit.js'
window.UIkit= UIkit;
UIkit.use(Icons);

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { store } from './store/store'
// import Normalize from './scss/normalize.scss'
// import Variables from './scss/variables.scss'


// Sweet Alert
import Swal from 'sweetalert2'
window.Swal= Swal


Vue.config.productionTip = false
Vue.use(VueRouter)

import App from './App'
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getCode == null) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresData)) {
    if (store.getters.getSections == null) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.getCode !=null) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } 
  else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})