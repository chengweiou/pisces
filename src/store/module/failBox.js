import { clone } from '@/fn'
import { i18n } from '@/i18n'
const { t } = i18n.global

const CLEAN_STATE = {
  cache: false,
  show: false,
  name: '',
  content: '',
}

const state = clone(CLEAN_STATE)

const actions = {
  async onRest({ commit, dispatch, state, rootState }, payload, config = {}) {
    if (payload.code === 'UNAUTH') {
      dispatch('me/logout', {}, { root: true })
    }
    let name = t(payload.name || getNameAndContent(payload.code).name)
    let content = t(payload.content || getNameAndContent(payload.code).content)
    commit('show', true)
    commit('name', name)
    commit('content', content)
  },
  async off({ commit, dispatch, state, rootState }, payload, config = {}) {
    commit('show', false)
    commit('name', '')
    commit('content', '')
  },
}

const mutations = {
  show(state, e) {
    state.show = e
  },
  name(state, e) {
    state.name = e
  },
  content(state, e) {
    state.content = e
  },
}

function getNameAndContent(code) {
  switch (code) {
    case '-1': return { name: t(`codeNetwork`), content: t(`msgNetwork`) }
    default: return { name: `code${code}`, content: `msg${code}` }
  }
}

export default {
  namespaced: true, state, actions, mutations,
}
