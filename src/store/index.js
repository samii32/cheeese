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
    alert_warning_duplicate_show: false,
    alert_login_fail_show: false,
    alert_login_validate_show: false,
    hidden_number: '',
    modalShow: false,
    user:
    {
      id: '', pw: '', nm: '', msg: '', no: '', email: ''
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
    setDisabled (state) {
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
    sendEmail ({ state, commit }, email) {
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

          if (res.data === '') {
            console.log('가입실패!\n id중복 확인하세요')
            this.state.alert_warning_duplicate_show = true
            this.state.alert_warning_info_show = false
          } else {
            commit('moveTo', 'Home')
            commit('setId', info.id)
            state.info.id = ''
            state.info.pw = ''
            state.info.email = ''
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          console.log('마지막')
        })
      } else {
        this.state.alert_warning_info_show = false
        this.state.alert_danger_show = true
        this.state.alert_warning_show = false
        // alert('이메일 인증을 해주세요.')
      }
    },
    login ({ state, commit }, user) {
      if (user.id && user.pw) {
        axios.post('http://localhost:3000/login', state.user).then((res) => {
          console.log(res.data)
          if (res.data[0]) {
            user.no = res.data[0].no
            user.id = res.data[0].id
            user.nm = res.data[0].nm
            user.email = res.data[0].email
            user.msg = res.data[0].msg

            console.log('로그인성공')
            console.log(user.id + ':' + user.msg + ':' + user.nm)
            commit('moveTo', 'Peoples')
            state.user.id = ''
            state.user.pw = ''
            state.alert_login_fail_show = false
            state.alert_login_validate_show = false
          } else {
            state.alert_login_fail_show = true
            state.alert_login_validate_show = false
            // console.log('로그인실패, id, pw 다시 확인하세요.')
          }
        }).catch((error) => {
          console.log('hhh')
          console.log(error)
        }).finally(() => {
          console.log('마지막')
        })
      } else {
        state.alert_login_fail_show = false
        state.alert_login_validate_show = true
        // console.log('id, pw입력하세요.')
      }
    },
    searchUser({ state, dispatch }, id) {
      // document.querySelector('.modalMsg').value = ''
      axios.post('http://localhost:3000/searchUser', { id: id }).then((res) => {
        console.log(res.data[0])
        // 새친구의 정보를 전달해주어야함.
        var newUser = res.data[0]
        dispatch('foundUser', newUser)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed searchUser')
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
      span.innerHTML = user.nm
      var hiddenSpan = document.createElement('span')
      hiddenSpan.classList.add('m_friendNo')
      hiddenSpan.innerHTML = user.no
      hiddenSpan.style.display = 'none'

      var btn = document.createElement('button')
      btn.classList.add('mt-3', 'btn', 'btn-success')
      btn.onclick = function () {
        // 친구를 db에 등록.
        var param = { me: state.user.no, friend: user.no }
        axios.post('http://localhost:3000/addFriend', param).then((res) => {
          if (res.data.stat === 'OK') {
            console.log('친추성공')
            state.friends.push({ nick: user.id, msg: user.msg })
            state.modalShow = !state.modalShow
          } else {
            console.log('이미 추가한 친구')
            document.querySelector('.modalMsg').innerHTML = '이미 추가한 친구 입니다.'
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          console.log('completed friend')
        })
      }
      console.log(state.modalMsg)
      btn.innerHTML = 'Add'
      div.appendChild(img)
      div.appendChild(span)
      div.appendChild(hiddenSpan)
      var modalMsg = document.createElement('div')
      modalMsg.classList.add('modalMsg')
      div.appendChild(modalMsg)
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
