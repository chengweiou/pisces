<template>
  <div style="margin: 0 20px 20px;">
    <div class="center">{{t('loadingFail')}}</div>
  </div>
</template>
<script setup>
// tip: 导入 component
import { useI18n } from 'vue-i18n'
// tip: 定义 各种 use
const { t } = useI18n()
// tip: 定义 各种 use
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>
<style scoped>

</style>
<style>

</style>

<i18n>
en:
  loadingFail: Loading Fail
zh:
  loadingFail: 加载失败
</i18n>
