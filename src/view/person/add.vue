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
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item style="flex: 1;" :label="t('password')" prop="password">
          <el-input v-model="form.password" type="password" show-password/>
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
  username: simpleRule.username,
  password: simpleRule.password,
  name: simpleRule.name,
  rePassword: [{ validator: (rule, value, callback) => valid.checkRepassword(form.value.password, value, callback), trigger: 'blur' }],
}
const cleanForm = {
  ...empty.person(),
  ...store.state.personDb.save,
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
// tip: 定义 computed 计算的
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
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
// tip: 初始化空数据
store.dispatch('person/resetFilter')
getDb()
findPerson()
</script>

<style scoped>
</style>

<i18n>
en:
  addPerson: Add Person
zh:
  addPerson: 添加用户
</i18n>
