<template>
<div class="flex-column d-flex">
      <Logo2/>
      <SignupForm/>
      <div class="login_btn">
        <v-btn style="width:100%; background-color:#f6df55; color:white; font-weight:bold;" @click="signup($store.state.info)">
        Signup
        </v-btn>
      </div>
    </div>
</template>

<script>
import SignupForm from '../components/SignupForm'
import Logo2 from '../components/Logo2'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Signup',

  components: {
    SignupForm,
    Logo2
  },
  methods: {
    ...mapState(['info']),
    ...mapActions(['signup'])
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
