<template>
  <div class="d-flex">
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
      <v-app-bar-title style="margin:10px 0 10px 20px;">{{ $route.query.nick }}</v-app-bar-title>
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
    <div class="someone c_dflex">
        <img class="c_img" src="@/assets/cheese.png">
        <div>
          <div class="c_nm">{{this.nk}}</div>
        <div class="c_content">안녕하세요 호호...</div>
        </div>
        <span class="time">오후 5:45</span>
    </div>
    <div class="me c_dflex_reverse">
      <!-- <img class="c_img" src="@/assets/cheese.png"> -->
      <div>
        <!-- <div class="c_nm">me</div> -->
      <div class="c_content">안녕하세요 안녕하세요 호호...</div>
      </div>
      <span class="time">오후 5:45</span>
    </div>
  </div>
    </v-sheet>
    <v-app-bar
      style="position:fixed; bottom:0px; height:120px">
      <!-- <div class="dflex"> -->
      <div style="width:100%; height:120px; display:flex; align-items:end; padding:10px;">
        <textarea id="txt" style="width:100%;height:100%;" v-model="mytxt" @keypress="valid_enter" @keyup="test"></textarea>
      </div>
      <div style="width:110px;"><v-btn @click="send('me',mytxt)" height="95" color="#d6d6d6">Send</v-btn></div>
      <!-- </div> -->
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Talk',
  components: {
  },
  data () {
    return {
      nk: this.$route.query.nick,
      mytxt: ''
    }
  },
  methods: {
    ...mapActions(['addChat']),
    send: function (who, txt) {
      var tmp = { who: who, txt: txt }
      if (this.mytxt.trim() !== '' && this.mytxt.trim() !== '\n') {
        this.addChat(tmp)
      }
      this.mytxt = ''
      document.getElementById('txt').focus()
      // 스크롤 항상 하단으로 보내기
      var tagId = document.getElementById('conversation')
      tagId.scrollTop = tagId.scrollHeight
    },
    test: function () {
      console.log(this.mytxt[0])
      if (this.mytxt[0] === '/n') {
        this.mytxt = ''
      }
    },
    valid_enter: function (e) {
      if (e.shiftKey && e.key === 'Enter') {
        console.log('shift+enter')
      } else if (e.key === 'Enter') {
        if (this.mytxt.trim() !== '' && this.mytxt.trim() !== '\n') {
          this.send(this.nk, this.mytxt)
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
    document.getElementById('min').style.color = 'white'
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
</style>
