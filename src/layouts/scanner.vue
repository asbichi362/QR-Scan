<template>
  <q-layout view="hhh LpR fff" class="bg-white">
    <q-header reveal   class=" bg-transparent text-black ">
<!--      <q-toolbar  >-->
<!--        <q-btn dense flat round :icon="this.$route.name === 'Login' ? 'keyboard_backspace' : 'menu'" @click="left = !left"  class="desktop-hide"/>-->

<!--        <q-toolbar-title class="text-dark-frost text-weight-bolder text-center  ">-->
<!--&lt;!&ndash;            <img style="width: 30% " src="../../../../DDHUB%20PROJECTS/Pro-Manager/public/img/pro.png">&ndash;&gt;-->
<!--&lt;!&ndash;          <q-btn dense rounded  type="a" href="https://ddhub.org.ng" unelevated no-caps flat class="text-h5 text-white text-center text-weight-bolder">Pro  Manager</q-btn>&ndash;&gt;-->
<!--        </q-toolbar-title>-->
<!--        <div class="desktop-only">-->
<!--        </div>-->

<!--      </q-toolbar>-->
    </q-header>

    <q-drawer  v-model="left" side="left" bordered class="mobile-only">
      <q-scroll-area class="fit ">
        <q-list>
<!--          <q-img class="text-center q-pt-lg" src="../../../../DDHUB%20PROJECTS/Pro-Manager/public/img/material.png" style="height: 150px">-->
<!--            <div class="absolute-bottom bg-transparent">-->
<!--              <q-avatar size="50px" font-size="22px" color="white"    class="shadow-4 q-mb-sm">-->
<!--                <img   src="../../../../DDHUB%20PROJECTS/Pro-Manager/public/img/logo.png">-->
<!--              </q-avatar>-->
<!--              <div class="text-weight-bold text-white">Pro Manager</div>-->
<!--              &lt;!&ndash; <div class="text-white">Peace Building Platform</div> &ndash;&gt;-->
<!--            </div>-->
<!--          </q-img>-->
          <q-separator />

          <q-item clickable v-ripple :to="{ name: 'Main' }">
            <q-item-section avatar>
              <q-icon color="green" name="home" />
            </q-item-section>
            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple :to="{ name: 'Main Dashboard' }">
            <q-item-section avatar>
              <q-icon color="green" name="poll" />
            </q-item-section>
            <q-item-section>
              Public Dashboard
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple >
            <q-item-section avatar>
              <q-icon color="green" name="person_add" />
            </q-item-section>
            <q-item-section>
              Who we are
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple >
            <q-item-section avatar>
              <q-icon color="green" name="person_add" />
            </q-item-section>
            <q-item-section>
              About Us
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item clickable v-ripple :to="{ name: 'WorkWithUs'}">
            <q-item-section avatar>
              <q-icon color="green" name="business_center" />
            </q-item-section>
            <q-item-section>
              Work with Us!
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item clickable v-ripple :to="{ name: 'Login' }" >
            <q-item-section avatar>
              <q-icon color="green" name="exit_to_app" />
            </q-item-section>
            <q-item-section>
              Login
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  },
  methods : {
    logUserOut () {
      this.endSession()
      this.$router.push({ name: 'home' })
    }
  },
  created () {
    if (this.$q.localStorage.has('session')) {
      this.$router.push(this.getSession().path)
    }
  }
}
</script>

