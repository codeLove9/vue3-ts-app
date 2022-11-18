import request from "./request"
import qs from "qs"

// 获取登陆后返回的token
export const getTokenApi = (data: AdminLoginData): PromiseResult<AdminLoginRes> => request.post("/admin/login", data)

// 根据token获取菜单信息
export const getUserInfo = (): PromiseResult<UserInfoRes> => request.get("/admin/info")

// 获取用户列表
export const getUserTable = (params: UserTableData): PromiseResult<UserTableRes> =>
  request.get("/admin/list", { params })

// 修改用户信息
export const updateUserInfo = (id: number, data: AdminItf): PromiseResult => request.post(`/admin/update/${id}`, data)

// 获取所有角色
export const getRoleListAll = (): PromiseResult<
  {
    id: number
    name: string
  }[]
> => request.get("/role/listAll")

//根据用户id获取角色
export const getAdminRoleByIdAPI = (
  adminId: number
): PromiseResult<
  {
    id: number
    name: string
  }[]
> => request.get(`/admin/role/${adminId}`)
// 分配用户角色
export const updateAdminRole = (data: { adminId: number; roleIds: string }): PromiseResult =>
  request.post("/admin/role/update", qs.stringify(data))

// 获取首页数据
export const getAdminstate = (): PromiseResult<AdminstateRes> =>
  request.get("http://kumanxuan1.f3322.net:8360/admin/stat")
