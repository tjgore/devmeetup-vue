import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import { store } from './store/store.js'
import DateFilter from './filters/date'

import * as firebase from 'firebase'

import AlertComp from './components/Shared/Alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#42a5f5',
  secondary: '#e3f2fd',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCuI23y8MDyddcz-PqKtUmbwsncuTZrBgQ',
      authDomain: 'dev-meetup-42193.firebaseapp.com',
      databaseURL: 'https://dev-meetup-42193.firebaseio.com',
      projectId: 'dev-meetup-42193',
      storageBucket: 'dev-meetup-42193.appspot.com',
      messagingSenderId: '452757847018'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
