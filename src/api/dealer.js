/*
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-06-29 14:56:08
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-30 17:36:20
 * @Description: 经销商管理
 */

import request from '@/utils/request'

// 经销商管理列表
export function dealerList(obj) {
  return request({
    url: '',
    method: 'get',
    params: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/list'
  })
}

// 换电站禁用
export function dealerUpdateDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/updateDisabled'
  })
}

// 换电站启用
export function dealerUpdateEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/updateEnabled'
  })
}

// 换电站批量禁用
export function dealerBatchDisabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/updateDisabledBatch'
  })
}

// 换电站批量启用
export function dealerBatchEnabled(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/updateEnabledBatch'
  })
}

// 换电站详情
export function getDealerById(obj) {
  return request({
    url: '',
    method: 'get',
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/getById/' + obj
  })
}

// 换电站新增
export function dealerSave(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/save'
  })
}

// 换电站编辑
export function dealerUpdate(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/update'
  })
}

// 经销商导出
export function dealerImportExcel(obj) {
  return request({
    url: '',
    method: 'get',
    responseType: 'blob',
    data: obj,
    baseURL: 'http://39.107.101.187/new_ow_admin/dealerInfo/importExcel'
  })
}
