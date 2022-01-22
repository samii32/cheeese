<template>
    <div class="flex-column d-flex">
      <Logo/>
      <Login/>
      <div class="login_btn">
        <v-btn style="width:100%; background-color:#f6df55; color:white; font-weight:bold;" @click="login($store.state.user)">
        Login
        </v-btn>
      </div>
    </div>
</template>

<script>
import Login from '../components/Login'
import Logo from '../components/Logo'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    Login,
    Logo
  },
  methods: {
    ...mapState(['user']),
    ...mapActions(['login'])
  }
}
</script>
<style scoped>
.login_btn {
  width: 77%;
  display: block;
  margin: auto;
}
</style>
