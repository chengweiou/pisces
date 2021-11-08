import service from '@/sdk/personService'
import { clone, empty } from '@/fn'
import accountService from '@/sdk/accountService'
import uploadService from '@/sdk/uploadService'

const CLEAN_STATE = {
  total: 0,
  page: { curr: 1 },
  filter: { k: '', skip: 0, limit: 10 },
  list: [],
  detail: { },

  byTrainer: {
    total: 0,
    page: { curr: 1 },
    filter: { k: '', skip: 0, limit: 10 },
    list: [],
  },

}

const state = clone(CLEAN_STATE)

const actions = {
  async save({ commit, dispatch, state, rootState }, payload, config = {}) {
    let { img, ...e } = payload
    if (payload.img) {
      let rest = await uploadService.mg().save({ file: payload.img, category: 'person', w: 500 })
      if (rest.code !== 'OK') {
        dispatch('failBox/onRest', rest, { root: true })
        return
      }
      e.imgsrc = rest.data
    }
    let rest = await service.mg().save(e)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    state.list.push({ ...e, id: rest.data })
    commit('list', state.list)
    dispatch('modal/off', null, { root: true })
    dispatch('personDb/cleanSave', null, { root: true })
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
  async update({ commit, dispatch, state, rootState }, payload, config = {}) {
    let { img, nextLessonList, ...e } = payload
    if (payload.img) {
      let rest = await uploadService.mg().save({ file: payload.img, category: 'person', nameWithoutType: `avatar${payload.id}`, w: 500 })
      if (rest.code !== 'OK') {
        dispatch('failBox/onRest', rest, { root: true })
        return
      }
      e.imgsrc = rest.data
    }
    let rest = await service.mg().update(e)
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return false
    }
    commit('detail', {...e, nextLessonList})
    return true
  },
  async findById({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.mg().findById({ id: payload.id })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('detail', rest.data)
  },
  resetFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('resetFilter', 'REMOVE')
  },
  changeFilter({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('filter', { ...state.filter, ...payload })
  },
  changePage({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('filter', { ...state.filter, skip: (payload.curr - 1) * state.filter.limit })
    commit('page', payload)
  },
  async count({ commit, dispatch, state, rootState }, payload, config = {}) {
    let rest = await service.mg().count({ ...state.filter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('total', rest.data)
  },
  async find({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('list', [])
    let rest = await service.mg().find({ ...state.filter, ...payload })
    if (rest.code !== 'OK') {
      dispatch('failBox/onRest', rest, { root: true })
      return
    }
    commit('list', rest.data)
    return true
  },
  reset({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('reset', 'REMOVE')
    commit('resetFilter', 'REMOVE')
  },
  resetDetail({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('detail', {})
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
  totalByTrainer(state, e) {
    state.byTrainer.total = e
  },
  pageByTrainer(state, e) {
    state.byTrainer.page = e
  },
  resetFilterByTrainer(state, e) {
    state.byTrainer.filter = { ...clone(CLEAN_STATE).byTrainer.filter }
    state.byTrainer.list = []
  },
  filterByTrainer(state, e) {
    state.byTrainer.filter = e
  },
  listByTrainer(state, e) {
    state.byTrainer.list = e
  },
}

export default {
  namespaced: true, state, actions, mutations,
}
