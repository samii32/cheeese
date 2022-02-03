<template>
  <div>
       <v-list class="grow">
        <v-subheader>Talk</v-subheader>
    </v-list>
    <v-list class="scroll">
      <v-list-item
        v-for="(chat, idx) in this.chatlist"
        :key="idx"
        link
      >
        <v-list-item-title class="grow vlist" v-on:dblclick="cnt += 1,openPop('Talk',chat,'Talk'+idx)" style="cursor:default">
          <div class="vertical_mid" style="display:flex">
            <img class="img"
            src="@/assets/cheese.png">
              <div style="display:flex; flex-direction : column">
                <span>
                {{chat.nick}}
                </span>
                <span class="font">
                {{chat.txt}}
                </span>
              </div>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  name: 'TalkList',
  components: {
  },
  data: () => ({
    cnt: 0,
    me: {
      nick: '봉골골',
      txt: '안녕'
    },
    chatlist: [
      {
        nick: '킴원호',
        txt: 'abc'
      },
      {
        nick: 'samanda',
        txt: 'qwer'
      },
      {
        nick: 'hey',
        txt: '심심해'
      },
      {
        nick: 'samanda',
        txt: 'qwer'
      },
      {
        nick: 'hey',
        txt: '심심해'
      },
      {
        nick: 'samanda',
        txt: 'qwer'
      },
      {
        nick: 'hey',
        txt: '심심해'
      },
      {
        nick: 'samanda',
        txt: 'qwer'
      },
      {
        nick: 'hey',
        txt: '심심해'
      }
    ]
  }),
  methods: {
    openPop: function (path, people, idx) {
      const routeData = this.$router.resolve({ name: path, query: { nick: people.nick, msg: people.msg } })
      window.open(routeData.href, idx, 'width=400, heigth=600, left=200, top=200, scrollbars=no, frame=false')
    }
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
