<template>
  <div class="row pointer" style="">
    <div class="df">
      <slot/>
    </div>
  </div>
</template>

<script setup>
// tip: 导入 component
// tip: 导入 data
// tip: 定义 各种 use
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
</script>

<style scoped>
.row {
  margin-bottom: 5px;
  padding: 0 20px;
  border-radius: 4px;
  background: #070B34;
  color: #fff;
}
.row:hover {
  background: #141852;
}
</style>
