<template>
   <MyPie :data="salePie"></MyPie>
   <MyMap :data="saleMap"></MyMap>
</template>

<script lang="ts" setup>
import { getAdminstate } from "@/api/api"
import { reactive, toRefs } from "vue"
import MyPie from './components/MyPie.vue'
import MyMap from './components/MyMap.vue'


const state = reactive<AdminstateRes>({
  salePie: [],
  saleMap: []
})
const {salePie, saleMap} = toRefs(state)


getAdminstate().then(res => {
  if (res.errno == 0) {
    state.salePie = res.data.salePie
    state.saleMap = res.data.saleMap
  }
})
</script>

<style lang="less" scoped></style>
