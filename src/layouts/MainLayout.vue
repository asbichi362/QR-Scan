<template>
  <q-layout view="hhh LpR fff" class="bg-dark">
    <q-header reveal   class=" bg-white text-black ">
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
  created () {
    if (this.$q.localStorage.has('session')) {
      this.$router.push(this.getSession().path)
    }
  }
}
</script>

