import Vue from 'vue'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const url = 'https://zamfara.fafutuka.com.ng/api/'
// const url = 'http://localhost/tickets/api/'

if (LocalStorage.has('hash')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer: ' + LocalStorage.getItem('hash')
  // axios.defaults.headers.post['Authorization'] = 'Bearer: ' + LocalStorage.getItem('hash')// for POST requests
}
else {
  console.log("no headers sent")
}


Vue.mixin({
  methods: {
    get (id) {
      return axios.get(url + id)
    },
    put (id, data) {
      return axios.put(insertUrl + id, data)
    },
    post (id, data) {
      return axios.post(url + id, data)
    },
    del (id) {
      return axios.delete(url + id)
    },
    patch (id, data) {
      return axios.patch(url + id, data)
    },
    persistToken (jwt) {
      LocalStorage.set('hash', jwt)
    }
  }
})


// server.put('/45.05', {
//   name: 'test'
// }).then(response => {
//   console.log(response)
// }).catch(error => {
//   console.log(error)
// })
