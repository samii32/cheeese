<template>
  <div>
       <v-list class="grow">
        <v-subheader>Talk</v-subheader>
    </v-list>
    <v-list class="scroll">
      <v-list-item
        v-for="(chat, idx) in $store.state.talkList"
        :key="idx"
        link>
        <v-list-item-title class="grow vlist" v-on:dblclick="cnt += 1,openPop('Talk',chat,'Talk'+idx)" style="cursor:default">
          <div class="vertical_mid" style="display:flex">
            <img class="img"
            src="@/assets/cheese.png">
              <div style="display:flex; flex-direction : column;width:100%;">
                <div style="display: flex; justify-content: space-between;">
                  <span>
                  {{chat.nm}}
                  </span>
                  <span class="font">
                  {{chat.last_update_date}}
                  </span>
                </div>
                <span class="font">
                {{chat.last_msg}}
                </span>
              </div>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>

import { mapActions } from 'vuex'
const electron = window.require('electron')

export default {
  name: 'TalkList',
  components: {
  },
  data: () => ({
    cnt: 0,
    me: {
      nick: '봉골골',
      txt: '안녕'
    }
  }),
  methods: {
    ...mapActions(['getChannelList']),
    openPop: function (path, people, nm) {
      // const routeData = this.$router.resolve({ name: path, query: { nick: people.nick, msg: people.msg } })
      console.log('open~~')
      console.log(people)
      console.log('close~')
      const routeData = this.$router.resolve({ name: path, query: { nm: people.nm, msg: people.msg, no: people.receiver_no, channelNo: people.channelNo, me: this.$store.state.user.no, myname: this.$store.state.user.nm } })
      var isOpen = electron.ipcRenderer.sendSync('isOpen', nm)

      if (!isOpen[0]) {
        var i = isOpen[1] - 1
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
      // window.open(routeData.href, nm, 'width=400, heigth=600, left=200, top=200, scrollbars=no, frame=false')
    }
  },
  created () {
    // 대화목록가져오기.
    this.$store.state.talkList.splice(0)
    var tmp = { no: this.$store.state.user.no }
    console.log(tmp)
    this.getChannelList(tmp)
  }
}
</script>
<style scoped>
.vlist{
  height: 80px;
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
line-height: normal;
padding-left: 10px;
}
.vertical_mid{
  display:inline-block;
  vertical-align:middle;
  height:100%;
  padding: 15px 0;
}
.font{
  color: gray;
  font-size: 0.8em;
  margin: 4px 0 0 1px;
}
.scroll{
  width: calc(100vw - 86px);
  height: calc(100vh - 75px);
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
</style>
