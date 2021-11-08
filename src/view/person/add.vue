<template>
  <proj-header :has-back="true" @back="go('personList')">添加用户</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
    <el-card style="margin: 0 20px 20px;">
      <div class="df df-wrap">
        <el-form-item style="flex: 1;" label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button v-for="e in typeList" :key="e.k" :label="e.k">{{e.v}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="df df-wrap">
        <el-form-item style="margin-right: 100px; flex: 1;" label="名称" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item style="margin-right: 100px; flex: 1;" label="电话" prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
      </div>
    </el-card>
    <el-card style="margin: 0 20px 20px;">
      <div class="sdf df-wrap">
        <el-form-item style="flex: 1;" label="用户名" prop="username">
          <el-input v-model="form.username"/>
        </el-form-item>
        <el-form-item style="flex: 1;" label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password/>
        </el-form-item>
        <el-form-item style="flex: 1;" label="确认密码" prop="rePassword">
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
import { wait, empty, clone, valid } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const typeMap = store.state.personTrans.typeMap
const typeList = store.state.personTrans.typeList
const rules = {
  type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: (rule, value, callback) => valid.checkUsername('account', value, callback), trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
    ElNotification({ type: 'success', title: '成功' })
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
