<template>
  <q-page class="row  justify-center ">
    <q-card flat bordered class="rounded-borders q-mt-xl col-xs-9  bg-white">
      <q-card-section class=" q-pa-lg q-mt-xl wrap fit">
        <q-form @submit.prevent="verify()"  class="wrap fit">
          <q-input
            class="text-center q-mb-sm"
            outlined
            rounded
            label-color="green"
            v-model="saleObj.code"
            type="text"
            name="plate_number"
            hint="Mask: ALGON/FCT/04/04033333"
            label="Ticket ID"
            :dense="$q.screen.lt.md"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type in the Ticket ID']">
            <template v-slot:prepend>
              <q-icon color="green" name="receipt" />
              <q-separator color="green" class="q-ml-xs" vertical />
            </template>
          </q-input>

          <q-btn
            rounded
            type="submit"
            :loading="loading"
            no-caps unelevated
            class="bg-green text-white  full-width "
          >
            Sell
            <template v-slot:loading>
              <q-spinner-facebook class="on-left" />
              Verifying Please wait...
            </template>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
    <!--if result is returned sell ticket-->
    <q-dialog full-height v-model="dialog.result" transition-hide="slide-down" transition-show="slide-up"  class="  rounded-borders">
      <div  class=" fit rounded-borders">
        <q-card class=" fullscreen  dark-frost rounded-borders  ">
          <q-toolbar class="text-left  ">
            <q-btn @click="scanAgain('success')" color="white" class="" no-caps  icon="chevron_left" flat round  v-close-popup />
            <!--                <q-toolbar-title class="text-white text-center text-white">{{res.data.code}}</q-toolbar-title>-->
          </q-toolbar>
          <!--              v-if="res.data.status!=='Sold'"-->
          <q-card-section  class="text-center">
            <q-chip size="18px" class="text-white" color="green" >
              <q-avatar color="red" text-color="white"><q-icon name="star" /></q-avatar>
              {{res.data.code}}
            </q-chip>
            <q-form @submit.prevent="sell"  class="q-mt-lg q-pa-lg">
              <q-input
                dark
                outlined
                label-color="white"
                v-model="driver.plate_number"
                type="text"
                name="plate_number"
                mask="AAA-###-AA"
                hint="Mask: ABC-200-TK"
                label="Plate Number"
                :dense="$q.screen.lt.md"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in the plate number']">
                <template v-slot:prepend>
                  <q-icon color="white" name="directions_bus" />
                  <q-separator color="white" class="q-ml-xs" vertical />
                </template>
              </q-input>
              <q-input
                dark
                outlined
                label-color="white"
                v-model="driver.phone"
                type="text"
                name="Phone"
                label="Phone"
                :dense="$q.screen.lt.md"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in the Phone number']">
                <template v-slot:prepend>
                  <q-icon color="white" name="phone" />
                  <q-separator color="white" class="q-ml-xs" vertical />
                </template>
              </q-input>
              <q-input
                dark
                outlined
                label-color="white"
                v-model="driver.name"
                type="text"
                name="name"
                label="Driver name"
                :dense="$q.screen.lt.md"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in the Driver name']">
                <template v-slot:prepend>
                  <q-icon color="white" name="person" />
                  <q-separator color="white" class="q-ml-xs" vertical />
                </template>
              </q-input>
              <q-btn
                type="submit"
                :loading="loading"
                outline
                no-caps unelevated
                class="white-opacity text-white full-width q-pt-xs q-pb-xs"
              >
                Sell
                <template v-slot:loading>
                  <q-spinner-facebook class="on-left" />
                  Linking Please wait...
                </template>
              </q-btn>
            </q-form>
          </q-card-section>
          <q-card-actions align="center">
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <!--        if not result is not return not found or try again-->
    <q-dialog transition-hide="slide-down" transition-show="slide-up" v-model="dialog.notFound" class=" validation-failure  rounded-borders">
      <div class=" rounded-borders">
        <q-card class="fullscreen  dark-frost text-green q-pa-md">
          <q-toolbar class="text-left  ">
            <!--                <q-btn label="Back" @click="scanAgain" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />-->
            <!--                <q-toolbar-title class="text-white text-center text-white">Not Found</q-toolbar-title>-->
          </q-toolbar>
          <q-card-section>
            <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
              <div class="text-center  text-red">
                <q-item-label class="text-h4 " size="md">Ticket not found</q-item-label>
                <q-chip  square size="18px" class="text-black q-mt-md q-mb-md" color=white >
                  <q-avatar color="red" text-color="white"><q-icon name="error" /></q-avatar>
                  {{this.saleObj.code}}
                </q-chip>
                <!--                    <q-btn size="xl" rounded class="mt-md" flat icon="error" color="red"  />-->
              </div>
            </div>
            <div  class="q-mt-lg ">
              <q-btn
                @click="scanAgain('failure')"
                type="submit"
                outline
                no-caps unelevated
                class="text-white full-width q-pt-xs q-pb-xs"
              >
                Go back
                <template v-slot:loading>
                  <q-spinner-facebook class="on-left" />
                  Please wait...
                </template>
              </q-btn>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <!--          <q-btn label="Scan again"  />-->
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <q-dialog v-model="dialog.linked" class="text-center validation-pending glass-top-dark rounded-borders">
      <div class="rounded-borders">
        <q-card class="">
          <q-toolbar class="text-left  ">
            <q-btn label="Scan" @click="dialog.linked=false" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />
            <!--                <q-toolbar-title class="text-white text-center text-white">Not Found</q-toolbar-title>-->
          </q-toolbar>
          <q-card-section>
            <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
              <div class="text-center ">
                <q-item-label size="sm">Linked succesfully</q-item-label>
                <q-btn class="text-white-frost"   no-caps flat  label="Forget password" />
              </div>
            </div>
            <q-form  class="q-mt-lg ">
              <q-btn
                @click="dialog.linked=false"
                type="submit"
                :loading="loading"
                outline
                no-caps unelevated
                class="white-opacity text-white full-width q-pt-xs q-pb-xs"
              >
                Sell Again
                <template v-slot:loading>
                  <q-spinner-facebook class="on-left" />
                  Please wait...
                </template>
              </q-btn>
            </q-form>
          </q-card-section>
          <q-card-actions align="center">
            <!--          <q-btn label="Scan again"  />-->
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <!--      geolocation-->
    <q-card-actions   class="fixed-bottom shadow-2 q-pa-md bg-white text-green q-mt-md " align="center">
      <q-btn outline :to="{ name: 'sale' }"  icon="crop_free"  color="green"  />
      <q-btn outline  @click="geolocation" icon="location_on"  color="green" label="GPS"  />
    </q-card-actions>
  </q-page>
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  import axios from "boot/axios";
  export default {
    data () {
      return {
        tab: 'scan',
        driver:{
          plate_number: null,
          phone: null,
          name: null,
          state_code: null
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
          // //change the status of ticket to sold
          // const query = 'sellTicket.php?id=' + this.res.data.id
          // this.post(query ,{
          //   'status': 'Sold',
          //   "issued_by": this.getSession().id
          // }).then(resp =>{
          //   this.dialog.linked = true
          //   // this.dialog.result = false
          // }).catch(errorP=>{
          // })
        }).catch(error=>{
        })

      },
      verify(){
        const query = 'getTicket.php?id=' + this.saleObj.code
        this.get(query).then(response => {
          let gps = null
          if(this.saleObj.code==response.data.code){
            this.res = response
            this.dialog.result = true
          }
          else{
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
      // console.log(axios.defaults.headers.common['Authorization'])
    }
  }
</script>

<style >
  .qrcode-stream-camera[data-v-9fc2fd96] {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    /*border-top-left-radius: 24px;*/
    display: block;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .rounded-borders {
    border-radius: 24px;
  }
  body{
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: top;
    /*background-image:url('../../public/img/master_card.jpg');*/
    /*background-image:url(https://cdn.dribbble.com/users/509048/screenshots/5546316/master_card.jpg?compress=1&resize=800x600);*/
    font-family: Arial, Helvetica;
    letter-spacing: 0.02em;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  .white-frost{
    background: rgba(240,240,240,0.8);
    backdrop-filter: saturate(180%) blur(20px);
  }
  .dark-frost{
    background-color: rgba(34,34,34,.5);
    backdrop-filter: saturate(180%) blur(20px);
  }
  .q-input {
    /*background-color: rgba(255,255,255,.15);*/
    /*color: #fff;*/
    /*padding-left: 13px;*/
    /*border-radius: 5px;*/
    /*border: 1px solid transparent;*/
  }
  .opacity{
    background-color: rgba(255,255,255,.15);
    color: #fff;
    border: 1px solid transparent;
  }
  .white-opacity{
    border-radius: 5px;
    background-color: rgba(255,255,255,.15);
    color: #fff;
    border: 1px solid transparent;
  }
  .dark-bg {
    background-color: #000;
  }
  .text-dark-frost{
    color: rgba(34,34,34,.7);
    /*backdrop-filter: saturate(180%) blur(20px);*/
  }
  .trans-text {
    background: url(../../public/img/desert.jpg)   -20px -20px no-repeat;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    /* Below is not needed */
    /*font-size: 90px;*/
    /*font-family: arial;*/
    /*font-weight: bold;*/
    /*letter-spacing: -25px;*/
    background-size: cover;
  }
  .text-white-frost{
    background: -webkit-linear-gradient(#eee, #333);
    color: rgba(240,240,240,0.8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    /*backdrop-filter: saturate(180%) blur(20px);*/
  }
  /*==== Apple UI CSS ======*/
  .q-card.left.pink{
    border-left-color: #3E4095;
    border-left-width: 4px;
    border-left-style: solid;
  }
  .silver{
    background-color: #d9d9d9;
    background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);
  }
  .blurred-box{
    position: relative;
    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: 2px;
    overflow: hidden;
  }
</style>


<style scoped>
  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    /*background-color: rgba(255, 255, 255, .8);*/
    font-weight: bold;
    font-size: 1.4rem;
    padding: 10px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  .validation-success {
    color: green;
  }
  .validation-failure {
    color: red;
  }
</style>
