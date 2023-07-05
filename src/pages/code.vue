<template>
<q-page class="row justify-center">
  <q-card class="col-md-8 col-xs-11">
    <p>{{driver.loadingType}}</p>
    <q-form>
      <q-select
        transition-show="jump-up"
        transition-hide="jump-up"
        filled
        v-model="driver.loadingType"
        :options="loadingFees"
        stack-label
        use-chips
        label="Loading type"
        color="secondary"
      >
<!--        <template v-slot:selected-item="scope">-->
<!--          <q-chip-->
<!--            removable-->
<!--            dense-->
<!--            @remove="scope.removeAtIndex(scope.index)"-->
<!--            :tabindex="scope.tabindex"-->
<!--            color="white"-->
<!--            text-color="secondary"-->
<!--            class="q-ma-none"-->
<!--          >-->
<!--            <q-avatar color="secondary" text-color="white" :icon="scope.opt.icon" />-->
<!--            {{ scope.opt.label + ' N ' + scope.opt.amount }}-->
<!--          </q-chip>-->
<!--        </template>-->
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption><span>&#8358;</span>{{ scope.opt.amount.toLocaleString() }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-form>
  </q-card>
</q-page>
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  import axios from "axios";
  export default {
    data () {
      return {
        loadingFees : [
          { label : 'Trailers and its equivalent', id: 1, amount: 22000, icon: 'directions_bus' },
          { label : '12 Tyres and its equivalent', id: 2, amount: 18000, icon: 'directions_bus'},
          { label : '10 Tyres and its equivalent', id: 3, amount: 18000, icon: 'directions_bus'},
          { label : 'Luxury Buses and its Equivalent', id: 4, amount: 18000,icon: 'airport_shuttle'},
          { label : '6 tyres and its equivalent', id: 5, amount: 14000, icon: 'airport_shuttle'},
          { label : 'Computer Buses and it equivalent', id: 6, amount: 14000, icon: 'airport_shuttle'},
          { label : 'Pick Up Vans and its equivalent', id: 7, amount: 2000, icon: 'local_shipping'},
          { label : 'Cars and its equivalent', id: 8, amount: 2000,icon: 'drive_eta'}
        ],
        tab: 'scan',
        driver:{
          plate_number: null,
          phone: null,
          name: null,
          state_code: null,
          loadingType : null
        },
        loading: false,
        dialog: {
          model: null,
          result: false,
          linked: false,
          notFound: false,
          deleteAccount: false
        },
        saleObj:{
          code: null,
          plate_number: null,
        },
        res: {
          data: {
            issued_date: null,
            expiry_date: null,
            status: null,
            code: null,
            genrated_by: null
          }
        },
        // field.position.latitude
        fees: [],
        position: {
          latitude: null,
          longitude: null
        },
        latitude: null,
        longitude: null,
        isValid: undefined,
        camera: 'auto',
        result: null,
      }
    },

    computed: {
      validationPending () {
        return this.isValid === undefined
          && this.camera === 'off'
      },

      validationSuccess () {
        return this.isValid === true
      },

      validationFailure () {
        return this.isValid === false
      }
    },

    methods: {
      scanAgain (result){
        if(result==='success'){
          this.dialog.result = false

        }
        else{
          this.dialog.notFound = false
        }
      },
      sell () {
        this.post('link.php' ,{
          'sale_by': this.getSession().id,
          'code': this.res.data.code,
          'plate_number': this.driver.plate_number,
          'phone': this.driver.phone,
          'name': this.driver.name,
          'state_code': this.res.data.code.slice(6, 9),
          'date': new Date()
        }).then(response =>{
          console.log(response)
        }).catch(error=>{
        })
      },
      verify(){
        const query = 'getTicket.php?id=' + this.saleObj.code
        this.get(query).then(response => {
          let gps = null
          // console.log(response)
          if(this.saleObj.code==response.data.code){
            this.res = response
            this.dialog.result = true
          }
          else{
            console.log(response)
            this.dialog.notFound = true
          }
        }).catch(error => {
          this.dialog.notFound = true
          console.log(error)
        })
      },
      geoError () {
        return 'error'
      },
      geoSuccess (position) {
        this.position.latitude = position.coords.latitude
        this.position.longitude = position.coords.longitude
      },
      geolocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
        }
      },
      onInit (promise) {
        promise
          .catch(console.error)
          .then(this.resetValidationState)
      },
      resetValidationState () {
        this.isValid = undefined
      }
    },
    mounted() {
      const query = 'readLoadingFees.php'
      this.get(query).then(response => {
        console.log(response)
      }).catch(error => {
        this.dialog.notFound = true
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
