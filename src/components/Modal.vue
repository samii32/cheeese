<template>
  <div>
    <div class="d-flex justify-content-between" >
      <b-input-group size="sm" prepend="ID">
        <v-text-field label="friend id" v-model="FriendID" style="padding:0; margin:3px 0 0 2px;">
        </v-text-field>
      <b-input-group-append>
        <b-button size="m" style="margin-left:5px;" text="Button" variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    </div>
    <div>
    <b-button style="float: right;" class="mt-3" block @click="$store.state.modalShow=!$store.state.modalShow">Add</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data: () => ({
    FriendID: ''
  })
}
</script>

<style scoped>
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
