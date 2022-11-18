interface AdminItf {
  id?: number
  username?: string
  password?: string
  icon?: any
  email?: string
  nickName?: string
  note?: string
  createTime?: string
  loginTime?: any
  status?: number
}

interface AdminRoleFormData {
  userRoles: {
    id: number
    name: string
  }[]
  roleLists: {
    id: number
    name: string
  }[]
  adminId: number
}
