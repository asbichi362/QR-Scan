<template>
  <q-page padding class="fit column wrap justify-center items-center content-center">
        <q-card bordered dark flat class=" rounded-borders  q-pa-lg shadow-10  " >
          <q-img
            src="../../public/img/npf.png"
          />
          <q-card-section class=" ">
<!--            <span class="text-h5">Nigerian Police Force</span>-->
            <div  class="q-mt-lg q-gutter-md">
              <q-btn
                :to="{ name: 'scan' }"
                stack
                icon="qr_code_scanner"
                rounded
                type="submit"
                no-caps unelevated
                class="white-opacity bg-green full-width q-pt-xs q-pb-xs"
              >
                Scan
              </q-btn>
              <q-btn
                :to="{ name: 'serial' }"
                stack
                icon="app_registration"
                rounded
                type="submit"
                no-caps unelevated
                class="white-opacity bg-white text-grey-8 full-width q-pt-sm q-pb-xs"
              >
                Serial
              </q-btn>
<!--              <q-btn-->
<!--                :to="{ name: 'login' }"-->
<!--                outline-->
<!--                rounded-->
<!--                type="submit"-->
<!--                no-caps unelevated-->
<!--                class="white-opacity full-width q-pt-xs q-pb-xs"-->
<!--              >-->
<!--                Sign in-->
<!--              </q-btn>-->
            </div>
          </q-card-section>
        </q-card>
  </q-page>
</template>

<script>
  import {LocalStorage} from 'quasar'
  import {Cookies} from 'quasar'
  export default {
    data: () => ({
      cookieOption: { expires: '', path: '/', domain: 'https://app.securealgon.ng/' , sameSite: 'Strict', httpOnly: true, secure: true },
      data: {},
      user: {},
      isPwd: true,
      loading: false
    }),

    methods: {
      logUserIn () {
        this.loading = !this.loading
        const query = 'login.php'
        this.post(query, this.user).then(response => {
          // console.log(response)
          LocalStorage.set('hash',response.data.jwt)
          this.persistToken(response.data.jwt)
          // this.$q.cookies.set('token', response.data.jwt, { expires:'',path:'/',domain:'',sameSite:'Strict',httpOnly: false,secure:true})

           this.setSession(response.data)
          this.loading = !this.loading
          if(response.data.role==='scanner'){
            this.$router.push({ name: 'scan' })
          }
          else if (response.data.role==='seller'){
            this.$router.push({ name: 'sale' })
          }
          else if (response.data.role==='loader'){
            this.$router.push({ name: 'loadByScan' })
          }
          // console.log(response.data)
          // this.$router.push({ name: 'scan' })
        }).catch(error => {
          console.log(error)
          this.loading = !this.loading
          this.$q.notify({
            type: 'negative',
            message: 'Account does not exist'
          })
          return error
        })
      }
    },
    mounted() {
      console.log(this.$q.localStorage.getItem('hash'))
    }
  }
</script>
