import { createStore } from "vuex"
import { App } from "vue"
import { getUserInfo } from "@/api/api"

interface MenusType {
  id: number
  parentId: number
  title: string
  children?: {
    id: number
    title: string
  }[]
}
interface State {
  menus: MenusType[]
}

const store = createStore<State>({
  state() {
    return {
      menus: []
    }
  },
  mutations: {
    updataState(state, menus) {
      state.menus = menus
    }
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise(async (resolve, reject) => {
        getUserInfo()
          .then(res => {
            if (res.code == 200) {
              const menus = res.data.menus
              commit("updataState", menus)
              resolve(res)
            }
          })
          .catch(() => {
            reject((err: never) => {
              throw new Error(err)
            })
          })
      })
    }
  },
  getters: {
    getNewMenus(state) {
      const menus = state.menus
      const NewMenus: MenusType[] = menus.filter(item => item.parentId == 0)
      NewMenus.forEach(item => {
        item.children = []
        menus.forEach(item1 => {
          if (item1.parentId !== 0 && item.id == item1.parentId) {
            item.children?.push(item1)
          }
        })
      })
      return NewMenus

      // 方法一 递归
      // function formatData(data: any, arr: any = []) {
      //   let ars = arr
      //   // 此时判断length 如果没有证明一级菜单尚未添加上去 所以添加一级菜单
      //   if (!ars.length) {
      //     ars = data.filter((d: any) => d.parentId === 0)
      //     // console.log(data, ars);
      //     formatData(data, ars)
      //   }
      //   else {
      //     // 二级菜单
      //     data.forEach((d: any) => {
      //       let index = ars.findIndex((a: any) => a.id === d.parentId)
      //       console.log(index)
      //       // ~: -1取反再减一， 配合indexof、findindex使用
      //       if (~index) {
      //         if (!ars[index].children) {
      //           ars[index].children = [d]
      //         } else {
      //           ars[index].children.push(d)
      //         }
      //       }
      //     })
      //   }
      //   return ars
      // }
      // console.log(formatData(state.menus, []), "我是处理的数据")

      // 方法二 reduce
      // let ars = state.menus.map(menu=> {
      //   if(menu.parentId === 0) {
      //     return {
      //       ...menu,
      //       children:[]
      //     }
      //   }
      // }).filter(Boolean)
      // console.log(ars,'ars')
      // let result = state.menus.reduce((pre, cur) => {
      //   console.log(pre, "pre")
      //   let index = pre.findIndex((f: any) => f.id === cur.parentId && f.id !== cur.id)
      //   if (~index) {
      //     pre[index].children.push(cur)
      //     return pre
      //   }
      //   return pre
      // }, ars)
      // console.log(result, "result")
    }
  },
  modules: {}
})

export const initStore = (app: App<Element>) => {
  app.use(store)
}
export default store
