<template>
<div>
  <div>
    <v-list>
        <v-subheader>Friends
          <button @click="setModal"><v-icon>mdi-plus</v-icon></button>
        </v-subheader>
        <v-list-item link >
        <v-list-item-title class="vlist">
          <div class="vertical_mid">
            <img class="img"
            src="@/assets/cheese.png" @click="openPop('UserPopup',$store.state.user,'UserPopup-1')">
            <!-- <img class="img"
            src="@/assets/cheese.png" @click="openPop('UserPopup',{ nick: $store.state.user.nm, msg: $store.state.user.msg, modal: false},'UserPopup-1')"> -->
            <span>{{ $store.state.user.nm }}</span>
          </div>
        </v-list-item-title>
        </v-list-item>
    </v-list>
  </div>
  <v-list-group
    :value="true"
    no-action
    sub-group
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>Friends {{cnt_friends}}</v-list-item-title>
      </v-list-item-content>
    </template>
        <v-list class="scroll">
            <v-list-item
              v-for="(people, idx) in $store.state.friends"
              :key="idx"
              link
            >
            <v-list-item-title class="grow vlist" v-on:dblclick="cnt += 1, openPop('Talk',people,'Talk'+idx)" style="cursor:default">
            <!-- <v-list-item-title class="grow vlist" v-on:dblclick="cnt += 1,createChannel($store.state.user.no,people.no),openPop('Talk',people,'Talk'+idx)" style="cursor:default"> -->
              <div class="vertical_mid">
                <img class="img"
                src="@/assets/cheese.png" @click="openPop('UserPopup',people,'UserPopup'+idx)" style="cursor:pointer">
                <span>
                {{people.nm}}
                </span>
              </div>
              </v-list-item-title>
            </v-list-item>
        </v-list>
        <b-modal v-model="$store.state.modalShow" title="Add Friends" hide-footer style="top:10px;">
            <Modal/>
        </b-modal>
  </v-list-group>
</div>
</template>
<script>
import Modal from '../components/Modal.vue'
import { mapMutations, mapActions, mapState } from 'vuex'
const electron = window.require('electron')

export default {
  name: 'Peoples',
  components: {
    Modal
  },
  data: () => ({
    message: 'hi',
    cnt: 0,
    me: {
      nm: '',
      msg: '',
      modal: false
    },
    channelNo: ''
  }),
  computed: {
    cnt_friends () {
      return this.$store.state.friends.length
    }
  },
  methods: {
    ...mapState(['user']),
    ...mapMutations(['togglemodalShow']),
    ...mapActions(['addWin', 'removeWin', 'isExistWin', 'check_uc']),

    createChannel (me, you) {
      console.log(me)
      console.log(you)
      var info = { me: me, you: you }
      // const channelNo = this.check_uc(info)
      // console.log('channelNo:' + channelNo)
      //this.check_uc(info)
    },
    openPop: function (path, people, nm) {
      console.log('openpop!!')
      console.log(people)
      const routeData = this.$router.resolve({ name: path, query: { nm: people.nm, msg: people.msg, no: people.no, channelNo: people.channelNo, me: this.$store.state.user.no, myname: this.$store.state.user.nm } })
      var alreadyOpen = electron.ipcRenderer.sendSync('alreadyOpen', nm)
      console.log(routeData)
      console.log('alreadyOpen:' + alreadyOpen)
      if (!alreadyOpen[0]) {
        var i = alreadyOpen[1] - 1
        var left = 200
        var top = 200
        var nleft = left + (i % 5 * 30) + (parseInt(i / 5) * 15)
        var nTop = top + (i % 5 * 30) - (parseInt(i / 5) * 15)
        window.open(routeData.href, nm, ['width=400', 'heigth=600', 'left=' + nleft, 'top=' + nTop, 'scrollbars = no', 'menubar=no', 'toolbar=no'])
        electron.ipcRenderer.send('setTitle', nm)
      } else {
        console.log('이미 열려있습니당')
        // 열린창을 포커스 맞추기
      }
    },
    setModal: function () {
      this.togglemodalShow()
    },
    openModal () {
      this.modal = true
    },
    closeModal () {
      this.modal = false
    },
    doSend () {
      if (this.message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        // alert('메시지를 입력해주세요.')
      }
    }
  }
}
</script>
<style scoped>
.scroll{
  width: calc(100vw - 86px);
  height: calc(100vh - 200px);
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 10px;  /* 세로축 스크롤바 길이 */
}
::-webkit-scrollbar-track {
  background-color: #f2f5f3;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #a8a594;
}
.container{
  margin: 0px;
}
.img{
max-width:100%; max-height:100%;
display:inline-block;
vertical-align:middle;
width:50px;
height:50px;
border-radius:50%;
background-color:gray;
}
span {
display:inline-block;
vertical-align: middle;
line-height: normal;
padding: 13px;
}
.vlist{
  height: 80px;
}
.vertical_mid{
  display:inline-block;
  vertical-align:middle;
  height:100%;
  padding: 15px 0;
}

</style>
<style>
.modal-dialog{
  margin: 1.75rem auto;
}
</style>
