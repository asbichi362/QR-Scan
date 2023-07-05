<template>
  <q-page class="row  justify-center bg-green">
    <q-toolbar class="bg-transparent q-mb-4 text-white fixed-top">
      <q-btn v-if="this.getSession().role==='seller'" flat round dense icon="account_balance_wallet" />
      <q-btn v-if="this.getSession().role==='scanner'" flat round dense icon="security" />
      <q-toolbar-title class="text-center">
        {{this.getSession().fullname}}
      </q-toolbar-title>
      <q-btn @click="logUserOut" flat round dense icon="power_settings_new" />
    </q-toolbar>
    <q-card    class=" col-xs-10 white-opacity   rounded-borders col-md-4 col-xs-11 col-sm-11 q-mt-xl">
      <q-card-section  class="">
        <q-form @submit.prevent="verify()"  class="q-mt-lg">
          <q-input
            dark
            outlined
            label-color="white"
            v-model="verifyObj.code"
            type="text"
            name="plate_number"
            hint="Mask: ALGON/KN/APR/2"
            label="Ticket ID"
            :dense="$q.screen.lt.md"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type in the Ticket ID']">
            <template v-slot:prepend>
              <q-icon color="white" name="receipt" />
              <q-separator color="white" class="q-ml-xs" vertical />
            </template>
          </q-input>
          <q-btn
            type="submit"
            :loading="loading"
            no-caps unelevated
            class="dark-frost text-white  full-width q-mt-md q-pt-xs q-pb-xs"
          >
            Verify
            <template v-slot:loading>
              <q-spinner-facebook class="on-left" />
              Verifying Please wait...
            </template>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card   class=" col-xs-10 bg-transparent   rounded-borders col-md-4 col-xs-11 col-sm-11 q-mt-xl">
        <!--        if not result is not return not found or try again-->
        <div v-if="dialog.notFound!=false" class=" validation-failure  rounded-borders">
          <div class="desert-bg rounded-borders">
            <q-card class=" full-height  glass-top-dark rounded-borders q-pa-md">
              <q-toolbar class="text-left  ">
                <q-btn label="Scan" @click="scanAgain('failure')" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />
                <!--                <q-toolbar-title class="text-white text-center text-white">Not Found</q-toolbar-title>-->
              </q-toolbar>
              <q-card-section>
                <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
                  <div class="text-center ">
                    <q-item-label size="sm">Ticket not found</q-item-label>
                    <q-btn class="text-white-frost"   no-caps flat  label="Forget password" />
                  </div>
                </div>
                <q-form  class="q-mt-lg ">
                  <q-btn
                    @click="scanAgain"
                    type="submit"
                    :loading="loading"
                    outline
                    no-caps unelevated
                    class="white-opacity text-white full-width q-pt-xs q-pb-xs"
                  >
                    Scan Again
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
        </div>
        <!--        gps not found-->
        <div v-if="dialog.gps!=false" class=" validation-failure  rounded-borders">
          <div class="desert-bg rounded-borders">
            <q-card class=" full-height  glass-top-dark rounded-borders q-pa-md">
              <q-toolbar class="text-left  ">
                <q-btn label="Scan" @click="dialog.gps=false" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />
                <!--                <q-toolbar-title class="text-white text-center text-white">Not Found</q-toolbar-title>-->
              </q-toolbar>
              <q-card-section>
                <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
                  <div class="text-center ">
                    <q-item-label class="text-white" size="sm">GPS Error<q-icon color="white" name="location_off" /></q-item-label>
                    <q-btn class="text-white-frost"   no-caps flat  label="Forget password" />
                  </div>
                </div>
                <q-form  class="q-mt-lg ">
                  <q-btn
                    @click="geolocation"
                    type="submit"
                    :loading="loading"
                    outline
                    no-caps unelevated
                    class="white-opacity text-white full-width q-pt-xs q-pb-xs"
                  >
                    Turn on your GPS and turn back to the App
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
        </div>

        <div v-if="this.camera==='off'" class="text-center validation-pending glass-top-dark rounded-borders">
          <div>
            <q-spinner-dots
              color="red"
              size="3em"
            />
          </div>
        </div>
      <!--      geolocation-->
      <q-card-actions  class="fixed-bottom shadow-2 q-pa-md dark-frost q-mt-md " align="center">
        <q-btn outline :to="{ name: 'scan' }"  icon="crop_free"  color="white"  />
        <q-btn outline @click="logUserOut" icon="power_settings_new"  color="white"  />
      </q-card-actions>
    </q-card>
    <!--if result is returned sell ticket-->
    <q-dialog transition-hide="slide-down" transition-show="slide-up" v-model="dialog.result" class=" validation-failure  rounded-borders">
      <div  class="column fit rounded-borders">
        <q-card class="col self-center fullscreen  dark-frost rounded-borders  ">
          <q-toolbar class="text-left  ">
            <q-btn label="Back" @click="scanAgain('success')" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />
          </q-toolbar>
          <q-card-section class="p-mt-xl">
            <!--                <h4 class="text-center  text-white">Valid Ticket</h4>-->
            <q-list class="rounded-borders q-pa-xs" separator bordered>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.name }}</q-item-label>
                  <q-item-label class="text-white" overline>Fullname</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="directions_bus" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.type}}</q-item-label>
                  <q-item-label class="text-white" caption>Car type</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="account_balance_wallet" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption><span class="text-white">&#8358;</span>{{ this.res.data.amount.toLocaleString() }}</q-item-label>
                  <q-item-label class="text-white" caption>Payable amount</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="directions_bus" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.plate_number}}</q-item-label>
                  <q-item-label class="text-white" caption>Plate Number</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="receipt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.code}}</q-item-label>
                  <q-item-label class="text-white" caption>Ticket ID</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.issued_date}}</q-item-label>
                  <q-item-label class="text-white" caption>Date issued</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon color="white" name="event" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-white" caption>{{res.data.expiry_date}}</q-item-label>
                  <q-item-label class="text-white" caption>Expiry Date</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="center">
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <!--    success dialog-->
  </q-page>
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  export default {
    data () {
      return {

        dialog: {
          model: null,
          result: false,
          newAccount: false,
          notFound: false,
          gps: false
        },
        verifyObj:{
          code: null,
          plate_number: null,
        },
        loading: false,
        res: {
          data:{
            issued_date: null,
            expiry_date: null,
            status: null,
            genrated_by: null,
            amount: 1
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
      amount () {
       return  this.res.data.amount.toLocaleString()
      },
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
      verify(){
        if(this.position.latitude === null){
          //show the gps prompt
          this.dialog.gps = true
        }
        // GPS is grabbed do scan and upload
        else {
          const query = 'getSale.php?id=' + this.verifyObj.code
          this.get(query).then(response => {
            // console.log(response)
            // let gps = null
            if(this.verifyObj.code==response.data.code){

              this.res = response
              console.log(response)
              this.dialog.result = true
              this.post('uploadScan.php',{
                'code': this.res.data.code,
                'plate_number': this.res.data.plate_number,
                'scan_by': this.getSession().id,
                'date': new Date(),
                'latit': this.position.latitude,
                'longt': this.position.longitude
              }).then(res =>{

                this.dialog.result = true

              }).catch(error=>{
              })
            }
            else{
              this.dialog.notFound = true
            }
          }).catch(err => {
            this.dialog.notFound = true
          })
        }
      },
      timeout (ms) {
        return new Promise(resolve => {
          window.setTimeout(resolve, ms)
        })
      },
      logUserOut () {
        this.endSession()
        this.$router.push({ name: 'home' })
      }
    },

    mounted () {
      this.geolocation()
      if (this.getSession() === undefined || this.getSession() === null) {
        this.$router.push({ name: 'home' })
      }
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
    background-image:url('../../public/img/master_card.jpg');
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

  .blurred-box:after{
    content: '';
    width: inherit;
    height: inherit;
    background: inherit;
    position: absolute;
    bottom: 0;
    box-shadow: inset 0 0 0 200px rgba(255,255,255,0.05);
    filter: blur(10px);
  }

  /* Form which you dont need */
  .user-login-box{
    position: relative;
    margin-top: 50px;
    text-align: center;
    z-index: 1;
  }
  .user-login-box > *{
    display: inline-block;
    width: 200px;
  }


  .user-name{
    margin-top: 15px;
    margin-bottom: 15px;
    color: white;
  }

  input.user-password{
    width: 220px;
    height: 38px;
    opacity: 0.4;
    border-radius: 2px;
    padding: 5px 15px;
    border: 0;
  }
  body {
    font-family: 'Josefin Sans', sans-serif;
    box-sizing: border-box;
  }
  .container-fluid{
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    background: #FFF;
  }
  /* ============= Animation background ========= */
  .background{
    background: linear-gradient(180deg, #FFCC29, #3E4095, #212335);
    /*background-size: 400% 400%;*/
    animation: Gradient 15s ease infinite;
    position: absolute;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    padding:0;
    margin:0px;
    z-index: 1;
  }
  .cube {
    position: absolute;
    top: 80vh;
    left: 45vw;
    width: 10px;
    height: 10px;
    border: solid 1px #D7D4E4;
    transform-origin: top left;
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    animation: cube 12s ease-in forwards infinite;
  }
  .cube:nth-child(2n) {
    border-color: #FFF ;
  }
  .cube:nth-child(2) {
    animation-delay: 2s;
    left: 25vw;
    top: 40vh;
  }
  .cube:nth-child(3) {
    animation-delay: 4s;
    left: 75vw;
    top: 50vh;
  }
  .cube:nth-child(4) {
    animation-delay: 6s;
    left: 90vw;
    top: 10vh;
  }
  .cube:nth-child(5) {
    animation-delay: 8s;
    left: 10vw;
    top: 85vh;
  }
  .cube:nth-child(6) {
    animation-delay: 10s;
    left: 50vw;
    top: 10vh;
  }
  /* Animate Background*/
  /*@keyframes Gradient {*/
  /*  0% {*/
  /*    background-position: 0% 50%;*/
  /*  }*/
  /*  50% {*/
  /*    background-position: 100% 50%;*/
  /*  }*/
  /*  100% {*/
  /*    background-position: 0% 50%;*/
  /*  }*/
  /*}*/
  /*@keyframes cube {*/
  /*  from {*/
  /*    transform: scale(0) rotate(0deg) translate(-50%, -50%);*/
  /*    opacity: 1;*/
  /*  }*/
  /*  to {*/
  /*    transform: scale(20) rotate(960deg) translate(-50%, -50%);*/
  /*    opacity: 0;*/
  /*  }*/
  /*}*/
</style>


<style scoped>
  .validation-success,
  .validation-failure,
  .validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, .8);
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
