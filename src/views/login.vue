<template>
  <el-form>
    <el-form-item label="账号">
      <el-input v-model="user.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleLogin">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { login } from '@/api/user'
import { ref } from 'vue'
import { useStore } from '@/utils/usePinia'
import { ElMessage } from 'element-plus'
import { setCookies } from '@/utils/useTool.js'

const user = ref({ phone: '', password: '' })
const handleLogin = () => {
  login(user.value).then(res => {
    if (res.code === 200) {
      useStore().setUserInfo(res.profile)
      setCookies(res.cookie)
      ElMessage.success('登陆成功')
    } else {
      ElMessage.error(res.msg)
    }
  })
}
</script>