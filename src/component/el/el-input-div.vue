<template>
  <div class="el-input-div">
    <slot></slot>
  </div>
</template>

<style scoped>
.el-input-div {
  margin-left: 15px;
  margin-bottom: 1px;
  min-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
