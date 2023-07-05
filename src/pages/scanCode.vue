<template>
  <q-page class="bg-blue fit col wrap justify-center justify-center row ">
    <q-card flat    class="q-mt-lg row justify-center col-xs-10 bg-transparent  col-md-3 col-xs-8 col-sm-11 ">
      <div id="content" class=" q-mt-sm">
        <qrcode-stream   class=" text-center  " :camera="camera" @decode="onDecode" @init="onInit">
          <div v-if="validationSuccess" class="validation-success ">
            This is a URL
          </div>
          <div v-if="this.camera==='off'" class="text-center validation-pending glass-top-dark rounded-borders">

            <div>
              <q-spinner-dots
                color="red"
                size="3em"
              />
              <br />
            </div>
          </div>
        </qrcode-stream>
      </div>
      <!--      geolocation-->
      <q-separator />
      <!--if result is returned -->
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
            <q-card-section>
              <div class="q-pt-xs column justify-md-center q-ma-md-sm text-center">
                <div class="text-center  text-red">
                  <q-item-label class="text-h4 " size="md">Not in the system</q-item-label>
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
                  Close
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
      <q-card-actions    class="justify-evenly fixed-bottom shadow-2  white-opacity text-black q-mt-md " align="center">
      <q-btn   stack no-caps flat  :to="{ name: 'serial' }"   icon="app_registration"  color="white"  label="Serial"  />
        <q-btn  stack no-caps flat  @click="turnCameraOn" icon="videocam"  color="white" label="On"  />
        <q-btn  stack no-caps  flat  @click="turnCameraOff" icon="videocam_off"  color="white" label="Off"  />
        <q-btn no-caps stack flat :to="{ name: 'home' }"  icon="home"  color="white" label="Home"  />
        <!--        <q-btn   stack no-caps  flat  @click="logUserOut" icon="power_settings_new"  color="black" label="Logout"  />-->
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  import { server } from 'boot/config'
  import { LocalStorage } from 'quasar'
  export default {
    data () {
      return {
        exten: '.png',
        imgUrl: 'https://zamfara.fafutuka.com.ng/uploads/',
        fourth: true,
        tab: 'scan',
        driver:{
          plate_number: null,
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
          data:{
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
      cameraStatus (){
        if (this.fourth == true){
          return this.camera === 'off'
        }
        else{
          return this.camera === 'auto'
        }
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
      sell () {
        // console.log(this.driver.plate_number)
        // console.log(this.res.data.code)

        this.post('link.php' ,{
          'code': this.res.data.code,
          'plate_number': this.driver.plate_number,
          'date': new Date()
        }).then(response =>{
          console.log(response)
          //change the status of ticket to sold
          const query = 'sellTicket.php?id=' + this.res.data.id
          this.post(query ,{
            'status': 'Sold',
            "issued_by": this.getSession().id
          }).then(resp =>{
            this.dialog.linked = true
            // this.dialog.result = false
          }).catch(errorP=>{
          })
        }).catch(error=>{
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
      },
      async onDecode (content) {
        this.result = content
        this.turnCameraOff()

        const query = 'getRecord.php?id='+content

        this.get(query).then(response => {
          // let gps = null
          console.log(response)
          if(content==response.data.code){
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

        // pretend it's taking really long
        await this.timeout(3000)
        // this.isValid = content.startsWith('http')

        // some more delay, so users have time to read the message
        await this.timeout(2000)

        this.turnCameraOn()
      },
      cameraSwicth (status) {
        console.log(status)
        this.camera = status
      },
      turnCameraOn () {
        this.camera = 'auto'
      },
      turnCameraOff () {
        this.camera = 'off'
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
    }
  }
</script>

<style >
  #content {position:relative;width:400px;height:300px;}
  #content:before, #content:after, #content>:first-child:before, #content>:first-child:after {
    position:absolute;
    width:50px; height: 50px;
    border-color: #fafafa; /* or whatever colour */
    border-style:solid;
    /* or whatever style */
    content: ' ';
  }
  #content:before {top:-4px;left:-4px;border-width: 1px 0px 0 1px}
  #content:after {top:-4px;right:-4px;border-width: 1px 1px 0 0}
  #content>:first-child:before {bottom:-4px;right:-4px;border-width: 0 1px 1px 0}
  #content>:first-child:after {bottom:-4px;left:-4px;border-width: 0 0 1px 1px}
  .qrcode-stream-camera[data-v-9fc2fd96] {
    /*border-top-left-radius: 2px;*/
    -o-object-fit: cover;
    object-fit: cover;
  }
  .rounded-borders {
    /*border-radius: 24px;*/
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
