interface AdminLoginData {
  username: string
  password: string
}

type PromiseResult<T = {}> = Promise<ManageResData<T>>
interface ManageResData<T> {
  code?: number
  data: T
  message: string
  errno?: number
}
interface AdminLoginRes {
  token: string
  tokenHead: string
}
interface UserInfoRes {
  icon: string | null
  menus: {}[]
  roles: string[]
  username: string
}
interface UserTableData {
  keyword: string
  pageNum: number
  pageSize: number
}
interface UserTableRes {
  list: {}[]
  pageNum: number
  pageSize: number
  total: number
  totalPage: number
}

interface AdminstateRes {
  salePie: {
    name: string
    today_money: string
  }[]
  saleMap: {
    name: string
    today_money: string
  }[]
}
