<template>
  <el-container style="min-height: 100%;">
    <el-aside class="bg-theme6" style="width: auto; "><projAsider /></el-aside>
    <el-container>
      <router-view/>
      <el-footer>
        <projFooter/>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup>
// tip: 导入 component
import projFooter from '@/component/nav/projFooter.vue'
import projAsider from '@/component/nav/projAsider.vue'
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>
