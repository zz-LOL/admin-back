 /*
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-06-22 17:22:08
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-24 17:34:45
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
