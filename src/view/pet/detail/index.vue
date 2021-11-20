<template>
  <proj-header :has-back="true" @back="go('petList')">{{detail.name}}</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <div v-if="!loading">
    <overview/>
  </div>

</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import Overview from './overview.vue'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, empty, clone } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
const loading = ref(true)
// tip: 定义 computed 计算的
const detail = computed(() => store.state.pet.detail)
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const findById = async() => {
  loading.value = true
  await store.dispatch('pet/findById', { id: route.params.id })
  loading.value = false
}
// tip: 初始化空数据
store.state.pet.detail = empty.pet()
findById()
</script>

<style scoped>
</style>
