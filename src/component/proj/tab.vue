<template>
<div class="df">
  <div class="df" style="margin: 0 20px 10px; padding: 3px; background: #2B2F77; border-radius: 3px;">
    <label v-for="(e, i) in list" :key="e" class="center pointer tabPiece">
      <input v-model="radio" :value="i" type="radio" @change="changeTab(`${i}`)">
      <div class="center">{{ e }}</div>
    </label>
  </div>
</div>
</template>

<script setup>
// tip: 导入 component
// tip: 导入 data
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const props = defineProps({
  tab: { type: String, required: true },
  name: { type: String, required: true },
  list: { type: Array, required: true },
})
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
const radio = ref(`${props.tab}`)
// tip: 定义 computed 计算的
// tip: 定义 方法
const changeTab = (i) => {
  store.dispatch('tab/change', { k: props.name, v: i })
}
// tip: 初始化空数据
</script>

<style scoped>
.tabPiece {
  margin-right: 5px;
}
.tabPiece > input[type=radio] {
  display: none;
}
.tabPiece:hover {
  color: #4A90E2;
}
.tabPiece:last-child {
  margin-right: 0px;
}
input[type=radio]+div {
  min-width: 120px;
  height: 30px;
  border-radius: 4px;
  /* height: 100%; */
  /* border-bottom: 1px solid transparent; */
}
input[type=radio]:checked+div {
  background: #070B34;
  /* border-bottom: 1px solid #4A90E2; */
}
</style>
