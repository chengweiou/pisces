<template>
  <div v-if="!loading" class="df" style="margin: 0 20px 20px;">
    <el-button class="bg-blue c-white" style="width: 160px; height: 40px;" @click="$emit('save')">保存</el-button>
  </div>
  <div v-if="loading" class="df" style="margin: 0 20px 20px;">
    <div v-loading="loading" style="width: 160px; height: 40px;"></div>
  </div>
</template>

<script setup>
// tip: 导入 component
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
defineProps({
  loading: { type: Boolean, default: false },
})
defineEmits(['save'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据

</script>

<style scoped>
</style>
