import fetchUtil from './util/fetchUtil'
import site from './config/site'
import storage from './util/storage'
import paramUtil from './util/paramUtil'


export default class accountService {
  static all() { return All }
  static me() { return Me }
  static mg() { return Mg }
}
class All {
  static checkUsername(e) {
    let url = `${site.andromeda}/account/username/check?${paramUtil.createUrlEncode(e)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }

  static login(e) {
    let url = `${site.andromeda}/login`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options).then(rest => {
      if (rest.code !== 'OK') return rest
      storage.set('token', rest.data.token)
      storage.set('refreshToken', rest.data.refreshToken)
      // todo 仅测试
      storage.set('loginAccount', {person: rest.data.person, extra: 'SUPER'})
      this.keepLogin()
      return rest
    })
  }

  static keepLogin() {
    setTimeout(() => this.refreshToken(), refreshTime)
  }
  static refreshToken() {
    let url = `${site.andromeda}/token/refresh`
    let formData = paramUtil.createFormData({refreshToken: storage.get('refreshToken')})
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options).then(rest => {
      if (rest.code !== 'OK') return rest
      storage.set('token', rest.data.token)
      this.keepLogin()
      return rest
    })
  }

  static logout() {
    let url = `${site.andromeda}/logout`
    let formData = paramUtil.createFormData({refreshToken: storage.get('refreshToken')})
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
}

class Me {
  static me() {
    let url = `${site.andromeda}/me/account`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static updateAccount(e) {
    let url = `${site.andromeda}/me/account`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static updatePassword(e) {
    let url = `${site.andromeda}/me/account/password`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
}

class Mg {
  static save(e) {
    let url = `${site.andromeda}/mg/account`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static remove(e) {
    let url = `${site.andromeda}/mg/account/${e.id}`
    let options = {
      method: 'DELETE',
    }
    return fetchUtil.run(url, options)
  }
  static updateByPerson(e) {
    let url = `${site.andromeda}/mg/account/person/${e.person.id}`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static findByPerson(e) {
    let url = `${site.andromeda}/mg/account/person/${e.person.id}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }

}

const refreshTime = 5 * 60 * 1000
