<template>
  <proj-header><icon-pie-chart style="margin-right: 10px; width: 24px;"/>{{total}} {{t('pet')}}</proj-header>
  <list-search-bar>
    <el-input v-model="filter.k" style="width: 300px;" :placeholder="t('search')" @keyup.enter="changeFilter"></el-input>
    <el-select v-model="sort" :placeholder="t('sort')" @change="changeFilter">
      <el-option v-for="e in sortList" :key="e.value" :label="e.label" :value="e.value"></el-option>
    </el-select>
  </list-search-bar>
  <el-container v-loading="loading" class="df-column c-black" style="margin: 0 20px;">
    <list-th-row>
      <list-th>id</list-th>
      <list-th>{{t('type')}}</list-th>
      <list-th>{{t('name')}}</list-th>
      <list-th-delete></list-th-delete>
    </list-th-row>
    <list-td-row v-for="(e, i) in list" :key="i" @click="goDetail(e)">
      <list-td>{{e.id}}</list-td>
      <list-td>{{e.type}}</list-td>
      <list-td>{{e.name}}</list-td>
      <list-td-delete @click="remove(e)"></list-td-delete>
    </list-td-row>
    <div class="df df-jcfe df-aic" style="margin-bottom: 20px;">
      <el-pagination layout="prev, pager, next" :current-page="page.curr" :page-size="filter.limit" :total="total" @current-change="changePage"></el-pagination>
    </div>
  </el-container>
</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import { PieChart as IconPieChart } from '@element-plus/icons'
import { ListThRow, ListTdRow, ListTh, ListTd, ListTdDelete, ListThDelete } from '@/component/proj/list'
import ListSearchBar from '@/component/proj/listSearchBar.vue'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, empty, clone } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t } = useI18n()
// tip: 定义 页面
// tip: 定义 不需要关联的
const sortList = [
  { label: t('sortUpdateAtAz'), value: 'updateAt,false' },
  { label: t('sortUpdateAtZa'), value: 'updateAt,true' },
]
// tip: 定义 需要关联的
const sort = ref('')
const loading = ref(false)
// tip: 定义 computed 计算的
const total = computed(() => store.state.pet.total)
const page = computed(() => store.state.pet.page)
const filter = computed(() => store.state.pet.filter)
const list = computed(() => store.state.pet.list)
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const changeFilter = () => {
  if (sort.value) {
    filter.value.sort = sort.value.split(',')[0]
    filter.value.sortAz = sort.value.split(',')[1]
  }
  store.dispatch('pet/changeFilter')
  find()
  count()
}
const changePage = (v) => {
  store.dispatch('pet/changePage', { curr: v })
  find()
}
const count = () => {
  store.dispatch('pet/count')
}
const find = async() => {
  loading.value = true
  await Promise.all([store.dispatch('pet/find'), wait(1000)])
  loading.value = false
}
const goDetail = (e) => {
  router.push({ name: 'pet', params: { id: e.id } })
}
const remove = async(e) => {
  await store.dispatch('pet/remove', {id: e.id})
  count()
  find()
}
// tip: 初始化空数据
store.dispatch('pet/resetFilter')
count()
find()
</script>

<style scoped>
</style>
