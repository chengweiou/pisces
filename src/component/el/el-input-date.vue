<template>
  <el-date-picker :model-value="modelValue" :type="type" :placeholder="placeholder" :range-separator="rangeSeparator" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" @update:model-value="change" @change="change" />
</template>

<script setup>
// tip: 导入 component
// import Editor from '@tinymce/tinymce-vue'
// tip: 导入 data
import { ref, computed, toRefs } from 'vue'
import { date } from '@/fn'
// tip: 定义 各种 use
// tip: 定义 页面
const props = defineProps({
  modelValue: { type: [String, Date, Array], default: '' },
  type: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rangeSeparator: { type: String, default: '' },
  startPlaceholder: { type: String, default: '' },
  endPlaceholder: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
const change = (v) => {
  if (!v) {
    emit('update:modelValue', v)
  } else if (props.type=='date') {
    emit('update:modelValue', date(v, { to: 'yyyy-MM-dd'}))
  } else if (props.type=='daterange') {
    let v0 = v[0] ? date(v[0], { to: 'yyyy-MM-dd'}) : ''
    let v1 = v[1] ? date(v[1], { to: 'yyyy-MM-dd'}) : ''
    emit('update:modelValue', [v0, v1])
  } else if (props.type=='datetime') {
    emit('update:modelValue', new Date(v).toISOString())
  } else if (props.type=='datetimerange') {
    let v0 = v[0] ? v[0].toISOString() : ''
    let v1 = v[1] ? v[1].toISOString() : ''
    emit('update:modelValue', [v0, v1])
  } else {
    emit('update:modelValue', v)
  }

}
// tip: 初始化空数据
</script>

<style scoped>
</style>
