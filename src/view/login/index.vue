<template>
  <div class="center bg-dark c-white" style="width: 100%; height: 100%;">
    <el-form ref="formEl" :model="form" :rules="rules" style="width: 400px; height: 500px;" size="medium">
      <div style="font-size: 42px;">pisces管理系统</div>
      <div style="margin-bottom: 10px;">后台管理系统模板</div>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 30px;" prop="password">
        <el-input v-model="form.password" type="password" placeholder="密码" :show-password="true" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-button v-loading="loading" class="bg-blue c-white" style="width: 100%; height: 50px;" @click="login">登录</el-button>
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
import { wait, emptyFn, clone } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const cleanForm = {
  ...emptyFn.account(),
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
    ElNotification({ type: 'success', title: '成功' })
    router.push({ name: 'dashboard' })
  })
}
// tip: 初始化空数据
</script>
<style scoped>
</style>

<style>

</style>
