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
          v-if="$store.state.menu_show"
        >
          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="menu in menus"
              :key="menu.title"
            >
              <v-list-item-action @click="resetInfo(menu.title)">
                <router-link :to="menu.link">
                  <v-icon x-large>{{ menu.icon }}</v-icon>
                </router-link>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ menu.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main id="myMain">
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
const electron = window.require('electron')

export default {
  name: 'App',

  data: () => ({
    menus: [
      { title: 'account', icon: 'mdi-account', link: '/Peoples' },
      { title: 'talk', icon: 'mdi-forum', link: '/TalkList' },
      { title: 'logout', icon: 'mdi-logout', link: '/' }
    ],
    mini: true,
    maxi: false
  }
  ),
  methods: {
    ...mapMutations(['setMenuShow', 'setId']),
    // 창 닫기
    close () {
      electron.ipcRenderer.send('close')
    },
    // 창 최소화
    minimize () {
      electron.ipcRenderer.send('minimize')
    },
    // 창 최대화
    maximize () {
      if (this.maxi) {
        this.maxi = false
        electron.ipcRenderer.send('unmaximize')
      } else {
        this.maxi = true
        electron.ipcRenderer.send('maximize')
      }
    },
    // 로그아웃시 user정보 초기화, friends 초기화
    resetInfo (nav) {
      if (nav === 'logout') {
        this.setId('')
        this.$store.state.friends = []
      }
    }
  },
  watch: {
    $route: function (to, from) {
      // 주소가 이동하면 menu_show 상태셋팅
      this.setMenuShow(to.path)

      if (to.path === '/' || to.path === '/signup' || to.path === '/userpopup') {
        document.getElementById('myMain').style = 'width:100%'
      } else if (to.path === '/peoples') {
        // 주소가 친구목록으로 가면 menu바 크기만큼 가로길이 셋팅
        var mainWidth = 'calc(100% - 70px)'
        document.getElementById('myMain').style.width = mainWidth
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
  margin:auto;
  min-width: 340px;
  max-width: 400px;
}
</style>
