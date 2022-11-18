import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import { App } from "vue"
import Cookie from "js-cookie"
import store from "@/store"

const routes: readonly RouteRecordRaw[] = [
  { path: "/login", component: () => import("@/views/Login.vue") },
  { path: "/home", component: () => import("@/views/Home.vue") }
  // ,{
  //   path: "/oms",
  //   component: () => import("@/views/Home.vue"),
  //   children: [{ path: "orderDetail", component: () => import("@/views/oms/orderDetail.vue") }]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加动态路由
const addNewRoute = () => {
  const menus = store.getters.getNewMenus
  menus.forEach((item: any) => {
    const routeConfig: RouteRecordRaw = {
      path: `/${item.name}`,
      component: () => import("@/views/Home.vue"),
      redirect: `/${item.name}/${item.children[0].name}`,
      children: []
    }
    item.children.forEach((item1: any) => {
      routeConfig.children.push({
        path: `${item1.name}`,
        component: () => import(`@/views/${item.name}/${item1.name}.vue`)
      })
    })
    router.addRoute(routeConfig)
  })
  router.addRoute({
    path: "/",
    component: () => import(`@/views/Home.vue`),
    redirect: "/index",
    children: [{ path: "index", component: () => import(`@/views/index/index.vue`) }]
  })
}

router.beforeEach(async (to, from, next) => {
  const token = Cookie.get("token")
  // 登陆后每次刷新
  if (token && store.state.menus.length === 0) {
    // 异步
    const res = await store.dispatch("getUserInfo")
    if (res.code == 200) {
      addNewRoute()
      next(to.path)
    }
  } 
  else if (token && store.state.menus.length !== 0 && from.path == "/login" && to.path == "/home") {
    addNewRoute()
    next('index')
  } else if (!token && to.path !== "/login") {
    addNewRoute()
    next("/login")
  } else {
    next()
  }
})

export const initRouter = (app: App<Element>) => {
  app.use(router)
}

