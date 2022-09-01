<template>
  <div class="back">
    <div class="content">
      <div class="center" >
        <img class="img" src="@/assets/cheese.png">
      </div>
      <div>
        <h1 class="center">{{ $route.query.friendNm }}</h1>
        <h5 class="center">{{ $route.query.msg }}</h5>
      </div>
      <div>
        <v-bottom-navigation
          :value="value"
          color="primary" horizontal
          style="position:fixed;"
        >
          <v-btn>
            <span>Edit</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn>
            <span>My Chat</span>
            <v-icon>mdi-wechat</v-icon>
          </v-btn>
          <v-btn>
            <span>Favorites</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'UserPopup',

  components: {
  },
  data () {
    return {
      value: 1,
      active: true
    }
  }
}
</script>
<style scoped>
.center{
  text-align: center;
  margin:10px;
}
.img{
max-width:100%; max-height:100%;
display:inline-block;
vertical-align:middle;
width:120px;
height:120px;
border-radius:50%;
background-color:gray;
}
.back{
  /* background-color: red; */
  height: 100vh;
  /* background-image: url("../assets/back2.png");
  background-repeat: repeat; */
}
.content{
  position:fixed;
  bottom: 56px;
  width:100%;
}
html{
  overflow-y: hidden; /*스크롤바 안생기게 */
}
</style>
