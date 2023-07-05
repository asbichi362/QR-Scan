<!--<template>-->
<!--  <q-page padding class="fit column wrap justify-center items-center content-center">-->
<!--    <q-card bordered dark flat class=" rounded-borders  q-pa-lg shadow-10  " >-->
<!--      <q-img-->
<!--        src="../../public/img/npf.png"-->
<!--      />-->
<!--      <q-card-section class=" ">-->
<!--        &lt;!&ndash;            <span class="text-h5">Nigerian Police Force</span>&ndash;&gt;-->
<!--        <q-form @submit.prevent="logUserIn" class="q-mt-lg">-->
<!--          <q-input-->
<!--            rounded-->
<!--            dark-->
<!--            standout="bg-info text-white"-->
<!--            label-color="white"-->
<!--            v-model.trim="user.username"-->
<!--            type="text"-->
<!--            name="username"-->
<!--            label="Username"-->
<!--            :dense="$q.screen.lt.md"-->
<!--            lazy-rules-->
<!--            :rules="[ val => val && val.length > 0 || 'Please type in  Username']">-->
<!--            <template v-slot:prepend>-->
<!--              <q-icon color="white" name="person" />-->
<!--            </template>-->
<!--          </q-input>-->
<!--          <q-input rounded standout="bg-info text-white"  dark  :type="isPwd ? 'password' : 'text'" hint=""-->
<!--                   label-color="white"-->
<!--                   name="password"-->
<!--                   label="Password"-->
<!--                   :dense="$q.screen.lt.md"-->
<!--                   lazy-rules-->
<!--                   v-model.trim="user.password"-->
<!--                   :rules="[ val => val && val.length > 0 || 'Please type in Password']"-->
<!--          >-->
<!--            <template v-slot:prepend>-->
<!--              <q-icon name="lock" color="white" />-->
<!--            </template>-->
<!--            <template v-slot:append>-->
<!--              <q-icon-->
<!--                :name="isPwd ? 'visibility_off' : 'visibility'"-->
<!--                class="cursor-pointer"-->
<!--                @click="isPwd = !isPwd"-->
<!--              />-->
<!--            </template>-->
<!--          </q-input>-->
<!--          <q-btn-->
<!--            rounded-->
<!--            type="submit"-->
<!--            :loading="loading"-->
<!--            no-caps unelevated-->
<!--            class="white-opacity full-width q-pt-xs q-pb-xs"-->
<!--          >-->
<!--            Sign in-->
<!--            <template v-slot:loading>-->
<!--              <q-spinner-facebook class="on-left" />-->
<!--              Signing in...-->
<!--            </template>-->
<!--          </q-btn>-->
<!--          <div class="q-pt-xs column q-ma-md-sm text-center">-->
<!--            <div class="text-center ">-->
<!--              &lt;!&ndash;                  <q-item-label size="sm">Don't have an Account?</q-item-label>&ndash;&gt;-->
<!--              <q-btn rounded :to="{ name: 'home' }" icon="chevron_left" class="text-white-frost"   no-caps flat  label="Home" />-->
<!--              <q-btn class="text-white-frost"   no-caps flat  label="Forget password" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-form>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--  </q-page>-->
<!--</template>-->

