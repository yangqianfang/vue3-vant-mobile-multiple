<template>
  <div class="container">
    <h2><center>登陆</center></h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  const username = ref('');
  const password = ref('');
  const onSubmit = (values) => {
    console.log('submit', values);
  };
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
