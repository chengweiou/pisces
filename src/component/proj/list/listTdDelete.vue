<template>
<el-popconfirm title="确认删除" @confirm="emit('click')">
  <template #reference>
    <list-td class="center" style="flex: 0 0 50px;"><icon-delete style="width: 12px;"/></list-td>
  </template>
</el-popconfirm>
</template>

<script setup>
// tip: 导入 component
import { ListTd } from '.'
import { Delete as IconDelete } from '@element-plus/icons'
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
defineEmits(['click'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>

<style>

</style>
