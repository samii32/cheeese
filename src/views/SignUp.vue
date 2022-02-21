<template>
<div class="flex-column d-flex">
      <Logo2/>
      <SignupForm/>
      <div class="login_btn" style="position:relative; top:-50px;">
        <v-btn style="width:100%; background-color:#f6df55; color:white; font-weight:bold;" @click="signup_check">
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
    ...mapActions(['signup']),
    signup_check () {
      // id, pw 입력되었는지
      if (!this.$store.state.info.id || !this.$store.state.info.pw) {
        this.$store.state.alert_warning_info_show = true
      } else {
        this.$store.state.alert_warning_info_show = false
        this.signup(this.$store.state.info)
      }
    }
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
