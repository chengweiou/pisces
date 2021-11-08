<template>
  <proj-header :has-back="true" @back="go('petList')">添加宠物</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <el-card style="margin: 0 20px 20px;">
    <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
      <div class="df df-wrap">
        <el-form-item style="flex: 1;" label="主人" prop="personId">
          <el-select v-model="form.personId" placeholder="请选择" style="width: 100%;">
            <el-option v-for="e in personList" :key="e.id" :label="`${e.name}`" :value="e.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
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
        <el-form-item style="margin-right: 100px; flex: 1;" label="年龄" prop="age">
          <el-input v-model="form.phone"/>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
  <div class="df" style="margin: 0 20px 20px;">
    <el-button v-loading="loading" class="bg-blue c-white" style="width: 160px; height: 40px;" @click="save">保存</el-button>
  </div>
</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
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
const typeMap = store.state.petTrans.typeMap
const typeList = store.state.petTrans.typeList
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  personId: [{ required: true, message: '请选择主人', trigger: 'blur' }],
}
const cleanForm = {
  ...emptyFn.pet(),
  ...store.state.petDb.save,
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
// tip: 定义 computed 计算的
const personList = computed(() => store.state.person.list)
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
    let person = {...personList.value.find(e => e.id == form.value.personId)}
    form.value.person = { id: person.id, name: person.name }
    let pList = await Promise.all([store.dispatch('pet/save', form.value), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    ElNotification({ type: 'success', title: '成功' })
    go('petList')
  })
}
// tip: 初始化空数据
store.dispatch('person/resetFilter')
getDb()
findPerson()
</script>

<style scoped>
</style>
