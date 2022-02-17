<template>
  <div class="hello">
  <v-form>
    <v-container class="d-flex flex-column">
      <div style="margin: 0 10%;">
        <v-text-field class="widthCalc"
          v-model="$store.state.info.email"
          @input="setEmail_signup($store.state.info.email)"
          label="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <button id='btn_email' class="btn btn-success" style="width:80px; height:30px; margin-left:10px;" @click="validate" disabled="disabled"><span style="position: relative; bottom:4.5px;">인증</span></button>
       </div>
      <div>
        <v-text-field
          v-model="$store.state.info.id"
          @input="$store.commit('setId_signup',$store.state.info.id)"
          label="id"
          Regular
          placeholder="id"
          :rules="[rules.required, rules.min]"
          clearable
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model="$store.state.info.pw"
          @input="setPw_signup($store.state.info.pw)"
          label="pw"
          Regular
          placeholder="pw"
          :append-icon="show_pw ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show_pw ? 'text' : 'password'"
          name="input-10-2"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show_pw = !show_pw"
        ></v-text-field>
        <a class="signup" @click="setId('')" href='../'>login</a>
      </div>
    </v-container>
  </v-form>
  </div>
</template>

<script>

import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'SignupForm',
  props: {
    msg: String
  },
  data () {
    return {
      email: this.$store.state.info.email,
      show_pw: false,
      password: 'Password',
      emailRules: [v => /.+@.+/.test(v) || 'Invalid Email address'],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ("The email and password you entered don't match")
      }
    }
  },
  methods: {
    ...mapMutations(['setId', 'setPw_signup', 'setEmail_signup', 'moveTo']),
    ...mapActions(['login']),
    validate () {
      var msg = document.querySelector('#mymain > div > div > div > div.hello > form > div > div:nth-child(1) > div > div > div.v-text-field__details > div > div > div')
      // msg가 null이면서 email안에 값이 있어야함. -> 그때만 disabled 없앰.
      var btn = document.querySelector('#btn_email')
      if (!msg && this.$store.state.info.email) {
        console.log('인증할수있다.')
        btn.disabled = false
      } else {
        console.log('인증할수없다.')
        btn.disabled = true
      }
    }
  },
  watch: {
    email (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.v-text-field{
  display: block;
  margin: auto;
  width: 80%;
}
.signup{
  display: block;
  margin-left: 79%;
}
.widthCalc{
   width: calc(100% - 90px);
   display: inline-block;
}
</style>
