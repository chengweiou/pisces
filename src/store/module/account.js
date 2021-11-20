import { clone, empty } from '@/fn'
import service from '@/sdk/accountService'

const CLEAN_STATE = {
  total: 0,
  page: { curr: 1 },
  filter: { k: '', skip: 0, limit: 10 },
  list: [],
  detail: { },
}

const state = clone(CLEAN_STATE)

const actions = {
  async save({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.mg().save(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    state.list.push({ ...payload, id: rest.data })
    commit('list', state.list)
    dispatch('modal/off', null, { root: true })
    // dispatch('accountDb/cleanSave', null, { root: true })
    return true
  },
  async remove({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.mg().remove(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('list', state.list.filter(e => e.id!=payload.id))
    return true
  },
  async checkUsername({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.all().checkUsername(payload)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    return rest.data
  },

  async findByPerson({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.mg().findByPerson({ person: payload.person })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', rest.data)
  },
  async updateByPerson({ commit, dispatch, state, rootState }, payload, config = {}) {
    let { username, password, rePassword, ...e } = payload
    if (payload.hasUsername) e.username = username
    if (payload.hasPassword) e.password = password
    let rest = await service.mg().updateByPerson(e)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return false
    }
    commit('detail', {...e, username})
    return true
  },
}

const mutations = {
  reset(state, e) {
    state = clone(CLEAN_STATE)
  },
  detail(state, e) {
    state.detail = { ...clone(CLEAN_STATE).detail, ...e }
  },
  total(state, e) {
    state.total = e
  },
  page(state, e) {
    state.page = e
  },
  resetFilter(state, e) {
    state.filter = { ...clone(CLEAN_STATE).filter }
    state.list = []
  },
  filter(state, e) {
    state.filter = e
  },
  list(state, e) {
    state.list = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
