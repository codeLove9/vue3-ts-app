<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          :unique-open="true"
          :router="true"
        >
          <el-sub-menu :index="firstMenu.id + ''" v-for="firstMenu in newMenus" :key="firstMenu.id">
            <template #title>
              <span>{{ firstMenu.title }}</span>
            </template>
            <template v-for="secondMenu in firstMenu.children" :key="secondMenu.id">
              <el-menu-item :index="`/${firstMenu.name}/${secondMenu.name}`" v-if="secondMenu.hidden==0">{{
                secondMenu.title
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useStore } from "vuex"
import { computed } from "vue"
interface MenusType {
  id: number
  parentId: number
  name: string
  title: string
  children?: {
    id: number
    name: string
    title: string
    hidden: 0 | 1
  }[]
}
const store = useStore()
const newMenus = computed<MenusType[]>(() => store.getters.getNewMenus)
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.el-menu {
  height: 132vh;
  overflow: hidden;
}
</style>
