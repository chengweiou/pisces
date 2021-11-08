<template>
  <label for="profile-switch" class="center profile-switch" style="height: 60px; font-size: 18px; font-weight: 400;">Pisces</label>
  <input id="profile-switch" type="checkbox"/>
  <div class="center df-column" style="">
    <div style="width: 50px; height: 50px;"><avatar src="a.png"/></div>
    <div class="center link pointer" style="width: 100%; height: 30px;" @click="go('profile')">个人资料</div>
    <div class="center link pointer" style="width: 100%; height: 30px;" @click="logout">登出</div>
  </div>
  <el-menu :default-active="active" :collapse="isCollapse" class="el-menu-vertical-demo" style="border: 0;">
    <el-menu-item index="dashboard" @click="goAsider('dashboard')"><icon-document-checked style="margin: 3px; width: 12px;"/>{{t('dashboard')}}</el-menu-item>
    <el-sub-menu index="personGroup">
      <template #title>
        <icon-location style="margin: 3px; width: 12px;"/>
        <span>{{t('person')}}{{t('managment')}}</span>
      </template>
      <el-menu-item index="personlist" @click="goAsider('personList')">{{t('all')}}{{t('person')}}</el-menu-item>
      <el-menu-item index="addperson" @click="goAsider('personAdd')">{{t('add')}}{{t('person')}}</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="petGroup">
      <template #title>
        <icon-location style="margin: 3px; width: 12px;"/>
        <span>{{t('pet')}}{{t('managment')}}</span>
      </template>
      <el-menu-item index="petlist" @click="goAsider('petList')">{{t('pet')}}{{t('managment')}}</el-menu-item>
      <el-menu-item index="addpet" @click="goAsider('petAdd')">{{t('add')}}{{t('pet')}}</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="i18nGroup">
      <template #title>
        <icon-location style="margin: 3px; width: 12px;"/>
        <span>语言</span>
      </template>
      <el-menu-item index="i18nZh" @click="changeLanguage('zh')">中文</el-menu-item>
      <el-menu-item index="i18nEn" @click="changeLanguage('en')">English</el-menu-item>
    </el-sub-menu>
    <!-- <el-menu-item index="restapi" @click="goAsider('restapi')"><icon-document-checked style="margin: 3px; width: 12px;"/>restapi</el-menu-item> -->
  </el-menu>
</template>

<script setup>
// tip: 导入 component
import Avatar from '@/component/image/avatar.vue'
import { DocumentChecked as IconDocumentChecked, Location as IconLocation } from '@element-plus/icons'
// tip: 导入 data
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { wait, emptyFn, clone, storage } from '@/fn'

// tip: 定义 各种 use
const store = useStore(), router = useRouter(), route = useRoute()
const { t, locale } = useI18n({ inheritLocale: true })
// tip: 定义 页面
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
const isCollapse = ref(false)
// tip: 定义 computed 计算的
const me = computed(() =>store.state.me.user)
const active = computed(() =>store.state.tab.asider)
// tip: 定义 方法
const go = (v) => {
  if (route.name == v) return
  router.push({ name: v })
}
const goAsider = (v) => {
  if (route.name == v) return
  store.dispatch('tab/changeAsider', v)
  go(v)
}
const onLogin = () => {
  store.dispatch('me/onLogin')
}
const logout = async() => {
  // 处理在房间内登出的情况
  if (route.name == 'room') await store.dispatch('room/leave', {id: store.state.room.detail.id})
  await store.dispatch('me/logout')
  store.dispatch('ws/disconnect')
}
const changeLanguage = (v) => {
  locale.value = v
  storage.set('lang', locale.value)
}

// tip: 初始化空数据
// tip 其他生命周期
onMounted(() => {
  window.onresize = () => {
    let w = document.body.clientWidth
    isCollapse.value = w < 800
  }

})
</script>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
}
.profile-switch + input[type=checkbox] {
  display: none;
}
.profile-switch:hover {
  color: #4A90E2;
}
input[type=checkbox]+div {
  transition: max-height ease-in-out .5s;
  overflow: hidden;
  max-height: 0;
}
input[type=checkbox]:checked+div {
  max-height: 200px;
}
</style>

<style>
</style>

<i18n>
en:
  login: login
  dashboard: Dashboard
  managment: Manament
  all: 所有
  add: 添加
  person: User
  pet: Pet
zh:
  login: 登录
  dashboard: 面板
  managment: 管理
  all: 所有
  add: 添加
  person: 用户
  pet: 宠物
</i18n>
