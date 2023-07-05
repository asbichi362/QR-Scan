<template>
  <q-page class="bg-blue fit wrap column justify-center justify-center ">
    <q-card flat  class="rounded-borders  col-xs-8  bg-transparent column justify-center q-ma-md">
      <div class="q-pa-md q-gutter-sm text-center">
        <q-avatar size="170px" font-size="54px"    text-color="white"  >
          <q-img  src="../../public/img/npf.png"/>
        </q-avatar>
      </div>
      <q-card-section class=" q-mt-xl q-mb-xl  q-ma-md">
        <q-form @submit.prevent="verify()"  class="">
          <q-input
            prefix="ID"
            dark
            filled
            clearable
            class="text-center"
            label-color="white"
            v-model="saleObj.code"
            type="number"
            name="ticket"
            placeholder="Serial"
            :dense="$q.screen.lt.md"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type in the serial number']">
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
    <q-dialog maximized flat v-model="dialog.result" transition-hide="slide-down" transition-show="slide-up"  class="bg-red row">
        <div  class=" q-pa-sm color-ash rounded-borders text-center " v-if="res.data.code!=null">
            <q-avatar rounded class="  " size="130px"  >
         <q-img  :ratio="1"  class="responsive-avatar text-center" src="../../public/img/npf.png" ></q-img>
            </q-avatar>
          <div class=" q-mt-sm ">
            <q-avatar rounded class="q-card shadow-5 rounded-borders   " size="170px" font-size="54px" >
              <q-img :ratio="1" :src="imgUrl+res.data.id+this.exten" ></q-img>
            </q-avatar>
          </div>
            <q-list  class="text-grey-8 text-center" >
              <q-item >
                <q-item-section>
                  <q-item-label class="text-weight-bold text-h6 text-black">{{res.data.firstname + ' ' +res.data.surname + ' ' + res.data.othername}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="">
                <q-item-section>
                  <q-item-label class="text-h6 text-black" >{{res.data.phone}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="">
                <q-item-section>
                  <q-item-label class="text-h6 text-black" >{{res.data.lga_of_res}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          <q-list bordered class="q-mb-lg ">
            <q-expansion-item
              expand-separator
              icon="perm_identity"
              label="Biodata"
              header-class="text-grey-8"
            >
              <q-card class="bg-dark">
                <q-card-section>
                  <q-list dark separator class="q-mt-lg text-grey-8 text-center" >
                    <q-item >
                      <q-item-section>
                        <q-item-label class=" text-h6 text-amber">{{res.data.marital_status}}</q-item-label>
                        <q-item-label class=" text-h6 text-grey-8" caption>Marital Status</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label class=" text-h6 text-amber">{{res.data.gender}}</q-item-label>
                        <q-item-label class=" text-h6 text-grey-8" caption>Gender</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label class=" text-h6 text-amber">{{res.data.state_of_origin}}</q-item-label>
                        <q-item-label class=" text-h6 text-grey-8" caption>State of Origin</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label class="text-h6 text-amber">{{res.data.dob}}</q-item-label>
                        <q-item-label class="text-h6 text-grey-8" caption>Date of Birth</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
            <q-card-section  class=" relative-bottom text-center">
              <q-space />
              <q-btn
                @click="scanAgain('success')"
                type="submit"
                :loading="loading"
                no-caps unelevated
                class="white-opacity text-grey-8 full-width "
              >
                Close
                <template v-slot:loading>
                  <q-spinner-facebook class="on-left" />
                  Linking Please wait...
                </template>
              </q-btn>
            </q-card-section>
            <q-card-actions align="center">
            </q-card-actions>
        </div>
    </q-dialog>
        <!--        if not result is not return not found or try again-->
        <q-dialog transition-hide="slide-down" transition-show="slide-up" v-model="dialog.notFound" class=" validation-failure  rounded-borders">
          <div class=" rounded-borders">
            <q-card class="fullscreen  dark-frost text-green q-pa-md">
              <q-toolbar class="text-left  ">
<!--                <q-btn label="Back" @click="scanAgain" color="white" class="" no-caps  icon="chevron_left" flat rounded  v-close-popup />-->
                <!--                <q-toolbar-title class="text-grey-8 text-center text-grey-8">Not Found</q-toolbar-title>-->
              </q-toolbar>
              <q-card-section>
                <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
                  <div class="text-center  text-red">
                    <q-item-label class="text-h4 " size="md">ID not found</q-item-label>
                    <q-chip  square size="18px" class="text-black q-mt-md q-mb-md" color=white >
                      <q-avatar color="red" text-color="white"><q-icon name="error" /></q-avatar>
                      {{res.data.id}}
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
                    class="text-grey-8 full-width q-pt-xs q-pb-xs"
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
      <q-card-actions   class="fixed-bottom shadow-2  white-opacity text-black q-mt-md " align="center">
        <q-btn no-caps stack flat :to="{ name: 'scan' }"  icon="qr_code_scanner"  color="white" label="Scan"  />
        <q-btn no-caps stack flat :to="{ name: 'home' }"  icon="home"  color="white" label="Home"  />
<!--        <q-btn no-caps stack flat  @click="logUserOut" icon="power_settings_new"  color="black" label="Logout"  />-->
      </q-card-actions>
  </q-page>
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  import axios from "axios";
  export default {
    data () {
      return {
        exten: '.png',
        imgUrl: 'https://zamfara.fafutuka.com.ng/uploads/',
        fees : [
          { label : 'Trailers and its equivalent', id: '1', amount: '22000'},
          { label : '12 Tyres and its equivalent', id: '2', amount: '18000'},
          { label : '10 Tyres and its equivalent', id: '3', amount: '18000'},
          { label : 'Luxury Buses and its Equivalent', id: '4', amount: '18000'},
          { label : '6 tyres and its equivalent', id: '5', amount: '14000'},
          { label : 'Computer Buses and it equivalent', id: '6', amount: '14000'},
          { label : 'Pick Up Vans and its equivalent', id: '7', amount: '2000'},
          { label : 'Cars and its equivalent', id: '8', amount: '2000'}
        ],
        loadingFees: [],
        tab: 'scan',
        driver:{
          load_id: null,
          plate_number: null,
          phone: null,
          name: null,
          state_code: null,
          loadingType : {
            load_id: null,
            type: null,
            amount: null
          }
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
      logUserOut () {
        this.endSession()
        this.$router.push({ name: 'home' })
      },
      scanAgain (result){
        if(result==='success'){
          this.dialog.result = false

        }
        else{
          this.dialog.notFound = false
        }
      },
      sell () {
        this.dialog.result = false
        this.post('link.php' ,{
          'sale_by': this.getSession().id,
          'code': this.res.data.code,
          'plate_number': this.driver.plate_number,
          'load_id': this.driver.loadingType.load_id,
          'phone': this.driver.phone,
          'name': this.driver.name,
          'state_code': this.res.data.code.slice(6, 9),
          'date': new Date()
        }).then(response =>{
          console.log(response)
          this.dialog.linked = true
        }).catch(error=>{
        })
      },
      verify(){
        const query = 'getRecordById.php?id='+this.saleObj.code
        this.get(query).then(response => {
          let gps = null
          if(this.saleObj.code==response.data.id){
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
      // const query = 'readLoadingFees.php'
      // this.get(query).then(response => {
      //   // console.log(response.data)
      //   this.loadingFees = response.data
      //   console.log(this.loadingFees)
      // }).catch(error => {
      //   this.dialog.notFound = true
      //   console.log(error)
      // })
    }
  }
</script>

<style >
  .circle-border{
    border: 5px solid;
    border-color: #FFCC29;
  }
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
  .text-grey-8-frost{
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
