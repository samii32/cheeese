<template>
  <div class="hello">
  <v-form>
    <v-container class="d-flex flex-column">
      <div style="margin: 0 10%;">
        <v-text-field class="widthCalc" id="input_email"
          v-model="$store.state.info.email"
          @input="setEmail_signup($store.state.info.email)"
          label="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <button type="button" id='btn_email' class="btn btn-success text-white" style="width:80px; height:30px; margin-left:10px;" @click="sendEmail($store.state.info.email)" disabled="disabled"><span style="position: relative; bottom:4.5px;">발송</span></button>
       </div>
       <div style="margin: 0 10%;" v-if="$store.state.number_show">
          <v-text-field id="certificate" class="certificate"
          label="인증번호"
          required
        ></v-text-field>
        <button type="button" id='btn_no' class="btn btn-danger text-white" style="width:80px; height:30px; margin-left:10px;" @click="certiNo_check"><span style="position: relative; bottom:4.5px;">인증</span></button>
       </div>
        <div class="alert alert-success" role="alert" style="margin: 0 10%;" v-if='$store.state.alert_show'>
          이메일 인증 성공!!
        </div>
        <div class="alert alert-danger" role="alert" style="margin: 0 10%;" v-if='$store.state.alert_danger_show'>
          이메일 인증을 해주세요!!
        </div>
        <div class="alert alert-warning" role="alert" style="margin: 0 10%;" v-if='$store.state.alert_warning_show'>
          인증번호가 다릅니다.
        </div>
        <div class="alert alert-warning" role="alert" style="margin: 0 10%;" v-if='$store.state.alert_warning_info_show'>
          ID와 PW를 입력해주세요.
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
    ...mapMutations(['setId', 'setPw_signup', 'setEmail_signup', 'moveTo', 'setDisabled', 'removeDisabled']),
    ...mapActions(['login', 'sendEmail']),
    certiNo_check () {
      var inputCertiNo = document.querySelector('#certificate').value
      this.$store.state.alert_danger_show = false
      if (inputCertiNo === String(this.$store.state.hidden_number)) {
        console.log('same')
        this.$store.state.number_show = false
        this.$store.state.alert_show = true
        this.$store.state.alert_warning_show = false
        this.setDisabled()
      } else {
        console.log('diff')
        this.$store.state.number_show = true
        this.$store.state.alert_show = false
        this.$store.state.alert_warning_show = true
        this.removeDisabled()
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
.certificate{
   width: calc(100% - 90px);
   display: inline-block;
}
</style>
