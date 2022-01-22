<template>
<div>
  <div>
    <v-list>
        <v-subheader>Friends</v-subheader>
        <v-list-item link >
        <v-list-item-title class="vlist">
          <div class="vertical_mid">
            <img class="img"
            src="@/assets/cheese.png" @click="openPop('UserPopup',me,-1)">
            <span>봉골골</span>
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
        <v-list>
            <v-list-item
              v-for="(people, idx) in peoples"
              :key="idx"
              link
            >
            <v-list-item-title class="grow vlist" v-on:dblclick="cnt += 1,openPop('Talk',people,idx)" style="cursor:default">
              <div class="vertical_mid">
                <img class="img"
                src="@/assets/cheese.png" @click="openPop('UserPopup',people,idx)" style="cursor:pointer">
                <span>
                {{people.nick}}
                </span>
              </div>
              </v-list-item-title>
            </v-list-item>
        </v-list>
  </v-list-group>
</div>
</template>
<script>

export default {
  name: 'Peoples',
  components: {
  },
  data: () => ({
    cnt: 0,
    me: {
      nick: '봉골골',
      msg: 'happy'
    },
    peoples: [
      {
        nick: 'cathy',
        msg: '행복해'
      },
      {
        nick: 'jake',
        msg: 'joyful'
      },
      {
        nick: 'sam',
        msg: '삼인행필유아사'
      }
    ]
  }),
  computed: {
    cnt_friends () {
      return this.peoples.length
    }
  },
  methods: {
    openPop: function (path, people, idx) {
      const routeData = this.$router.resolve({ name: path, query: { nick: people.nick, msg: people.msg } })
      window.open(routeData.href, idx, ['width=400', 'heigth=600', 'left=2000', 'top=200', 'scrollbars = no', 'menubar=no', 'toolbar=no', 'frame=false'])
    }
  }
}
</script>
<style scoped>
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
