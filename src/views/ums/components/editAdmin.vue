<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" :before-close="close">
    <el-form :model="newForm">
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="newForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="newForm.note" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否启用" :label-width="formLabelWidth">
        <el-radio-group v-model="newForm.status" class="ml-4">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from "vue"
import { updateUserInfo } from "@/api/api"

const formLabelWidth = "140px"

const props = defineProps<{
  dialogFormVisible: boolean
  form: AdminItf
}>()

let newForm = ref<AdminItf>({})

// 拷贝form
watch(
  () => props.form,
  () => {
    newForm.value = { ...props.form }
  }
)

const emit = defineEmits<{
  (e: "close", r?: string): void
}>()
const close = (r?: string) => {
  emit("close", r)
}
const submit = async () => {
  const res = await updateUserInfo(newForm.value.id as number, newForm.value)
  if (res.code == 200) {
    close('reload')
  }
}
</script>

<style lang="less" scoped></style>
