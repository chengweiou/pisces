<template>
  <el-card style="margin: 0 20px 20px;">
    <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
      <div class="df df-wrap">
        <el-form-item style="flex: 1;" label="类型" prop="type">
          <el-radio-group v-show="showUpdate" v-model="form.type">
            <el-radio-button v-for="e in typeList" :key="e.k" :label="e.k">{{e.v}}</el-radio-button>
          </el-radio-group>
          <el-input-div v-show="!showUpdate">{{typeMap[detail.type]}}</el-input-div>
        </el-form-item>
      </div>
      <div class="df df-wrap">
        <el-form-item style="margin-right: 100px; flex: 1;" label="名称" prop="name">
          <el-input v-show="showUpdate" v-model="form.name"/>
          <el-input-div v-show="!showUpdate">{{detail.name}}</el-input-div>
        </el-form-item>
        <el-form-item style="margin-right: 100px; flex: 1;" label="电话" prop="phone">
          <el-input v-show="showUpdate" v-model="form.phone"/>
          <el-input-div v-show="!showUpdate">{{detail.phone}}</el-input-div>
        </el-form-item>
      </div>
    </el-form>
    <el-update-btn :loading="loading" :show-update="showUpdate" @on-update="onUpdate" @off-update="offUpdate" @update="update" />
  </el-card>

</template>

<script setup>
// tip: 导入 component
import { ElNotification } from 'element-plus'
import ElUpdateBtn from '@/component/el/el-update-btn.vue'
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
const typeMap = store.state.personTrans.typeMap
const typeList = store.state.personTrans.typeList
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  personId: [{ required: true, message: '请选择会员', trigger: 'blur' }],
  startEndDate: [{ required: true, message: '请选择时间', trigger: 'blur' }],
}
const cleanForm = {
  ...emptyFn.person(),
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
const showUpdate = ref(false)
// tip: 定义 computed 计算的
const detail = computed(() => store.state.person.detail)
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const readPic = (event) => {
  if (!event.target.files) {
    form.value.img = ''
    return
  }
  if (!event.target.files.length) return
  let reader = new FileReader()
  reader.readAsDataURL(event.target.files[0])
  reader.onload = () => {
    form.value.img = reader.result
  }
}
const onUpdate = () => {
  showUpdate.value = true
  form.value = clone(detail.value)
}
const offUpdate = () => {
  showUpdate.value = false
  form.value = clone(cleanForm)
}
const update = () => {
  formEl.value.validate(async(valid) => {
    if (!valid) return false
    loading.value = true
    let pList = await Promise.all([store.dispatch('person/update', form.value), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    showUpdate.value = false
    ElNotification({ type: 'success', title: '成功' })
  })
}
// tip: 初始化空数据

</script>

<style scoped>
</style>
