<template>
  <div>
    <div class="title">
      <span @click="minimize" id="min">&minus;</span>
      <span @click="maximize" id="max">&#x025fb;</span>
      <span @click="close" id="close">&#10005;</span>
    </div>
    <v-navigation-drawer
      permanent
      width="100vw"
      height="100vh"
    >
      <v-row
        class="fill-height"
        no-gutters
      >
        <v-navigation-drawer
          style="background-color:#999a9c"
          dark
          mini-variant
          mini-variant-width="70"
          permanent
          v-if="$store.state.show"
        >
          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
            >
              <v-list-item-action>
                <router-link :to="item.link">
                  <v-icon x-large>{{ item.icon }}</v-icon>
                </router-link>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main id="mymain">
          <div>
          <router-view/>
          </div>
        </v-main>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// const electron = window.require('electron')

export default {
  name: 'App',

  data: () => ({
    items: [
      { title: 'account', icon: 'mdi-account', link: '/Peoples' },
      { title: 'talk', icon: 'mdi-forum', link: '/TalkList' },
      { title: 'logout', icon: 'mdi-logout', link: '/' }
    ],
    mini: true,
    maxi: false
  }
  ),
  methods: {
    ...mapMutations(['setshow']),
    close () {
      // electron.ipcRenderer.send('close')
    },
    minimize () {
      // electron.ipcRenderer.send('minimize')
    },
    maximize () {
      if (this.maxi) {
        this.maxi = false
        // electron.ipcRenderer.send('unmaximize')
      } else {
        this.maxi = true
        // electron.ipcRenderer.send('maximize')
      }
    }
  },
  mounted () {
    // const MINUS = document.getElementById('minimize')
    // const CLOSE = document.getElementById('close-app')
    // MINUS.addEventListener('click', this.minimize)
    // CLOSE.addEventListener('click', this.close)
    // const Script = document.createElement('script')
    // Script.setAttribute('src', './js/renderer.js')
    // document.head.appendChild(Script)
  },
  watch: {
    $route: function (to, from) {
      this.setshow(to.path)
      if (to.path === '/' || to.path === '/signup' || to.path === '/userpopup') {
        console.log('home.vue, path:' + to.path)
        document.getElementById('mymain').style = 'width:100%'
      } else if (to.path === '/peoples') {
        console.log('here:' + to.path)
        var mywidth = 'calc(100% - 70px)'
        document.getElementById('mymain').style.width = mywidth
      }

      if (to.path === '/talk') {
        alert(to.path)
        document.getElementById('min').style.color = 'white'
      }
    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
}
</style>
<style>
html{
  overflow-y: hidden !important;
}
.title {
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align:right;
  height:30px;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-app-region: drag;
}
.title>span{
  padding: 5px;
  cursor:pointer;
  -webkit-app-region: no-drag;
}
.title>span:hover{
  background-color: lightgray;
}
.modal-dialog{
  width:60%;
}
</style>
