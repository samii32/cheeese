<template>
  <div class="">
    <v-app-bar
      color="#43a047"
      dark
      height="100"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-title style="margin:10px 0 10px 20px;">{{ $route.query.friendNm }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-5"
    >
  <div class="c_over" id='conversation'>
  </div>
    </v-sheet>
    <v-app-bar
      style="position:fixed; bottom:0px; height:120px">
      <div style="width:100%; height:120px; display:flex; align-items:end; padding:10px;">
        <textarea id="txt" style="width:100%;height:100%;" v-model="mytxt" @keypress="valid_enter" @keyup="clear_txt"></textarea>
      </div>
      <div style="width:110px;"><v-btn @click="send('me',mytxt)" height="95" color="#d6d6d6">Send</v-btn></div>
    </v-app-bar>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
  name: 'Talk',
  components: {
  },
  created () {
    // 대화내용 불러오기
    console.log('created')
    // 고유 채널번호 줘야함.
    console.log('myNo:' + this.$route.query.myNo)
    var channelNo = this.$route.query.channelNo
    console.log('channelNo:' + channelNo)

    this.$socket.emit('joinRoom', channelNo)
    this.$socket.on('broadcast', (data) => {
      // console.log(data)
      var tmp = { who: data.name, txt: data.msg }
      // 서버로부터 온 데이터로 말풍선만들기.
      this.addChat(tmp)
      // 스크롤 항상 하단으로 보내기
      var tagId = document.getElementById('conversation')
      tagId.scrollTop = tagId.scrollHeight
    })
  },
  data () {
    return {
      nk: this.$route.query.myName,
      mytxt: ''
    }
  },
  methods: {
    ...mapActions(['addChat', 'getChannelNo', 'getMessage', 'saveMessage', 'getDay']),
    send: function (who, txt) {
      // 먼저 날짜체크해줄것. # 없으면 하고 있으면 하면안됨.
      var ChatDays = document.getElementsByClassName('date')
      var lastChatDay = ChatDays[ChatDays.length - 1].lastChild.textContent

      var today = new Date()
      var year = today.getFullYear() // 년도
      var month = today.getMonth() + 1 // 월
      month = month.toString().length < 2 ? '0' + month : month
      var date = today.getDate() // 날짜
      date = date.toString().length < 2 ? '0' + date : date
      var day = year + '.' + month + '.' + date

      if (lastChatDay !== day) {
        this.getDay({ day: day })
      }
      var tmp = { who: who, txt: txt }
      if (this.mytxt.trim() !== '' && this.mytxt.trim() !== '\n') {
        this.addChat(tmp)
        this.$socket.emit('chat', {
          name: this.nk,
          msg: txt,
          to: this.$route.query.friendNo,
          channelNo: this.$route.query.channelNo
        })
      }
      // 메세지 저장할것.
      var info = { sender: this.$route.query.myNo, receiver: this.$route.query.friendNo, channelNo: this.$route.query.channelNo, txt: txt }
      this.saveMessage(info)

      this.mytxt = ''
      document.getElementById('txt').focus()
      // 스크롤 항상 하단으로 보내기
      var tagId = document.getElementById('conversation')
      tagId.scrollTop = tagId.scrollHeight
    },
    clear_txt: function (e) {
      console.log(this.mytxt[0])
      if (e.shiftKey && e.key === 'Enter') {
        console.log('shift+enter')
      } else if (e.key === 'Enter') {
        this.mytxt = ''
      }
    },
    valid_enter: function (e) {
      if (e.shiftKey && e.key === 'Enter') {
        console.log('shift+enter')
      } else if (e.key === 'Enter') {
        if (this.mytxt.trim() !== '' && this.mytxt.trim() !== '\n') {
          // this.send(this.nk, this.mytxt)
          this.send('me', this.mytxt)
          console.log(this.mytxt + '__')
          this.mytxt = ''
        } else {
          this.mytxt = ''
          console.log('|' + this.mytxt + '|')
          console.log('내용없음')
        }
        document.getElementById('txt').focus()
      }
    }
  },
  mounted: function () {
    // dom이 load 다 된후에 바로 채팅내용가져와야함.
    var tmp = { channelNo: this.$route.query.channelNo, no: this.$route.query.myNo }
    this.getMessage(tmp)

    document.getElementById('min').style.color = 'white'
    document.getElementById('max').style.color = 'white'
    document.getElementById('close').style.color = 'white'

    document.getElementById('max').onmouseover = function () {
      this.style = 'color:red;background-color:white;'
    }
    document.getElementById('max').onmouseout = function () {
      this.style = 'color:white;'
    }
    document.getElementById('min').onmouseover = function () {
      this.style = 'color:red;background-color:white'
    }
    document.getElementById('min').onmouseout = function () {
      this.style = 'color:white;'
    }
    document.getElementById('close').onmouseover = function () {
      this.style = 'color:red;background-color:white'
    }
    document.getElementById('close').onmouseout = function () {
      this.style = 'color:white;'
    }
  }
}
</script>
<style scoped>
.c_over{
  overflow-wrap: break-word;
  overflow-y:auto;
  overflow-x:hidden;
  height:calc(100vh - 221px);
}
.c_dflex{
  display: flex;
  align-items: flex-start;
  margin:10px;
}
.c_dflex_reverse{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin:10px;
}
::v-deep .v-app-bar-title__content{
  width: 360px !important;
  margin: 10px 0px -15px 10px !important;
}
::v-deep .v-toolbar__content {
  height: 100% !important;
  padding: 0;
}
.c_img{
max-width:100%; max-height:100%;
display:inline-block;
vertical-align:middle;
width:45px;
height:45px;
border-radius:50%;
background-color:gray;
align-self: flex-start;
}
/* .time{
  color: gray;
  align-self: flex-end;
  min-width: 70px;
  margin: 0px 10px 10px 10px;
} */

