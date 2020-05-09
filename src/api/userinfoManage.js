/*
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-03-04 09:57:21
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-05-08 18:09:02
 * @Description:用户信息管理页面接口
 */
import request from '@/utils/request'

// 用户信息管理
export function userinfoList(obj) {
  return request({
    url: '',
    method: 'get',
    params: obj,
    baseURL: 'http://std.hi-cloud.net:8000/api/user/list'
  })
}

