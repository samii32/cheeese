import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    txt: 'aa',
    show: false,
    number_show: false,
    alert_show: false,
    alert_danger_show: false,
    alert_warning_show: false,
    alert_warning_info_show: false,
    hidden_number: '',
    modalShow: false,
    user:
    {
      id: '', pw: ''
    },
    info:
    {
      id: '', pw: '', email: ''
    },
    friends: [{
      nick: 'cathy',
      msg: '행복해fghfhg'
    },
    {
      nick: 'jake',
      msg: 'joyfulghhjgj'
    },
    {
      nick: 'sam',
      msg: '삼인행필유아사fghfgh'
    },
    {
      nick: 'cathy',
      msg: '행복해fghfhg'
    },
    {
      nick: 'jake',
      msg: 'joyfulghhjgj'
    },
    {
      nick: 'sam',
      msg: '삼인행필유아사fghfgh'
    },
    {
      nick: 'cathy',
      msg: '행복해fghfhg'
    },
    {
      nick: 'jake',
      msg: 'joyfulghhjgj'
    },
    {
      nick: 'sam',
      msg: '삼인행필유아사fghfgh'
    },
    {
      nick: 'cathy',
      msg: '행복해fghfhg'
    },
    {
      nick: 'jake',
      msg: 'joyfulghhjgj'
    },
    {
      nick: 'sam',
      msg: '삼인행필유아사fghfgh'
    }],
    openwins: [
    ]
  },
  mutations: {
    setshow (state, path) {
      if (path === '/' || path === '/signup') {
        state.show = false
      } else {
        state.show = true
      }
    },
    togglemodalShow (state) {
      state.modalShow = !state.modalShow
    },
    setId (state, id) {
      console.log('setId:' + id)
      state.user.id = id
      state.info.id = ''
      state.info.pw = ''
      state.info.email = ''
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
    setEmail_signup (state, email) {
      console.log('setEmail:' + email)
      state.info.email = email
      // 이메일이 정규식에 맞는지 확인
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*/i
      var btn = document.querySelector('#btn_email')
      if (email.match(regExp) != null) {
        console.log('올바른형식!')
        btn.removeAttribute('disabled')
      } else {
        btn.setAttribute('disabled', 'disabled')
      }
    },
    setDisabled(state) {
      var inputEmail = document.querySelector('#input_email')
      inputEmail.setAttribute('disabled', 'disabled')
      var btn = document.querySelector('#btn_email')
      btn.setAttribute('disabled', 'disabled')
    },
    removeDisabled (state) {
      var btn = document.querySelector('#btn_email')
      btn.removeAttribute('disabled')
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
    sendEmail({ state, commit }, email) {
      this.state.alert_danger_show = false
      this.state.alert_waring_show = false
      this.state.alert_warning_info_show = false
      var param = { email: email }
      axios.post('http://localhost:3000/send_email', param).then((res) => {
        console.log(res.data.no)
        state.hidden_number = res.data.no
        state.number_show = true // 인증 번호 보이기
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed!')
      })
    },
    signup ({ state, commit }, info) {
      if (this.state.alert_show) {
        this.state.alert_danger_show = false
        this.state.alert_waring_show = false
        console.log(info.id + '/' + info.pw + '/' + info.email)
        axios.post('http://localhost:3000/signup', info).then((res) => {
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          console.log('마지막')
        })
        commit('moveTo', 'Home')
        commit('setId', info.id)
        state.info.id = ''
        state.info.pw = ''
        state.info.email = ''
      } else {
        this.state.alert_danger_show = true
        this.state.alert_waring_show = false
        // alert('이메일 인증을 해주세요.')
      }
    },
    login ({ state, commit }, user) {
      console.log(user.id + ':' + user.pw)
      commit('moveTo', 'Peoples')
      state.user.id = ''
      state.user.pw = ''

      axios.post('http://localhost:3000/login', state.user).then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('마지막')
      })
    },
    foundUser ({ state, commit }, user) {
      var content = document.querySelector('#content')
      content.innerHTML = ''
      var div = document.createElement('div')
      div.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center')
      var img = document.createElement('img')
      img.classList.add('m_img')
      img.src = require('@/assets/cheese.png')
      var span = document.createElement('span')
      span.classList.add('m_friendId')
      span.innerHTML = user.id

      var btn = document.createElement('button')
      btn.classList.add('mt-3', 'btn', 'btn-success')
      btn.onclick = function () {
        state.modalShow = !state.modalShow
        state.friends.push({ nick: user.id, msg: user.msg })
      }
      btn.innerHTML = 'Add'
      div.appendChild(img)
      div.appendChild(span)
      div.appendChild(btn)

      content.appendChild(div)
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
        console.log(lastchat)
        if (lastchat !== null && lastchat.classList[0] === curClass) {
          // 같은 사람이 한 말이라면
          // 이미지 없애주어야함.
          img.style.opacity = 0
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
      if (lastchat !== null && lastchat.classList[0] !== curClass) {
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
      if (lastchat !== null && lastchat.classList[0] === curClass && lastchat.lastChild.textContent === t) {
        lastchat.lastChild.textContent = ''
      }

      div.scrollTop = div.scrollHeight
    },
    addWin ({ state, commit }, winnm) {
      state.openwins.push({ id: winnm })
      // console.log(state.openwins)
    },
    removeWin ({ state, commit }, winnm) {
      const i = state.openwins.map(item => item.id).indexOf(winnm)
      state.openwins.splice(i, 1)
    },
    isExistWin ({ state, commit }, winnm) {
      state.openwins.forEach(element => {
        console.log(element)
        if (element.id === winnm) {
          return true
        }
        return false
      })
    }
  },
  modules: {
  }
})
