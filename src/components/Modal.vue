<template style="top:20px;">
  <div>
    <div class="d-flex justify-content-between" >
      <div>
        <span class="btn btn-light" style="border-color:lightgray; background-color:#ededed; cursor:default;">ID</span>
      </div>
        <v-text-field id='fid' label="friend id" @keyup.enter="enter" v-model="user.id" style="padding:0; margin:3px 0 0 2px;">
        </v-text-field>
        <div>
          <b-button size="m" style="margin-left:5px; background-color:#e9ecef; border: 1px solid #ced4da" text="Button" @click="search">Search</b-button>
        </div>
    </div>
    <div id="content">
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Modal',
  data: () => ({
    user: { id: '', msg: '' }
  }),
  methods: {
    ...mapActions(['foundUser', 'addUser', 'searchUser']),
    search () {
      if (this.user.id !== '') {
        console.log('id있음')
        // 아이디가 있으면 검색
        this.searchUser(this.user.id)
        // 해당하는 유저가 있으면 추가
      } else {
        console.log('id없음')
      }
    },
    enter () {
      this.search()
    }
  },
  mounted: function () {

  }
}
</script>

<style>
.m_img{
max-width:100%; max-height:100%;
display:inline-block;
vertical-align:middle;
width:100px;
height:100px;
border-radius:50%;
background-color:gray;
}
.m_friendId{
  margin:15px 0 0 0;
}
/*
.modal>.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

.modal>.-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

.modal>.-content {
    padding: 10px 20px;
  }

.modal>.-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;
}
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-window {
    opacity: 0;
    transform: translateY(-20px);
}*/
</style>
