<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="username" label="账号" />
    <el-table-column prop="nickName" label="姓名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column label="添加时间">
      <template #default="{ row }">
        {{ formatDate(new Date(row.createTime), "yyyy-MM-dd hh : mm") }}
      </template>
    </el-table-column>
    <el-table-column label="最后登录">
      <template #default="{ row }">
        {{ formatDate(new Date(row.loginTime), "yyyy-MM-dd hh : mm") }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="是否启用">
      <template #default="{ row }">
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="roleHandle(row.id)">分配角色</el-button>
        <el-button @click="edit(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <editAdmin :dialogFormVisible="dialogFormVisible" @close="closeDialogFormVisible" :form="rowData"></editAdmin>
  <distributeRole :dialogFormVisible="roleFormVisible" :form="roleData" @close="closeRoleFormVisible"></distributeRole>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue"
import { getUserTable, getAdminRoleByIdAPI, getRoleListAll } from "@/api/api"
import editAdmin from "./components/editAdmin.vue"
import distributeRole from "./components/distributeRole.vue"

const state = reactive<{
  tableData: {}[]
  dialogFormVisible: boolean
  rowData: AdminItf
  roleFormVisible: boolean
  roleData: AdminRoleFormData
}>({
  tableData: [],
  dialogFormVisible: false,
  rowData: {},
  roleFormVisible: false,
  roleData: {
    userRoles: [],
    roleLists: [],
    adminId: 0
  }
})
const { tableData, dialogFormVisible, rowData, roleFormVisible, roleData } = toRefs(state)

// 格式化时间
function formatDate(date: Date, fmt: string) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k as keyof typeof o] + ""
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str: string) {
  return ("00" + str).substr(str.length)
}

const getData = () => {
  getUserTable({
    keyword: "",
    pageNum: 1,
    pageSize: 10
  }).then(res => {
    if (res.code == 200) {
      tableData.value = res.data.list
    }
  })
}

getData()

// 点击编辑按钮
const edit = (row: {}) => {
  dialogFormVisible.value = true
  rowData.value = row
}

getRoleListAll().then(res => {
  if (res.code == 200) {
    roleData.value.roleLists = res.data
  }
})
// 点击分配角色按钮
const roleHandle = async (id: number) => {
  const res = await getAdminRoleByIdAPI(id)
  if (res.code == 200) {
    roleFormVisible.value = true
    roleData.value.adminId = id
    roleData.value.userRoles = res.data
  }
}
const closeRoleFormVisible = () => {
  roleFormVisible.value = false
}
// 隐藏弹框
const closeDialogFormVisible = (r?: string) => {
  dialogFormVisible.value = false
  rowData.value = {}
  // 更新列表
  getData()
}
</script>

<style lang="less" scoped></style>
