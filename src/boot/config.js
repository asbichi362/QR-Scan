import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader'
import { Cookies } from 'quasar'
import { LocalStorage } from 'quasar'

Vue.use(VueQrcodeReader)

Vue.mixin({
  methods: {
    setSession (credentials) {
      LocalStorage.set('session', credentials)
    },
    getSession () {
      return LocalStorage.getItem('session')
    },
    getUser () {
      return { name: this.getSession().fullname, username: this.getSession().username, time: new Date() }
    },
    endSession () {
      return LocalStorage.remove('session')
    }
  }
})
