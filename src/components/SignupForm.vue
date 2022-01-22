<template>
  <div class="hello">
  <v-form>
    <v-container class="d-flex flex-column">
      <div style="width:background-color:red;">
        <v-text-field
          v-model="$store.state.info.id"
          @input="$store.commit('setId_signup',$store.state.info.id)"
          label="id"
          Regular
          placeholder="id"
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
        <v-text-field
          v-model="$store.state.info.pw2"
          @input="setPw2_signup($store.state.info.pw2)"
          label="pw2"
          Regular
          placeholder="pw confirm"
          :append-icon="show_pw ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show_pw ? 'text' : 'password'"
          name="input-10-2"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show_pw = !show_pw"
        ></v-text-field>
        <a class="signup" @click="setId('')" href='../peoples#/'>login</a>
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
      show_pw: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ("The email and password you entered don't match")
      }
    }
  },
  methods: {
    ...mapMutations(['setId', 'setPw_signup', 'setPw2_signup', 'moveTo']),
    ...mapActions(['login'])
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
</style>
