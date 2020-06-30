 /*
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-06-22 17:22:08
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-30 17:33:15
 * @Description: 网点管理
 */
import request from '@/utils/request'

// 服务站管理列表
export function serviceList(obj) {
  return request({
    url: '',
    method: 'get',
    params: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/list'
  })
}

// 服务站禁用
export function updateDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/updateDisabled'
  })
}

// 服务站启用
export function updateEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/updateEnabled'
  })
}

export function upload(params) {
  var formData = new FormData();
  formData.append('file', params.file)
  return request({
    url: '',
    baseURL: 'http://std.hi-cloud.net:8000/medal/img/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}

// 服务站详情
export function getServiceById(obj) {
  return request({
    url: '',
    method: 'get',
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/getById/' + obj
  })
}

// 服务站新增
export function serviceSave(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/save'
  })
}

// 服务站编辑
export function serviceUpdate(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/update'
  })
}

// 服务站禁用
export function updateBatchDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/updateDisabledBatch'
  })
}

// 服务站启用
export function updateBatchEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/updateEnabledBatch'
  })
}

// 换电站管理列表
export function chargingList(obj) {
  return request({
    url: '',
    method: 'get',
    params: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/list'
  })
}

// 换电站禁用
export function chargingUpdateDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/updateDisabled'
  })
}

// 换电站启用
export function chargingUpdateEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/updateEnabled'
  })
}

// 换电站批量禁用
export function chargingBatchDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/updateDisabledBatch'
  })
}

// 换电站批量启用
export function chargingBatchEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/updateEnabledBatch'
  })
}

// 换电站详情
export function getChargingById(obj) {
  return request({
    url: '',
    method: 'get',
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/getById/' + obj
  })
}

// 换电站新增
export function chargingSave(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/save'
  })
}

// 换电站编辑
export function chargingUpdate(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/update'
  })
}

// 查询省
export function areaDict(obj) {
  return request({
    url: '',
    method: 'get',
    baseURL: 'http://39.107.101.187/new_ow_admin/areaDict/list'
  })
}

// 查询市
export function cityList(obj) {
  return request({
    url: '',
    method: 'get',
    baseURL: 'http://39.107.101.187/new_ow_admin/areaDict/cityList/' + obj
  })
}

// 服务站导出
export function serviceImportExcel(obj) {
  return request({
    url: '',
    method: 'get',
    responseType: 'blob',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/serviceStand/importExcel'
  })
}

// 服务站导出
export function chargingImportExcel(obj) {
  return request({
    url: '',
    method: 'get',
    responseType: 'blob',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/chargingStand/importExcel'
  })
}
