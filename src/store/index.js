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
    friends: [],
    talkList: [],
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
    // check_uc ({ state, commit, dispatch }, info) {
    //   var result = ''
    //   axios.post('http://localhost:3000/check_uc', { me: info.me, you: info.you }).then((res) => {
    //     console.log('checking user_channel')
    //     result = res.data[0]
    //     console.log('!!!!!!!!')
    //     console.log(result)
    //     // 여기서 이미 채널번호를 알고있다. 채널번호를 새팝업에 전달하는방법은없을까.?
    //     if (result.channel_no === 'none') {
    //       // channel 테이블에 새채널을 따서 새채널no를 가져와야한다.
    //       // 새로 user_channel 테이블에 새로딴 insert
    //       console.log('없음')
    //       dispatch('create_channel', { last_msg: '', groupYN: 'N', me: info.me, you: info.you })
    //     } else {
    //       console.log('0_0:' + result)
    //       // 채널번호를 새팝업에 전달해주면좋겠다.
    //       // msg테이블 대화불러오기
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //   }).finally(() => {
    //     console.log('completed checking user_channel table')
    //   })
    // },
    create_channel ({ state, commit, dispatch }, info) {
      axios.post('http://localhost:3000/create_channel', { last_msg: '', groupYN: 'N' }).then((res) => {
        console.log('create channel')
        var result = res.data[0]
        console.log(result)
        console.log('hi....')
        console.log(info)
        console.log('hi....')
        dispatch('insert_user_channel', { me: info.me, you: info.you, user: info.user })
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed creating channel table')
      })
    },
    insert_user_channel ({ state, commit, dispatch }, info) {
      axios.post('http://localhost:3000/insert_user_channel', info).then((res) => {
        console.log('insert insert_user_channel')
        var result = res.data.stat
        console.log('★★★★★★')
        console.log(result)
        // insert OK 하면 getchannelNo로 값 받아와서 친추하기
        if (result === 'OK') {
          dispatch('getChannelNo', info)
          // state.friends.push({ no: info.user.no, id: info.user.id, nm: info.user.nm, msg: info.user.msg, channelNo: '1' })
          // state.modalShow = !state.modalShow
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed insert_user_channel')
      })
    },
    login ({ state, commit, dispatch }, user) {
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
            // sessionStorage.setItem('user_no', res.data[0].no)
            // sessionStorage.setItem('user_id', res.data[0].id)
            // state.user.id = sessionStorage.getItem('user_id')
            // state.user.no = sessionStorage.getItem('user_no')
            console.log(user.id + ':' + user.msg + ':' + user.nm)
            // 친구목록을 가져와서 셋팅하기
            dispatch('getFriend', user.no)
            commit('moveTo', 'Peoples')

            // state.user.id = ''
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
    getFriend ({ state, dispatch }, no) {
      axios.post('http://localhost:3000/getFriend', { no: no }).then((res) => {
        console.log('friends목록 셋팅')
        var friends = res.data
        friends.forEach(friend => {
          state.friends.push(friend)
        })
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed getFriend')
      })
    },
    getUserNo ({ state, dispatch }, id) {
      axios.post('http://localhost:3000/getUserNo', { id: id }).then((res) => {
        var userNo = res.data[0]
        console.log(userNo)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed getUserNo')
      })
    },
    getChannelNo ({ state, dispatch }, info) {
      axios.post('http://localhost:3000/getchannelNo', { me: info.me, you: info.you }).then((res) => {
        console.log(info.me + '와' + info.you + '가 연결된 채널번호가져옴')
        var channelNo = res.data
        // 친구와 연결된 채널을 찾고서 friend에 담는다.
        state.friends.push({ no: info.user.no, id: info.user.id, nm: info.user.nm, msg: info.user.msg, channelNo: channelNo })
        state.modalShow = !state.modalShow
        console.log(channelNo + '방 입니다.')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed getchannelNo')
      })
    },
    searchUser ({ state, dispatch }, id) {
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
    foundUser ({ state, commit, dispatch }, user) {
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
        // 친구인지여부 확인
        axios.post('http://localhost:3000/isFriend', param).then((res) => {
          console.log(res.data.stat + '★')
          if (res.data.stat === 'Fail') { // 친구등록 전혀 안되있으면 새로 추가해야함.
            axios.post('http://localhost:3000/addFriend', param).then((res) => {
              if (res.data.stat === 'OK') {
                dispatch('create_channel', { me: param.me, you: param.friend, user: user })
                console.log('친추성공')
              }
            }).catch((error) => {
              console.log(error)
            }).finally(() => {
              console.log('completed friend')
            })
          } else if (res.data.stat[0].friendYN === 'N') {
            console.log('상대는 나를 친추했었음.')
            axios.post('http://localhost:3000/updateFriend', param).then((res) => {
              if (res.data.stat === 'OK') {
                console.log('친추성공')
                dispatch('getChannelNo', { me: param.me, you: param.friend, user: user })
                // state.friends.push({ no: user.no, id: user.id, nm: user.nm, msg: user.msg })
                // state.modalShow = !state.modalShow
              } else {
                console.log('fail update..')
              }
            }).catch((error) => {
              console.log(error)
            }).finally(() => {
              console.log('completed friend')
            })
          } else {
            console.log(res.data.stat[0])
            console.log(res.data.stat[0].friendYN)
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
    addChat ({ state, commit, dispatch }, tmp) {
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
      div2.classList.add('overflow')
      var div2Div = document.createElement('div') // 이름
      div2Div.classList.add('c_nm')
      if (tmp.who !== 'me') {
        div2Div.innerHTML = tmp.who
      }

      var div2Div2 = document.createElement('div')
      var pre = document.createElement('div')
      div2Div2.classList.add('c_content')
      var pre2 = document.createElement('pre')
      pre2.classList.add('pre2')
      pre2.innerHTML = tmp.txt
      // div2Div2.innerHTML = info.txt
      div2Div2.appendChild(pre2)
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
      console.log('div.scrolltop:' + div.scrolltop)
      console.log('div.scrollHeight:' + div.scrollHeight)

      // div.scrollTop = div.scrollHeight
    },
    getDay ({ state, commit }, info) {
      // 가장 마지막의  date 숫자를 가져와야함.

      var lastDate = document.getElementsByName('date').lastChild

      console.log(lastDate + 'last~~Date')

      var day = document.createElement('div')
      // day.style.borderBottom = 'solid thin #cfcfcf'
      day.style.width = '100%'
      day.style.display = 'flex'
      day.style.alignItems = 'center'
      day.style.justifyContent = 'center'

      var leftDiv = document.createElement('div')
      var date = document.createElement('div')
      var rightDiv = document.createElement('div')

      date.className = 'date'
      date.textContent = info.day
      date.style.textAlign = 'center'
      date.style.width = '100px'

      leftDiv.style.border = 'solid 0.5px #cfcfcf'
      rightDiv.style.border = 'solid 0.5px #cfcfcf'
      var margin = 20
      leftDiv.style.margin = margin + 'px'
      rightDiv.style.margin = margin + 'px'

      leftDiv.style.width = window.innerWidth / 2 - 40 - 2 * margin + 'px'
      rightDiv.style.width = window.innerWidth / 2 - 40 - 2 * margin + 'px'

      day.appendChild(leftDiv)
      day.appendChild(date)
      day.appendChild(rightDiv)

      var content = document.querySelector('.c_over')
      content.appendChild(day)
    },
    getChat ({ state, commit }, info) {
      // 가장 마지막에있는 div가져옴.
      // info who, txt, created_at
      var lastchat = document.getElementById('conversation').lastChild
      var curClass = info.who === 'me' ? 'me' : 'someone'

      var div = document.createElement('div')

      if (info.who === 'me') {
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
      div2.classList.add('overflow')
      var div2Div = document.createElement('div') // 이름
      div2Div.classList.add('c_nm')
      if (info.who !== 'me') {
        div2Div.innerHTML = info.who
      }

      var div2Div2 = document.createElement('div')
      var pre = document.createElement('div')
      div2Div2.classList.add('c_content')
      var pre2 = document.createElement('pre')
      pre2.classList.add('pre2')
      pre2.innerHTML = info.txt
      // div2Div2.innerHTML = info.txt
      div2Div2.appendChild(pre2)
      // 같은 사람이면 이름 표시 안한다.
      if (lastchat !== null && lastchat.classList[0] !== curClass) {
        div2.appendChild(div2Div)
      }
      if (lastchat === null && info.who !== 'me') {
        div2.appendChild(div2Div)
      }
      pre.appendChild(div2Div2)
      div2.appendChild(pre)
      div.appendChild(div2)

      var span = document.createElement('span')
      span.classList.add('time')

      // 시간
      span.innerHTML = info.created_at
      div.appendChild(span)

      // 바로 마지막말이 같은 시간인지 확인
      if (lastchat !== null && lastchat.classList[0] === curClass && lastchat.lastChild.textContent === info.time) {
        lastchat.lastChild.textContent = ''
      }
      var tagId = document.getElementById('conversation')
      tagId.scrollTop = tagId.scrollHeight
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
    },
    saveMessage ({ state, dispatch }, info) {
      axios.post('http://localhost:3000/insert_message', { sender: info.sender, receiver: info.receiver, channelNo: info.channelNo, txt: info.txt }).then((res) => {
        console.log(res.data[0])
        var tmp = { channelNo: info.channelNo, last_msg: info.txt }
        dispatch('update_channel', tmp)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed saveMessage')
      })
    },
    update_channel ({ state, dispatch }, info) {
      axios.post('http://localhost:3000/update_channel', { channelNo: info.channelNo, last_msg: info.last_msg }).then((res) => {
        console.log(res.data[0])
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed update channel...!')
      })
    },
    getMessage ({ state, dispatch }, tmp) {
      axios.post('http://localhost:3000/getMessage', { channelNo: tmp.channelNo }).then((res) => {
        var txts = res.data
        console.log(txts)
        // info who, txt, created_at
        var prevDate = '1900.01.01'
        txts.forEach(function (txt) {
          console.log(txt)
          var who = ''
          if (String(txt.no) === tmp.no) {
            who = 'me'
          } else {
            who = txt.name
          }

          var info = { who: who, txt: txt.txt, day: txt.day, created_at: txt.time }
          console.log(prevDate + ',' + info.day)
          console.log(prevDate < info.day)
          if (prevDate < info.day) {
            dispatch('getDay', info)
            prevDate = info.day
          }
          dispatch('getChat', info)
        })
        /* friends.forEach(friend => {
          state.friends.push(friend)
        }) */
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed saveMessage')
      })
    },
    getChannelList ({ state, dispatch }, tmp) {
      axios.post('http://localhost:3000/get_channel_list', { no: tmp.no }).then((res) => {
        var txts = res.data
        console.log('-==========')
        console.log(txts)
        console.log('-==========')
        txts.forEach(txt => {
          console.log('....................')
          state.talkList.push(txt)
          console.log('....................')
        })
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        console.log('completed getChannelList')
      })
    }
  },
  modules: {
  }
})
