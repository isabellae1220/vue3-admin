<template>
  <div class="body-login">
  <el-form :model="loginForm" class="login-container">
    <h1>欢迎登陆</h1>
     <el-form-item >
      <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
     </el-form-item>
     <el-form-item>
      <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
     </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="handleLogin">登陆</el-button>
     </el-form-item>

  </el-form>
  </div>
</template>

<script lang="ts" setup name="">
import{reactive}from 'vue'
import api from '@/api/api'
import { useAllDateStore } from '@/store';
import { useRouter } from 'vue-router';
const loginForm=reactive({
  username:'',
  password:''
})

const store=useAllDateStore()
const router =useRouter()
const handleLogin = async () => {
  const res = await api.getMenu(loginForm) as any
  store.setMenuList(res.menuList)  // 这里面会自动addRoute
  store.state.token = res.token
    // ↓ 持久化关键三行
  localStorage.setItem('token', res.token)
  localStorage.setItem('menuList', JSON.stringify(res.menuList))
  router.push('/home')
}

</script>

<style scoped>
.body-login {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/images/background.png');
  background-size: cover;        /* ← 改成cover,铺满不变形 */
  background-position: center;   /* ← 居中 */
  overflow: hidden;
  display: flex;                 /* ← 加flex,让表单居中 */
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 400px;
  background-color: #fff;
  border: 1px solid #eaeaea;     /* ← soild改成solid */
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);   /* ← 修正box-shadow */

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #505440;
  }

  :deep(.el-form-item__content) {   /* ← __content是双下划线 */
    justify-content: center;
  }
}
</style>