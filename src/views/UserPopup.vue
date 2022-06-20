<template>
  <div class="back">
    <div class="content">
      <div class="center" >
        <img class="img" src="@/assets/cheese.png">
      </div>
      <div>
        <h3 class="center">{{ $route.query.nm }}</h3>
        <h4 class="center">{{ $route.query.msg }}</h4>
      </div>
      <div>
        <v-bottom-navigation
          :value="value"
          color="primary" horizontal
          style="position:fixed;"
        >
          <v-btn>
            <span>Recents</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-btn>
            <span>Favorites</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn>
            <span>Nearby</span>
            <v-icon>mdi-map-marker</v-icon>
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
