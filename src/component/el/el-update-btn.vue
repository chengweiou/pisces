<template>
  <div v-if="!loading" class="df" style="margin-bottom: 20px;">
    <el-button v-if="!showUpdate" class="bg-blue c-white" style="width: 160px; height: 40px;" @click="$emit('onUpdate')">{{t('update')}}</el-button>
    <el-button v-if="showUpdate" class="bg-blue c-white" style="width: 160px; height: 40px;" @click="$emit('offUpdate')">{{t('cancel')}}</el-button>
    <el-button v-if="showUpdate" class="bg-blue c-white" style="width: 160px; height: 40px;" @click="$emit('update')">{{t('save')}}</el-button>
  </div>
  <div v-if="loading" class="df" style="margin-bottom: 20px;">
    <div v-loading="loading" style="width: 160px; height: 40px;"></div>
  </div>
</template>

<script setup>
// tip: 导入 component
// tip: 导入 data
import { useI18n } from 'vue-i18n'
// tip: 定义 各种 use
const { t } = useI18n()
// tip: 定义 页面
defineProps({
  loading: { type: Boolean, default: false },
  showUpdate: { type: Boolean, default: false },
})
defineEmits(['onUpdate', 'offUpdate', 'update'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据

</script>

<style scoped>
</style>
