import fetchUtil from './util/fetchUtil'
import site from './config/site'
import paramUtil from './util/paramUtil'
import storage from './util/storage'

export default class {
  static me() { return Me }
  static mg() { return Mg }
}
class Me {
  static me() {
    let url = `${site.milkyway}/me`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options).then(rest => {
      // todo 仅测试
      let loginAccount = storage.get('loginAccount')
      storage.set('loginAccount', {...loginAccount, extra: rest.data.type})
      return rest
    })
  }
  static update(e) {
    let url = `${site.milkyway}/me`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  // static findByCarina(filter) {
  //   let url = `${site.carina}/me/person?${paramUtil.createUrlEncode(filter)}`
  //   let options = {
  //     method: 'GET',
  //   }
  //   return fetchUtil.run(url, options)
  // }
}

class Mg {
  static save(e) {
    let url = `${site.milkyway}/mg/person`
    let formData = paramUtil.createFormData(e)
    let options = {
      method: 'POST',
      body: formData,
    }
    return fetchUtil.run(url, options)
  }
  static remove(e) {
    let url = `${site.milkyway}/mg/person/${e.id}`
    let options = {
      method: 'DELETE',
    }
    return fetchUtil.run(url, options)
  }
  static update(e) {
    let url = `${site.milkyway}/mg/person/${e.id}`
    let options = {
      method: 'PUT',
      body: e,
    }
    return fetchUtil.run(url, options)
  }
  static findById(e) {
    let url = `${site.milkyway}/mg/person/${e.id}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static count(filter) {
    let url = `${site.milkyway}/mg/person/count?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
  static find(filter) {
    let url = `${site.milkyway}/mg/person?${paramUtil.createUrlEncode(filter)}`
    let options = {
      method: 'GET',
    }
    return fetchUtil.run(url, options)
  }
}