.someone>.time{
  color: gray;
  align-self: flex-end;
  min-width: 50px;
  margin-left: 10px;
  font-size: 0.8em;
}
.me>.time{
  color: gray;
  align-self: flex-end;
  min-width: 50px;
  margin-right: 10px;
  font-size: 0.8em;
}
.c_content{
  background-color:#faebeb;
  padding:10px;
  border-radius: 10px;
  align-self:stretch;
}
.me>.c_img{
  margin-right: 10px;
  margin-left: 10px;
}
.someone>.c_img{
  margin-right: 10px;
  margin-left: 10px;
}
.c_nm{
  font-size: 0.8em;
  margin-bottom: 3px;
}
.me>div>.c_nm{
  text-align: right;

}
.overflow{
  max-width: calc(100% - 145px);
}
.pre2{
  white-space:pre-wrap;
}
</style>
<style>
::-webkit-scrollbar-thumb .c_over{
  /* 스크롤바 막대 높이 설정 */
  background-color: rgba(255,255,255,1);
  /* 스크롤바 둥글게 설정 */
  border-radius: 20px;
}
.c_over{
  overflow-wrap: break-word;
  overflow-y:auto;
  height:calc(100vh - 278px);
}
.c_dflex{
  display: flex;
  align-items: flex-start;
  margin:10px;
}
.c_dflex_reverse{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin:10px;
  margin-right:20px;
}
::v-deep .v-toolbar__content {
  height: 100% !important;
  padding: 0;
}
.c_img{
max-width:100%; max-height:100%;
display:inline-block;
vertical-align:middle;
width:45px;
height:45px;
border-radius:50%;
background-color:gray;
align-self: flex-start;
}
.someone>.time{
  color: gray;
  align-self: flex-end;
  min-width: 50px;
  margin-left: 10px;
  font-size: 0.8em;
}
.me>.time{
  color: gray;
  align-self: flex-end;
  min-width: 50px;
  margin-right: 10px;
  margin-bottom:3px;
  font-size: 0.8em;
}
.c_content{
  background-color:#faebeb;
  padding:10px;
  border-radius: 10px;
  align-self:stretch;
}
.someone>.c_img{
  margin-right: 10px;
  margin-left: 10px;
}
.me>.c_img{
  margin-left: 10px;
  margin-right: 10px;
}
.c_nm{
  font-size: 0.8em;
  margin-bottom: 3px;
}
.me>div>.c_nm{
  text-align: right;
}
pre {
 margin-bottom: 0px;
}
.overflow{
  max-width: calc(100% - 145px);
}
.pre2{
  white-space:pre-wrap;
}
</style>
