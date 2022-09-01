<template>
  <div>
  <v-form>
    <v-container class="d-flex flex-column">
      <div>
        <v-text-field
          v-model="$store.state.user.id"
          @input="$store.commit('setId',$store.state.user.id)"
          label="id"
          Regular
          placeholder="id"
          clearable
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model="$store.state.user.pw"
          @input="setPw($store.state.user.pw)"
          label="pw"
          Regular
          placeholder="pw"
          :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="pw_show ? 'text' : 'password'"
          name="input-10-2"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="pw_show = !pw_show"
        ></v-text-field>
        <div class="alert alert-danger" role="alert" v-if='$store.state.login_fail_show'>
          <small>ID 또는 PW가 잘못 되었습니다.</small>
        </div>
        <div class="alert alert-warning" role="alert" v-if='$store.state.login_validate_show'>
          <small>ID, PW를 입력하세요.</small>
        </div>
        <a class="signup" href='../signup'>sign up</a>
      </div>
    </v-container>
  </v-form>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data () {
    return {
      pw_show: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ("The email and password you entered don't match")
      }
    }
  },
  methods: {
    ...mapMutations(['setPw'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.v-text-field{
  width: 80%;
  display: block;
  margin: auto;
}
.signup{
  display: block;
  margin-left: 79%;
}

.alert{
  margin: 10px 10% 0 10%; padding: 5px 20px;
}
</style>
