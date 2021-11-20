<template>
  <proj-header :has-back="true" @back="go('petList')">{{t('addPet')}}</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <el-card style="margin: 0 20px 20px;">
    <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
      <div class="df df-wrap">
        <el-form-item style="flex: 1;" :label="t('personId')" prop="personId">
          <el-select v-model="form.personId" :placeholder="t('choose')" style="width: 100%;">
            <el-option v-for="e in personList" :key="e.id" :label="`${e.name}`" :value="e.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
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
        <el-form-item style="margin-right: 100px; flex: 1;" :label="t('age')" prop="age">
          <el-input v-model="form.phone"/>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
  <div class="df" style="margin: 0 20px 20px;">
    <el-button v-loading="loading" class="bg-blue c-white" style="width: 160px; height: 40px;" @click="save">{{t('save')}}</el-button>
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
import { useI18n } from 'vue-i18n'
import { wait, empty, clone, valid, simpleRule } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t } = useI18n()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const typeMap = store.state.petTrans.typeMap
const typeList = store.state.petTrans.typeList
const rules = {
  name: simpleRule.name,
  personId: [simpleRule.need(t('needPersonId'))],
}
const cleanForm = {
  ...empty.pet(),
  ...store.state.petDb.save,
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
// tip: 定义 computed 计算的
const personList = computed(() => store.state.person.list)
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
    let person = {...personList.value.find(e => e.id == form.value.personId)}
    form.value.person = { id: person.id, name: person.name }
    let pList = await Promise.all([store.dispatch('pet/save', form.value), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    ElNotification({ type: 'success', title: t('success') })
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

<i18n>
en:
  addPet: Add Pet
  personId: Master
  needPersonId: Please select master
zh:
  addPet: 添加宠物
  personId: 主人
  needPersonId: 请选择主人
</i18n>
