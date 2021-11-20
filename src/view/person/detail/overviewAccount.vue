<template>
  <el-card style="margin: 0 20px 20px;">
    <el-form ref="formEl" style="flex: 1;" :model="form" :rules="rules" label-width="120px" label-position="left" @submit.prevent>
      <div class="df df-wrap">
          <el-form-item style="flex: 1;" :label="t('username')" prop="username">
            <el-input v-show="showUpdate" v-model="form.username"/>
            <el-input-div v-show="!showUpdate">{{detail.username}}</el-input-div>
          </el-form-item>
        </div>
        <div class="df df-wrap">
          <el-form-item style="flex: 1;">
            <el-switch v-show="showUpdate" v-model="showPassword" :active-text="t('updatePassword')" />
            <el-input-div v-show="!showUpdate"></el-input-div>
          </el-form-item>
        </div>
        <div v-if="showPassword" class="df df-wrap">
          <el-form-item style="margin-right: 100px; flex: 1;" :label="t('password')" prop="password">
            <el-input v-show="showUpdate" v-model="form.password" type="password" show-password/>
          </el-form-item>
          <el-form-item style="flex: 1;" :label="t('rePassword')" prop="rePassword">
            <el-input v-show="showUpdate" v-model="form.rePassword" type="password" show-password/>
          </el-form-item>
        </div>
    </el-form>
    <el-update-btn :loading="loading" :show-update="showUpdate" @on-update="onUpdate" @off-update="offUpdate" @update="update" />
  </el-card>
</template>

<script setup>
// tip: 导入 component
import ElUpdateBtn from '@/component/el/el-update-btn.vue'
import { ElNotification } from 'element-plus'
// tip: 导入 data
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, empty, clone, valid, simpleRule } from '@/fn'
// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute(), { t } = useI18n()
// tip: 定义 页面
const formEl = ref(null)
// tip: 定义 不需要关联的
const rules = {
  username: [simpleRule.needUsername,
    // 特殊，未修改用户名，额外判断
    { validator: (rule, value, callback) => valid.checkUsername('account', value, callback, form.value.username == detail.value.username), trigger: 'blur' },
  ],
  password: simpleRule.password,
  rePassword: [{ validator: (rule, value, callback) => valid.checkRepassword(form.value.password, value, callback), trigger: 'blur' }],
}
const cleanForm = {
  ...empty.account(), person: { id: route.params.id },
}
// tip: 定义 需要关联的
const form = ref(clone(cleanForm))
const loading = ref(false)
const showUpdate = ref(false)
const showPassword = ref(false)
// tip: 定义 computed 计算的
const detail = computed(() => store.state.account.detail)
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const findByPerson = () => {
  store.dispatch('account/findByPerson', { person: {id: route.params.id} })
}
const onUpdate = () => {
  showUpdate.value = true
  form.value = clone(detail.value)
}
const offUpdate = () => {
  showUpdate.value = false
  form.value = clone(cleanForm)
}
const update = () => {
  formEl.value.validate(async(valid) => {
    if (!valid) return false
    loading.value = true
    form.value.hasUsername = form.value.username != detail.value.username
    form.value.hasPassword = showPassword.value
    let pList = await Promise.all([store.dispatch('account/updateByPerson', form.value), wait(1000)])
    loading.value = false
    if (!pList[0]) return
    showUpdate.value = false
    showPassword.value = false
    ElNotification({ type: 'success', title: t('success') })
  })
}
// tip: 初始化空数据
store.state.account.detail = empty.account()
findByPerson()

</script>

<style scoped>
</style>

<i18n>
en:
  updatePassword: Update Password
zh:
  updatePassword: 修改密码
</i18n>
