<template>
  <editor v-model="v" :init="{ plugins: ['image'], images_upload_handler: readPic }" @update:model-value="(value) => emit('update:modelValue', value)"/>
  <!-- <el-input v-model="v" @update:model-value="(value) => emit('update:modelValue', value)" type="textarea" /> -->
</template>

<script setup>
// tip: 导入 component
import Editor from '@tinymce/tinymce-vue'
// tip: 导入 data
import { ref, computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { wait, emptyFn, clone, site } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
// tip: 定义 页面
const props = defineProps({
  modelValue: { type: String, default: '' },
})
const v = ref(`${props.modelValue}`)
const emit = defineEmits(['update:modelValue'])
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
const readPic = async(blobInfo, success, failure, progress) => {
  let type = blobInfo.filename().substring(blobInfo.filename().lastIndexOf('.')+1, blobInfo.filename().length)
  let imgsrc = await store.dispatch('upload/save', {img: `data:image/${type};base64,${blobInfo.base64()}`})
  if (!imgsrc) {
    failure('上传失败')
    return
  }
  success(`${site.mothallah}${imgsrc}`)
}
// tip: 初始化空数据
</script>

<style scoped>
</style>
