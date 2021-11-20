import { valid } from '@/fn'
import { i18n } from '@/i18n'
const { t } = i18n.global

const uppercase = ([s0, ...other]) => `${s0?.toUpperCase()}${other.join('')}`
class Need {
  constructor(name) {
    this._name = name
  }
  min(v) { this._min = v; return this }
  max(v) { this._max = v; return this }
  msg(v) { this._msg = v; return this }
  build() {
    let result = {required: true, trigger: 'blur'}
    if (!this._msg) {
      let msg = `need${uppercase(this._name)}`
      if (this._min) msg = `${msg}Min${this._min}`
      if (this._max) msg = `${msg}Max${this._max}`
      this._msg = t(msg)
    }
    if (this._min) result.min = this._min
    if (this._max) result.max = this._max
    return {...result, message: this._msg}
  }
}

const simpleRule = {
  name: [{ required: true, message: t('needName'), trigger: 'blur' }, { max: 100, message: t('needNameLen100'), trigger: 'blur' }],
  des: [{ required: true, message: t('needDes'), trigger: 'blur' }],
  img: [{ required: true, message: t('needImg'), trigger: 'blur' }],
  type: [{ required: true, message: t('needType'), trigger: 'blur' }],
  phone: [{ required: true, message: t('needPhone'), trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: t('needEmail'), trigger: 'blur' }],
  username: [{ required: true, min: 3, message: t('needUsernameLen3'), trigger: 'blur' }, { validator: (rule, value, callback) => valid.checkUsername('account', value, callback), trigger: 'blur' }],
  password: [{ required: true, min: 3, message: t('needPasswordLen3'), trigger: 'blur' }],
  personId: [{ required: true, message: t('needPerson'), trigger: 'blur' }],
  date: [{ required: true, message: t('needDate'), trigger: 'blur' }],
  need: (msg) => new Need().msg(msg).build(),
  custom: () => new Need(),
  needName: new Need('name').build(),
  needNameLen100: new Need('name').max(100).build(),
  needDes: new Need('des').build(),
  needImg: new Need('img').build(),
  needType: new Need('type').build(),
  needPhone: new Need('phone').build(),
  needEmail: new Need('email').build(),
  needUsername: new Need('username').build(),
  needPassword: new Need('password').build(),
  needRePassword: new Need('rePassword').build(),
}

export default simpleRule
