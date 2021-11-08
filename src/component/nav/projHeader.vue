<template>
  <el-header style="border-bottom: solid 1px #6B4984; ">
    <div class="df df-aic" style="height: 100%; font-size: 24px; font-weight: 700;">
      <div v-if="hasBack" class="center pointer" style="height: 100%;" @click="$emit('back')"><icon-arrow-left style="margin-right: 10px; width: 24px;"/></div>
      <slot/>

    </div>
  </el-header>
</template>

<script setup>
// tip: 导入 component
import { ArrowLeft as IconArrowLeft } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t, locale } = useI18n({ inheritLocale: true })
// tip: 定义 页面
defineProps({
  title: {type: String, default: ''},
  hasBack: { type: Boolean, default: false },
})
defineEmits(['back'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
const me = computed(() =>store.state.me.user)
// tip: 定义 方法
const handleCommand = (v) => {
  if (v == 'logout') {
    logout()
    return
  }
  go(v)
}
const go = (v) => {
  if (route.name == v) return
  store.dispatch('tab/changeAsider', v)
  router.push({ name: v })
}
const logout = async() => {
  // 处理在房间内登出的情况
  if (route.name == 'room') await store.dispatch('room/leave', {id: store.state.room.detail.id})
  await store.dispatch('me/logout')
  store.dispatch('ws/disconnect')
}
// tip: 初始化空数据
</script>

<style scoped>
</style>

<style>
</style>

<i18n>
en:
  login: login
zh:
  login: 登录
</i18n>
