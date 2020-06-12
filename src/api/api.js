import http  from './http.js'
const { post, get, patch, put} = http
export const login = params => get('api/login', params)
export const logout = () => get('api/logout')
export const usage = () => get('api/usage')
export const endPoint = () => get(`api/endpoint`)
export const addEndPoint = (params) => post('api/endpoint', params)
export const tenant = () => get(`api/tenant`)
export const deleteTenant = (username, endpoint) => http.delete(`api/tenant/${username}`, endpoint)
export const addTenant = (params) => post(`api/tenant`, params)
export const client = () => get(`api/client`)
export const deleteClient = (ip) => http.delete(`api/client/${ip}`)
export const deletePonit = (address) => http.delete(`api/endpoint/${address}`)
export const addClient = (params) => post('api/client', params)
// 备份计划
export const backup = (params) => get(`api/backup`, params)
// 删除备份计划
export const deleteBackup = (id) => http.delete(`api/backup/${id}`)
// 恢复运行备份计划
export const resumeBackup = (id, option) => patch(`api/backup/${id}`, option)
export const endPointId = (id) => get(`api/endpoint/${id}`)
// 备份历史
export const record = (params) => get('api/record/backup', params)
// 备份恢复
export const recoveryId = (params) => post('api/recovery', params)
// 删除备份历史
export const deleteRecord =(id) => http.delete(`api/record/backup/${id}`)
// 恢复历史
export const recovery = (params) => get('api/record/recovery', params)
// 删除恢复历史
export const deleteRecovery =(id) => http.delete(`api/record/recovery/${id}`)
// 中断恢复历史
export const interruptRecovery = (id, option) => patch(`api/recovery/${id}`, option)
//新建表单
export const addFrom = (params) =>post(`api/backup`,params)
//编辑表单
export const editFrom = (params) =>put(`api/backup/`, params)
// 对象存储桶
export const bucket = (params) => get('api/tenant/buckets', params)

// 清理
export const clean = () => get('api/clean')