<!--<script>-->
<!--  import {LocalStorage} from 'quasar'-->
<!--  import {Cookies} from 'quasar'-->
<!--  export default {-->
<!--    data: () => ({-->
<!--      cookieOption: { expires: '', path: '/', domain: 'https://app.securealgon.ng/' , sameSite: 'Strict', httpOnly: true, secure: true },-->
<!--      data: {},-->
<!--      user: {},-->
<!--      isPwd: true,-->
<!--      loading: false-->
<!--    }),-->

<!--    methods: {-->
<!--      logUserIn () {-->
<!--        this.loading = !this.loading-->
<!--        const query = 'login.php'-->
<!--        this.post(query, this.user).then(response => {-->
<!--          // console.log(response)-->
<!--          LocalStorage.set('hash',response.data.jwt)-->
<!--          this.persistToken(response.data.jwt)-->
<!--          // this.$q.cookies.set('token', response.data.jwt, { expires:'',path:'/',domain:'',sameSite:'Strict',httpOnly: false,secure:true})-->

<!--          this.setSession(response.data)-->
<!--          this.loading = !this.loading-->
<!--          if(response.data.role==='scanner'){-->
<!--            this.$router.push({ name: 'scan' })-->
<!--          }-->
<!--          else if (response.data.role==='seller'){-->
<!--            this.$router.push({ name: 'sale' })-->
<!--          }-->
<!--          else if (response.data.role==='loader'){-->
<!--            this.$router.push({ name: 'loadByScan' })-->
<!--          }-->
<!--          // console.log(response.data)-->
<!--          // this.$router.push({ name: 'scan' })-->
<!--        }).catch(error => {-->
<!--          console.log(error)-->
<!--          this.loading = !this.loading-->
<!--          this.$q.notify({-->
<!--            type: 'negative',-->
<!--            message: 'Account does not exist'-->
<!--          })-->
<!--          return error-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      console.log(this.$q.localStorage.getItem('hash'))-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <q-page class="row  justify-center ">&ndash;&gt;-->
<!--&lt;!&ndash;    <q-card   class=" col-xs-10 bg-transparent   rounded-borders col-md-4 col-xs-11 col-sm-11 q-mt-lg">&ndash;&gt;-->
<!--&lt;!&ndash;      <q-card-actions  class="fixed-bottom shadow-2 q-pa-md dark-frost q-mt-md " align="center">&ndash;&gt;-->
<!--&lt;!&ndash;        <q-btn outline  no-caps @click="geolocation"  color="white" label="Login"  />&ndash;&gt;-->
<!--&lt;!&ndash;      </q-card-actions>&ndash;&gt;-->
<!--&lt;!&ndash;    </q-card>&ndash;&gt;-->
<!--&lt;!&ndash;    &lt;!&ndash;    success dialog&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;  </q-page>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;  import { server } from 'boot/config'&ndash;&gt;-->
<!--&lt;!&ndash;  export default {&ndash;&gt;-->

<!--&lt;!&ndash;    data () {&ndash;&gt;-->
<!--&lt;!&ndash;      return {&ndash;&gt;-->

<!--&lt;!&ndash;        dialog: {&ndash;&gt;-->
<!--&lt;!&ndash;          model: null,&ndash;&gt;-->
<!--&lt;!&ndash;          result: false,&ndash;&gt;-->
<!--&lt;!&ndash;          newAccount: false,&ndash;&gt;-->
<!--&lt;!&ndash;          notFound: false,&ndash;&gt;-->
<!--&lt;!&ndash;          deleteAccount: false&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        res: {&ndash;&gt;-->
<!--&lt;!&ndash;          data:{&ndash;&gt;-->
<!--&lt;!&ndash;            issued_date: null,&ndash;&gt;-->
<!--&lt;!&ndash;            expiry_date: null,&ndash;&gt;-->
<!--&lt;!&ndash;            status: null,&ndash;&gt;-->
<!--&lt;!&ndash;            genrated_by: null&ndash;&gt;-->
<!--&lt;!&ndash;          }&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        // field.position.latitude&ndash;&gt;-->
<!--&lt;!&ndash;        position: {&ndash;&gt;-->
<!--&lt;!&ndash;          latitude: null,&ndash;&gt;-->
<!--&lt;!&ndash;          longitude: null&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        latitude: null,&ndash;&gt;-->
<!--&lt;!&ndash;        longitude: null,&ndash;&gt;-->
<!--&lt;!&ndash;        isValid: undefined,&ndash;&gt;-->
<!--&lt;!&ndash;        camera: 'auto',&ndash;&gt;-->
<!--&lt;!&ndash;        result: null,&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->

<!--&lt;!&ndash;    computed: {&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->

<!--&lt;!&ndash;    methods: {&ndash;&gt;-->

<!--&lt;!&ndash;    },&ndash;&gt;-->

<!--&lt;!&ndash;    mounted () {&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style >&ndash;&gt;-->
<!--&lt;!&ndash;  .qrcode-stream-camera[data-v-9fc2fd96] {&ndash;&gt;-->
<!--&lt;!&ndash;    width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;    /*border-top-left-radius: 24px;*/&ndash;&gt;-->
<!--&lt;!&ndash;    display: block;&ndash;&gt;-->
<!--&lt;!&ndash;    -o-object-fit: cover;&ndash;&gt;-->
<!--&lt;!&ndash;    object-fit: cover;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .rounded-borders {&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 24px;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  body{&ndash;&gt;-->
<!--&lt;!&ndash;    background-repeat: no-repeat;&ndash;&gt;-->
<!--&lt;!&ndash;    background-attachment: fixed;&ndash;&gt;-->
<!--&lt;!&ndash;    background-size: cover;&ndash;&gt;-->
<!--&lt;!&ndash;    background-position: top;&ndash;&gt;-->
<!--&lt;!&ndash;    background-image:url('../../public/img/master_card.jpg');&ndash;&gt;-->
<!--&lt;!&ndash;    /*background-image:url(https://cdn.dribbble.com/users/509048/screenshots/5546316/master_card.jpg?compress=1&resize=800x600);*/&ndash;&gt;-->
<!--&lt;!&ndash;    font-family: Arial, Helvetica;&ndash;&gt;-->
<!--&lt;!&ndash;    letter-spacing: 0.02em;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: 400;&ndash;&gt;-->
<!--&lt;!&ndash;    -webkit-font-smoothing: antialiased;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .white-frost{&ndash;&gt;-->
<!--&lt;!&ndash;    background: rgba(240,240,240,0.8);&ndash;&gt;-->
<!--&lt;!&ndash;    backdrop-filter: saturate(180%) blur(20px);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .dark-frost{&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgba(34,34,34,.5);&ndash;&gt;-->
<!--&lt;!&ndash;    backdrop-filter: saturate(180%) blur(20px);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .q-input {&ndash;&gt;-->
<!--&lt;!&ndash;    /*background-color: rgba(255,255,255,.15);*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*color: #fff;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*padding-left: 13px;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*border-radius: 5px;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*border: 1px solid transparent;*/&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .opacity{&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgba(255,255,255,.15);&ndash;&gt;-->
<!--&lt;!&ndash;    color: #fff;&ndash;&gt;-->
<!--&lt;!&ndash;    border: 1px solid transparent;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .white-opacity{&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 5px;&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgba(255,255,255,.15);&ndash;&gt;-->
<!--&lt;!&ndash;    color: #fff;&ndash;&gt;-->
<!--&lt;!&ndash;    border: 1px solid transparent;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .dark-bg {&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: #000;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .text-dark-frost{&ndash;&gt;-->
<!--&lt;!&ndash;    color: rgba(34,34,34,.7);&ndash;&gt;-->
<!--&lt;!&ndash;    /*backdrop-filter: saturate(180%) blur(20px);*/&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .trans-text {&ndash;&gt;-->
<!--&lt;!&ndash;    background: url(../../public/img/desert.jpg)   -20px -20px no-repeat;&ndash;&gt;-->
<!--&lt;!&ndash;    -webkit-text-fill-color: transparent;&ndash;&gt;-->
<!--&lt;!&ndash;    -webkit-background-clip: text;&ndash;&gt;-->
<!--&lt;!&ndash;    /* Below is not needed */&ndash;&gt;-->
<!--&lt;!&ndash;    /*font-size: 90px;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*font-family: arial;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*font-weight: bold;*/&ndash;&gt;-->
<!--&lt;!&ndash;    /*letter-spacing: -25px;*/&ndash;&gt;-->
<!--&lt;!&ndash;    background-size: cover;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .text-white-frost{&ndash;&gt;-->
<!--&lt;!&ndash;    background: -webkit-linear-gradient(#eee, #333);&ndash;&gt;-->
<!--&lt;!&ndash;    color: rgba(240,240,240,0.8);&ndash;&gt;-->
<!--&lt;!&ndash;    -webkit-background-clip: text;&ndash;&gt;-->
<!--&lt;!&ndash;    -webkit-text-fill-color: transparent;&ndash;&gt;-->
<!--&lt;!&ndash;    /*backdrop-filter: saturate(180%) blur(20px);*/&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  /*==== Apple UI CSS ======*/&ndash;&gt;-->
<!--&lt;!&ndash;  .q-card.left.pink{&ndash;&gt;-->
<!--&lt;!&ndash;    border-left-color: #3E4095;&ndash;&gt;-->
<!--&lt;!&ndash;    border-left-width: 4px;&ndash;&gt;-->
<!--&lt;!&ndash;    border-left-style: solid;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .silver{&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: #d9d9d9;&ndash;&gt;-->
<!--&lt;!&ndash;    background-image: linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .blurred-box{&ndash;&gt;-->
<!--&lt;!&ndash;    position: relative;&ndash;&gt;-->
<!--&lt;!&ndash;    width: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    height: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    background: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 2px;&ndash;&gt;-->
<!--&lt;!&ndash;    overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  .blurred-box:after{&ndash;&gt;-->
<!--&lt;!&ndash;    content: '';&ndash;&gt;-->
<!--&lt;!&ndash;    width: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    height: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    background: inherit;&ndash;&gt;-->
<!--&lt;!&ndash;    position: absolute;&ndash;&gt;-->
<!--&lt;!&ndash;    bottom: 0;&ndash;&gt;-->
<!--&lt;!&ndash;    box-shadow: inset 0 0 0 200px rgba(255,255,255,0.05);&ndash;&gt;-->
<!--&lt;!&ndash;    filter: blur(10px);&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  /* Form which you dont need */&ndash;&gt;-->
<!--&lt;!&ndash;  .user-login-box{&ndash;&gt;-->
<!--&lt;!&ndash;    position: relative;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-top: 50px;&ndash;&gt;-->
<!--&lt;!&ndash;    text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;    z-index: 1;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .user-login-box > *{&ndash;&gt;-->
<!--&lt;!&ndash;    display: inline-block;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 200px;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->


<!--&lt;!&ndash;  .user-name{&ndash;&gt;-->
<!--&lt;!&ndash;    margin-top: 15px;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-bottom: 15px;&ndash;&gt;-->
<!--&lt;!&ndash;    color: white;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->

<!--&lt;!&ndash;  input.user-password{&ndash;&gt;-->
<!--&lt;!&ndash;    width: 220px;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 38px;&ndash;&gt;-->
<!--&lt;!&ndash;    opacity: 0.4;&ndash;&gt;-->
<!--&lt;!&ndash;    border-radius: 2px;&ndash;&gt;-->
<!--&lt;!&ndash;    padding: 5px 15px;&ndash;&gt;-->
<!--&lt;!&ndash;    border: 0;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  body {&ndash;&gt;-->
<!--&lt;!&ndash;    font-family: 'Josefin Sans', sans-serif;&ndash;&gt;-->
<!--&lt;!&ndash;    box-sizing: border-box;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .container-fluid{&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    margin: 0;&ndash;&gt;-->
<!--&lt;!&ndash;    padding: 0;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    background: #FFF;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  /* ============= Animation background ========= */&ndash;&gt;-->
<!--&lt;!&ndash;  .background{&ndash;&gt;-->
<!--&lt;!&ndash;    background: linear-gradient(180deg, #FFCC29, #3E4095, #212335);&ndash;&gt;-->
<!--&lt;!&ndash;    /*background-size: 400% 400%;*/&ndash;&gt;-->
<!--&lt;!&ndash;    animation: Gradient 15s ease infinite;&ndash;&gt;-->
<!--&lt;!&ndash;    position: absolute;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100vh;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    overflow: hidden;&ndash;&gt;-->
<!--&lt;!&ndash;    padding:0;&ndash;&gt;-->
<!--&lt;!&ndash;    margin:0px;&ndash;&gt;-->
<!--&lt;!&ndash;    z-index: 1;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube {&ndash;&gt;-->
<!--&lt;!&ndash;    position: absolute;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 80vh;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 45vw;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;    border: solid 1px #D7D4E4;&ndash;&gt;-->
<!--&lt;!&ndash;    transform-origin: top left;&ndash;&gt;-->
<!--&lt;!&ndash;    transform: scale(0) rotate(0deg) translate(-50%, -50%);&ndash;&gt;-->
<!--&lt;!&ndash;    animation: cube 12s ease-in forwards infinite;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(2n) {&ndash;&gt;-->
<!--&lt;!&ndash;    border-color: #FFF ;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(2) {&ndash;&gt;-->
<!--&lt;!&ndash;    animation-delay: 2s;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 25vw;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 40vh;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(3) {&ndash;&gt;-->
<!--&lt;!&ndash;    animation-delay: 4s;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 75vw;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 50vh;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(4) {&ndash;&gt;-->
<!--&lt;!&ndash;    animation-delay: 6s;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 90vw;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 10vh;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(5) {&ndash;&gt;-->
<!--&lt;!&ndash;    animation-delay: 8s;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 10vw;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 85vh;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .cube:nth-child(6) {&ndash;&gt;-->
<!--&lt;!&ndash;    animation-delay: 10s;&ndash;&gt;-->
<!--&lt;!&ndash;    left: 50vw;&ndash;&gt;-->
<!--&lt;!&ndash;    top: 10vh;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  /* Animate Background*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*@keyframes Gradient {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  0% {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    background-position: 0% 50%;*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  }*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  50% {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    background-position: 100% 50%;*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  }*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  100% {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    background-position: 0% 50%;*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  }*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*}*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*@keyframes cube {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  from {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    transform: scale(0) rotate(0deg) translate(-50%, -50%);*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    opacity: 1;*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  }*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  to {*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    transform: scale(20) rotate(960deg) translate(-50%, -50%);*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*    opacity: 0;*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*  }*/&ndash;&gt;-->
<!--&lt;!&ndash;  /*}*/&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->


<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;  .validation-success,&ndash;&gt;-->
<!--&lt;!&ndash;  .validation-failure,&ndash;&gt;-->
<!--&lt;!&ndash;  .validation-pending {&ndash;&gt;-->
<!--&lt;!&ndash;    position: absolute;&ndash;&gt;-->
<!--&lt;!&ndash;    width: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100%;&ndash;&gt;-->

<!--&lt;!&ndash;    background-color: rgba(255, 255, 255, .8);&ndash;&gt;-->
<!--&lt;!&ndash;    text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;    font-size: 1.4rem;&ndash;&gt;-->
<!--&lt;!&ndash;    padding: 10px;&ndash;&gt;-->

<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    flex-flow: column nowrap;&ndash;&gt;-->
<!--&lt;!&ndash;    justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .validation-success {&ndash;&gt;-->
<!--&lt;!&ndash;    color: green;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  .validation-failure {&ndash;&gt;-->
<!--&lt;!&ndash;    color: red;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
