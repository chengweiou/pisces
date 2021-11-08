<template>
  <proj-header :has-back="true" @back="go('personList')">{{detail.name}}</proj-header>
  <div style="margin-bottom: 20px;"></div>
  <div>
    <tab v-model:tab="tab" name="person" :list="tabNameList"/>
    <component :is="
      loading ? LoadingCard
    : tab==0 ? Overview
    : tab==1 ? OverviewAccount
    : LoadingFail "/>
  </div>

</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import Tab from '@/component/proj/tab.vue'
import Overview from './overview.vue'
import OverviewAccount from './overviewAccount.vue'
import LoadingCard from '@/component/loadingIcon/loadingCard.vue'
import LoadingFail from '@/component/loadingIcon/loadingFail.vue'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, empty, clone } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
// tip: 定义 不需要关联的
const tabNameList = ['基本信息', '账号']
// tip: 定义 需要关联的
const loading = ref(true)
// tip: 定义 computed 计算的
const detail = computed(() => store.state.person.detail)
const tab = computed(() => store.state.tab.person)
// tip: 定义 方法
const go = (v) => {
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const findById = async() => {
  loading.value = true
  await store.dispatch('person/findById', { id: route.params.id })
  loading.value = false
}
// tip: 初始化空数据
store.state.person.detail = empty.person()
findById()
</script>

<style scoped>
</style>
