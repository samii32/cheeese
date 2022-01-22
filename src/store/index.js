import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    txt: 'aa',
    show: false,
    user:
    {
      id: '', pw: ''
    },
    info:
    {
      id: '', pw: '', pw2: ''
    }
  },
  mutations: {
    setshow (state, path) {
      if (path === '/' || path === '/signup') {
        state.show = false
      } else {
        state.show = true
      }
    },
    setId (state, id) {
      console.log('setId:' + id)
      state.user.id = id
      state.info.id = ''
      state.info.pw = ''
      state.info.pw2 = ''
    },
    setPw (state, pw) {
      console.log('setPw:' + pw)
      state.user.pw = pw
    },
    setId_signup (state, id) {
      console.log('setId:' + id)
      state.info.id = id
    },
    setPw_signup (state, pw) {
      console.log('setPw:' + pw)
      state.info.pw = pw
    },
    setPw2_signup (state, pw2) {
      console.log('setPw2:' + pw2)
      state.info.pw2 = pw2
    },
    moveTo (state, path) {
      router.push({ name: path })
    }
  },
  getters: {
    getTime: (state) => {
      var today = new Date()
      var ampm = today.getHours() < 12 ? 'AM' : 'PM'
      var h = today.getHours() < 12 ? today.getHours() : parseInt(today.getHours()) - 12
      var m = String(today.getMinutes()).length < 2 ? '0' + String(today.getMinutes()) : today.getMinutes()
      return ampm + ' ' + h + ':' + m
    }
  },
  actions: {
    signup ({ state, commit }, info) {
      console.log(info.id + '/' + info.pw + '/' + info.pw2)
      commit('moveTo', 'Home')
      commit('setId', info.id)
      state.info.id = ''
      state.info.pw = ''
      state.info.pw2 = ''
    },
    login ({ state, commit }, user) {
      console.log(user.id + ':' + user.pw)
      commit('moveTo', 'Peoples')
      state.user.id = ''
      state.user.pw = ''
    },
    addChat ({ state, commit }, tmp) {
      // 가장 마지막에있는 div가져옴.
      var lastchat = document.getElementById('conversation').lastChild
      var curClass = tmp.who === 'me' ? 'me' : 'someone'

      var div = document.createElement('div')
      if (tmp.who === 'me') {
        div.classList.add('me') // 클래스 추가
        div.classList.add('c_dflex_reverse') // 클래스 추가
      } else {
        div.classList.add('someone')
        div.classList.add('c_dflex') // 클래스 추가

        var img = document.createElement('img')
        img.classList.add('c_img')
        img.src = require('@/assets/cheese.png')

        if (lastchat.classList[0] === curClass) {
          // 같은 사람이 한 말이라면
          // 이미지 없애주어야함.
          img.src = require('@/assets/transparent.png')
          img.style.backgroundColor = 'transparent'
        }

        div.appendChild(img)
      }

      var content = document.querySelector('.c_over')
      content.appendChild(div)

      var div2 = document.createElement('div')
      var div2Div = document.createElement('div') // 이름
      div2Div.classList.add('c_nm')
      if (tmp.who !== 'me') {
        div2Div.innerHTML = tmp.who
      }

      var div2Div2 = document.createElement('div')
      var pre = document.createElement('pre')
      div2Div2.classList.add('c_content')
      div2Div2.innerHTML = tmp.txt
      // 같은 사람이면 이름 표시 안한다.
      if (lastchat.classList[0] !== curClass) {
        div2.appendChild(div2Div)
      }
      pre.appendChild(div2Div2)
      div2.appendChild(pre)
      div.appendChild(div2)

      var span = document.createElement('span')
      span.classList.add('time')

      // 현재 시간
      var today = new Date()
      var ampm = today.getHours() < 12 ? 'AM' : 'PM'
      var h = today.getHours() < 12 ? today.getHours() : parseInt(today.getHours()) - 12
      h = h === 0 ? 12 : h
      var m = String(today.getMinutes()).length < 2 ? '0' + String(today.getMinutes()) : today.getMinutes()
      var t = ampm + ' ' + h + ':' + m

      // span.innerHTML = this.getters.getTime()
      span.innerHTML = t
      div.appendChild(span)

      // 바로 마지막말이 같은 시간인지 확인
      if (lastchat.classList[0] === curClass && lastchat.lastChild.textContent === t) {
        lastchat.lastChild.textContent = ''
      }

      div.scrollTop = div.scrollHeight
      console.log(div)
      console.log(div.scrollHeight)
    }
  },
  modules: {
  }
})
