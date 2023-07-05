<template>
  <q-page class="bg-blue fit wrap column justify-center justify-center ">
<!--    <q-toolbar class="bg-transparent q-mb-4 text-green fixed-top">-->
<!--      <q-toolbar-title class="text-center">-->
<!--        {{this.getSession().fullname}}-->
<!--      </q-toolbar-title>-->
<!--      <q-btn @click="logUserOut" flat round dense icon="power_settings_new" />-->
<!--    </q-toolbar>-->
    <q-card flat  class="rounded-borders  col-xs-8  bg-transparent column justify-center q-ma-md">
      <q-card-section class=" q-mt-xl q-mb-xl  q-ma-md">
        <q-form @submit.prevent="verify"  class="">
          <q-input
            prefix="#"
            dark
            filled
            clearable
            class="text-center"
            label-color="white"
            v-model="saleObj.code"
            type="number"
            name="ticket"
            placeholder="Ticket serial"
            :dense="$q.screen.lt.md"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type in the Ticket ID']">
            <template v-slot:prepend>
              <!--              const query = 'getTicket.php?id='+'UNFOLD/'+ this.saleObj.code-->
              <!--              <q-icon color="green" name="receipt" />-->
              <!--              <q-separator size="0.4" color="grey" class="q-ml-xs" vertical />-->
            </template>
          </q-input>
          <q-btn
            type="submit"
            :loading="loading"
            no-caps unelevated
            class="q-mt-md q-pa-xs text-weight-bold white-opacity text-white  full-width "
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

    <q-dialog full-height v-model="dialog.result" transition-hide="slide-down" transition-show="slide-up"  class="  rounded-borders">
      <div  class=" fit rounded-borders">
        <q-card class=" fullscreen  dark-frost rounded-borders  ">
          <q-toolbar class="text-left  ">
            <!--                <q-btn rounded label="back" @click="scanAgain('success')" color="white" class="" no-caps  icon="chevron_left" flat round  v-close-popup />-->
            <!--                <q-toolbar-title class="text-white text-center text-white">{{res.data.code}}</q-toolbar-title>-->
          </q-toolbar>
          <q-card-section class="rounded-borders " v-if="res.data.code==='created'">
            <q-card-section class="white-opacity text-white text-center">
              <div class="text-h6">Signed in</div>
              <div class="text-subtitle2">verified</div>
            </q-card-section>
            <q-card-section class="bg-black text-white text-center">
              <div class="text-h6">{{res.data.code}}</div>
              <div class="text-subtitle2">Serial</div>
            </q-card-section>
            <q-card-section class="bg-primary text-white text-center">
              <div class="text-h6"><span>&#8358;</span>  {{res.data.cost}}</div>
              <div class="text-subtitle2"> Cost</div>
            </q-card-section>
          </q-card-section>
          <q-card-section class="rounded-borders " v-else>
            <q-card-section class="white-opacity text-white text-center">
              <div class="text-h6">Already in</div>
              <div class="text-subtitle2">{{res.data.img}}</div>
            </q-card-section>
            <!--                <q-card-section class="bg-black text-white text-center">-->
            <!--                  <div class="text-h6">{{res.data.code}}</div>-->
            <!--                  <div class="text-subtitle2">Serial</div>-->
            <!--                </q-card-section>-->
            <!--                <q-card-section class="bg-primary text-white text-center">-->
            <!--                  <div class="text-h6"><span>&#8358;</span>  {{res.data.cost}}</div>-->
            <!--                  <div class="text-subtitle2"> Cost</div>-->
            <!--                </q-card-section>-->
          </q-card-section>
          <!--              v-if="res.data.status!=='Sold'"-->
          <q-card-section  class="text-center">
            <q-space />
            <q-btn
              @click="scanAgain('success')"
              type="submit"
              :loading="loading"
              outline
              no-caps unelevated
              class="white-opacity text-white full-width q-pt-xs q-pb-xs q-mt-lg"
            >
              Back
              <template v-slot:loading>
                <q-spinner-facebook class="on-left" />
                Linking Please wait...
              </template>
            </q-btn>
          </q-card-section>
          <q-card-actions align="center">
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <q-card   class=" col-xs-10 bg-transparent   rounded-borders col-md-4 col-xs-11 col-sm-11 q-mt-xl">
      <q-card-actions   class=" justify-around fixed-bottom   white-opacity q-mt-md " align="center">
        <q-btn stack  flat @click="logUserOut" icon="power_settings_new"  color="black"  />
      </q-card-actions>
    </q-card>
    <!--    success dialog-->
    <!--    not success dialog-->


  </q-page>
  <!--  http://api.scapo.org.ng/api/getChildren.php?id=40-->
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  export default {
    data () {
      return {
        saleObj:{
          code: null,
          plate_number: null,
        },
        dialog: {
          model: null,
          result: false,
          newAccount: false,
          notFound: false,
          gps: false
        },
        loading: false,
        res: {
          data:{
            issued_date: null,
            expiry_date: null,
            status: null,
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
      verify(){
        const query = 'getTicket.php?id='+this.saleObj.code
        this.get(query).then(response => {
          let gps = null
          console.log(response)
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
      sell () {
        // this.dialog.result = false
        this.post('link.php' ,{
          'code': this.saleObj.code,
          'cost': 'online',
          'status': 'Signedin',
          'img': 'online'
        }).then(response =>{
          // this.dialog.linked = true
        }).catch(error=>{
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
