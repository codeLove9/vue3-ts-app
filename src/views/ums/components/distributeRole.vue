<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" :before-close="close">
    <el-form :model="form">
      <el-form-item>
        <el-select multiple v-model="roles" placeholder="请选择一个选项">
          <el-option v-for="role in form.roleLists" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="updateRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from "vue"
import { updateAdminRole } from "@/api/api"

const formLabelWidth = "140px"

const props = defineProps<{
  dialogFormVisible: Boolean
  form: AdminRoleFormData
}>()

const roles = ref<number[]>([])

const emits = defineEmits<{
  (e: "close"): void
}>()

watch(
  () => props.form.userRoles,
  () => {
    roles.value = props.form.userRoles.map(item => item.id)
  }
)

const close = () => {
  emits("close")
}

const updateRole = () => {
  updateAdminRole({ adminId: props.form.adminId, roleIds: roles.value.join(",") }).then(res => {
    if (res.code === 200) {
      close()
    }
  })
}
</script>

<style lang="less" scoped></style>
