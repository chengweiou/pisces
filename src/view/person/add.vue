<template>
  <proj-header :has-back="true" @back="go('personList')">{{t('addPerson')}}</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
    <el-card style="margin: 0 20px 20px;">
      <div class="df df-wrap">
        <el-form-item style="flex: 1;" :label="t('type')" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button v-for="e in typeList" :key="e.k" :label="e.k">{{e.v}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="df df-wrap">
        <el-form-item style="margin-right: 100px; flex: 1;" :label="t('name')" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item style="margin-right: 100px; flex: 1;" :label="t('phone')" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
      </div>
    </el-card>
    <el-card style="margin: 0 20px 20px;">
      <div class="sdf df-wrap">
        <el-form-item style="flex: 1;" :label="t('username')" prop="username">
          <el-input v-model="form.username" @change="changeUsername"/>
          <div style="font-size: 10px;">
            <div :class="{ 'c-green': security.username.needLength, 'c-red': !security.username.needLength }"><icon-check v-if="security.username.needLength" class="icon"/><icon-close v-else class="icon"/>{{ t('usernameNeedLength') }}</div>
            <div :class="{ 'c-green': security.username.needStartWith, 'c-red': !security.username.needStartWith }"><icon-check v-if="security.username.needStartWith" class="icon"/><icon-close v-else class="icon"/>{{ t('usernameNeedStartWith') }}</div>
            <div :class="{ 'c-green': security.username.needNormal, 'c-red': !security.username.needNormal }"><icon-check v-if="security.username.needNormal" class="icon"/><icon-close v-else class="icon"/>{{ t('usernameNeedNormal') }}</div>
          </div>
        </el-form-item>

        <el-form-item style="flex: 1;" :label="t('password')" prop="password">
          <el-input v-model="form.password" type="password" show-password @change="changePassword"/>
          <div style="font-size: 10px;">
            <div :class="{ 'c-green': security.password.needLength, 'c-red': !security.password.needLength }"><icon-check v-if="security.password.needLength" class="icon"/><icon-close v-else class="icon"/>{{ t('passwordNeedLength') }}</div>
            <div :class="{ 'c-green': security.password.needUpper, 'c-red': !security.password.needUpper }"><icon-check v-if="security.password.needUpper" class="icon"/><icon-close v-else class="icon"/>{{ t('passwordNeedUpper') }}</div>
            <div :class="{ 'c-green': security.password.needLower, 'c-red': !security.password.needLower }"><icon-check v-if="security.password.needLower" class="icon"/><icon-close v-else class="icon"/>{{ t('passwordNeedLower') }}</div>
            <div :class="{ 'c-green': security.password.needNum, 'c-red': !security.password.needNum }"><icon-check v-if="security.password.needNum" class="icon"/><icon-close v-else class="icon"/>{{ t('passwordNeedNum') }}</div>
            <div :class="{ 'c-green': security.password.needSpec, 'c-red': !security.password.needSpec }"><icon-check v-if="security.password.needSpec" class="icon"/><icon-close v-else class="icon"/>{{ t('passwordNeedSpec') }}</div>
          </div>
        </el-form-item>
        <el-form-item style="flex: 1;" :label="t('rePassword')" prop="rePassword">
          <el-input v-model="form.rePassword" type="password" show-password/>
        </el-form-item>
      </div>
    </el-card>
    <el-save-btn :loading="loading" @save="save"/>
  </el-form>

</template>

<script setup>
// tip: 导入 component
import { Check as IconCheck, Close as IconClose } from '@element-plus/icons-vue'
import ProjHeader from '@/component/nav/projHeader.vue'
import ElSaveBtn from '@/component/el/el-save-btn.vue'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, empty, clone, valid, simpleRule } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t } = useI18n()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const typeMap = store.state.personTrans.typeMap
const typeList = store.state.personTrans.typeList
const rules = {
  type: simpleRule.type,
  name: simpleRule.name,
  phone: simpleRule.phone,
  username: [{ required: true, trigger: 'blur' }, { validator:  (rule, value, callback) => validUsername(callback), trigger: 'blur' }, { validator: (rule, value, callback) => valid.checkUsername('account', value, callback), trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }, { validator:  (rule, value, callback) => validPassword(callback), trigger: 'blur' }],
  rePassword: [{ validator: (rule, value, callback) => valid.checkRepassword(form.value.password, value, callback), trigger: 'blur' }],
}
const cleanForm = {
  ...empty.person(),
  ...store.state.personDb.save,
}
const securityRule = {
  username: {
    needLength: 6,
  },
  password: {
    needLength: 6,
    needUpper: 1,
    needLower: 1,
    needNum: 1,
    needSpec: 1,
  },
  mix: 'INCLUDE',
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
const security = ref({
  username: {
    needLength: false,
    needStartWith: false,
    needNormal: false,
  },
  password: {
    needLength: false,
    needUpper: false,
    needLower: false,
    needNum: false,
    needSpec: false,
  },
  mix: {

  },
})
// tip: 定义 computed 计算的
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const findPerson = () => {
  store.dispatch('person/find', { limit: 0 })
}
const getDb = () => {
  form.value = clone(cleanForm)
}
const save = () => {
  formEl.value.validate(async(valid) => {
    if (!valid) return false
    loading.value = true
    let pList = await Promise.all([store.dispatch('person/save', form.value), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    ElNotification({ type: 'success', title: t('success') })
    go('personList')
  })
}
const changeUsername = () => {
  security.value.username.needLength = form.value.username.length >= securityRule.username.needLength
  security.value.username.needStartWith = (form.value.username.match(/^[0-9A-Za-z]/) || []).length >= 1
  security.value.username.needNormal = (form.value.username.match(/^[\d\w.@-]+$/) || []).length >= 1
}
const validUsername =  (callback) => {
  if (!security.value.username.needLength || !security.value.username.needStartWith || !security.value.username.needNormal) {
    console.log(security.value.username, security.value.username.needStartWith, security.value.username.needNormal)
    callback(new Error())
    return
  }
  callback()
}

const changePassword = () => {
  security.value.password.needLength = form.value.password.length >= securityRule.password.needLength
  security.value.password.needUpper = (form.value.password.match(/(?=.*[A-Z])/) || []).length >= securityRule.password.needUpper
  security.value.password.needLower = (form.value.password.match(/(?=.*[a-z])/) || []).length >= securityRule.password.needLower
  security.value.password.needNum = (form.value.password.match(/(?=.*\d)/) || []).length >= securityRule.password.needNum
  security.value.password.needSpec = (form.value.password.match(/([^\w\s])/) || []).length >= securityRule.password.needSpec
}

const validPassword =  (callback) => {
  if (!security.value.password.needLength || !security.value.password.needUpper || !security.value.password.needLower || !security.value.password.needNum || !security.value.password.needSpec) {
    callback(new Error())
    return
  }
  callback()
}
// tip: 初始化空数据
store.dispatch('person/resetFilter')
getDb()
findPerson()
</script>

<style scoped>
  .icon {
    margin-right: 10px;
    width: 10px;
  }
  .c-green { color: #00f000; }
  .c-red { color: #f00000; }
</style>

<i18n>
en:
  addPerson: Add Person
  usernameNeedLength: Username must be at least 6 characters long.
  usernameNeedStartWith: Username must start with a character or number.
  usernameNeedNormal: Username can only contain (A–Z), (a-z), (0–9), ("."), ("at"), ("-"), ("_").
  passwordNeedLength: Password must be at least 6 characters long.
  passwordNeedUpper: Password must have at least one uppercase (A-Z).
  passwordNeedLower: Password must have at least one lowercase (a-z).
  passwordNeedNum: Password must have at least one number (0-9).
  passwordNeedSpec: Password must have at least one special character(!"at"#%^&*()....).
zh:
  addPerson: 添加用户
  usernameNeedLength: 用户名至少6位数
  usernameNeedStartWith: 用户名必须为字母或数字开头
  usernameNeedNormal: 用户名只能包含 (A–Z), (a-z), (0–9), ("."), ("at"), ("-"), ("_").
  passwordNeedLength: 密码至少6位数.
  passwordNeedUpper: 密码必须包含至少一个大写 (A-Z).
  passwordNeedLower: 密码必须包含至少一个小写 (a-z).
  passwordNeedNum: 密码必须包含至少一个数字 (0-9).
  passwordNeedSpec: 密码必须包含至少一个特殊字符 (!"at"#%^&*()....).
</i18n>
