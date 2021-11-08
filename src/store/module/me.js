import accountService from '@/sdk/accountService'
import personService from '@/sdk/personService'
import { router } from '@/router'
import { clone, emptyFn } from '@/fn'
const CLEAN_STATE = {
  showLogin: false,
  user: {}, // 目前用于给db获取身份区别
}

const state = clone(CLEAN_STATE)
const actions = {
  async login({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await accountService.all().login(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    rest = await personService.me().me()
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('showLogin', false)
    commit('user', rest.data)
    await router.replace({ name: 'refresh' })
    return true
  },
  async logout({ commit, dispatch, state, rootState }, payload, config = {}) {
    accountService.all().logout()
    sessionStorage.clear()
    commit('logout')
    await router.replace({ name: 'refresh' })
    router.push({ name: 'login' })
  },
}

const mutations = {
  showLogin(state, e) {
    state.showLogin = e
  },
  user(state, e) {
    state.user = e
  },
  logout(state) {
    initState(state)
  },
  account(state, e) {
    state.account = e
  },
}

function initState(s) {
  Object.keys(CLEAN_STATE).forEach(key => {
    s[key] = CLEAN_STATE[key]
  })
}

export default {
  namespaced: true, state, actions, mutations,
}
