import { clone } from '@/fn'
import { i18n } from '@/i18n'
const { t } = i18n.global

const CLEAN_STATE = {
  typeMap: { DOG: t('dog'), cat: t('cat') },
}

const state = clone(CLEAN_STATE)
createList()

const actions = {
}

const mutations = {
}

export default {
  namespaced: true, state, actions, mutations,
}

function createList() {
  Object.keys(CLEAN_STATE).filter(mapName => mapName.toLowerCase().endsWith('map')).map(mapName => {
    let name = mapName.substring(0, mapName.length - 3)
    state[`${name}List`] = Object.keys(CLEAN_STATE[mapName]).map(k => { return { k: k, v: CLEAN_STATE[mapName][k] } })
  })
}
