<template>
  <div class="center bg-dark c-white" style="width: 100%; height: 100%;">
    <el-form ref="formEl" :model="form" :rules="rules" style="width: 400px; height: 500px;" size="default">
      <div style="font-size: 42px;">pisces{{t('system')}}</div>
      <div style="margin-bottom: 10px;">{{t('systemTemplate')}}</div>
      <el-form-item prop="username">
        <el-input v-model="form.username" :placeholder="t('username')"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 30px;" prop="password">
        <el-input v-model="form.password" type="password" :placeholder="t('password')" :show-password="true" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-button v-loading="loading" class="bg-blue c-white" style="width: 100%; height: 50px;" @click="login">{{t('login')}}</el-button>
    </el-form>
  </div>

</template>

<script setup>
// tip: 导入 component
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, empty, clone, simpleRule } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t } = useI18n()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const rules = {
  username: [simpleRule.needUsername],
  password: [simpleRule.needPassword],
}
const cleanForm = {
  ...empty.account(),
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
// tip: 定义 computed 计算的

// tip: 定义 方法
const login = async() => {
  formEl.value.validate(async(checkValid) => {
    if (!checkValid) return false
    loading.value = true
    let pList = await Promise.all([store.dispatch('me/login', {...form.value})])
    loading.value = false
    if (!pList[0]) return
    ElNotification({ type: 'success', title: t('success') })
    router.push({ name: 'dashboard' })
  })
}
// tip: 初始化空数据
</script>
<style scoped>
</style>

<style>

</style>

<i18n>
en:
  login: Login
  system: Admin System
  systemTemplate: Admin System Template
zh:
  login: 登录
  system: 管理系统
  systemTemplate: 后台管理系统模板
</i18n>
