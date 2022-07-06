<template>
<van-config-provider :theme="theme">
     
    <div class="container"> 
    <div class="logo"></div>
    <van-cell-group title="Do more difficult things" inset>
      <van-cell center title="🌗 暗黑模式">
        <template #right-icon>
          <van-switch v-model="checked" size="18px" />
        </template>
      </van-cell>

      <van-cell title="💿 mock 指南" to="mock" is-link />
      
    <van-cell title="💿   跳转" url="/mock/index.html" is-link />
    </van-cell-group>
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
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  position: relative;

  .logo {
    width: 150px;
    height: 150px;
    background-image: url('@/assets/logo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
