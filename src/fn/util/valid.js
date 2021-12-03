import { store } from '@/store'
import { i18n } from '@/i18n'
const { t } = i18n.global

export default {
  async checkKey(k, payload, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = await store.dispatch(`${k}/checkKey`, payload)
    if (!valid) {
      callback(new Error(t('checkKey')))
      return
    }
    callback()
  },
  async checkName(k, value, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = await store.dispatch(`${k}/checkName`, { name: value })
    if (!valid) {
      callback(new Error(t('checkName')))
      return
    }
    callback()
  },
  async checkPhone(k, payload, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = await store.dispatch(`${k}/checkPhone`, payload)
    if (!valid) {
      callback(new Error(t('needPhoneOther')))
      return
    }
    callback()
  },
  async checkEmail(k, payload, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = await store.dispatch(`${k}/checkEmail`, payload)
    if (!valid) {
      callback(new Error(t('needEmailOther')))
      return
    }
    callback()
  },
  async checkUsername(k, value, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = await store.dispatch(`${k}/checkUsername`, { username: value })
    if (!valid) {
      callback(new Error(t('needUsername')))
      return
    }
    callback()
  },
  async checkRepassword(k, value, callback, pass) {
    if (pass) {
      callback()
      return
    }
    let valid = k === value
    if (!valid) {
      callback(new Error(t('checkRepassword')))
      return
    }
    callback()
  },
}
