<template>
<van-config-provider :theme="theme">
     
    <div class="container"> 
      <h1><center>Vant index</center></h1>
    
    <van-cell-group title="Do more difficult things" inset>
      <van-cell center title="🌗 暗黑模式">
        <template #right-icon>
          <van-switch v-model="checked" size="18px" />
        </template>
      </van-cell>

      <van-cell title="💿 mock 指南" url="/mock.html" is-link />
      
    <van-cell title="💿去登录" url="/login.html" is-link />
    </van-cell-group>
    <div class="logo"></div>
  </div>
  </van-config-provider>
  
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'
import type { ConfigProviderTheme } from 'vant'
// const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref<boolean>(themeStore === 'dark' ? true: false)
const theme = ref<ConfigProviderTheme>('light')
watch(checked,(val) => {
    console.log(val)
  if(val) {
    theme.value = 'dark'
    localStorage.set('theme', 'dark')
  } else {
    theme.value = 'light'
    localStorage.set('theme', 'light')
  }
})
</script>

<style lang="less" scoped>
@import './index.less';
</style>
