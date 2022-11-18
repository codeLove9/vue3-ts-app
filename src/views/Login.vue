<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue"
import type { FormInstance } from "element-plus"
import { getTokenApi } from "@/api/api"
import Cookie from "js-cookie"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

// 获取dom
const ruleFormRef = ref<FormInstance>()
const state = reactive({
  ruleForm: {
    username: "admin",
    password: "123456"
  }
})

let { ruleForm } = toRefs(state)
// 自定义检验规则
const validatePass = (rule: any, value: any, callback: (msg?: Error) => void) => {
  if (!value) {
    callback(new Error("请输入密码"))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "输入的长度应该是3-6位", trigger: "change" }
  ],
  password: [
    { required: true, validator: validatePass, trigger: "blur" },
    { min: 6, max: 18, message: "输入的长度应该是6-18位", trigger: "change" }
  ]
})

const router = useRouter()
const store = useStore()
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      const res = await getTokenApi({
        username: ruleForm.value.username,
        password: ruleForm.value.password
      })
      if (res.code == 200) {
        const tokenHead = res.data.tokenHead
        const token = res.data.token
        Cookie.set("token", tokenHead + token, { expires: 30 })
        const res1 = await store.dispatch("getUserInfo")
        if (res1.code == 200) {
          router.push("/home")
          ElMessage({ message: "登录成功", type: "success" })
        }
      }
    } else {
      ElMessage({ message: "登录失败！请检查用户名或密码是否正确", type: "error" })
      return false
    }
  })
}
</script>

<style lang="less" scoped></style>
