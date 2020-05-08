<!--
 * @Author: your name
 * @Date: 2020-05-08 14:25:51
 * @LastEditTime: 2020-05-08 15:03:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /admin-back/src/views/table/detail.vue
 -->
<template>
  <div class="box">
    <div class="big-title">
      <div class="title-o">会员信息管理</div>
      <div class="title-t">会员信息管理作为会员服务系统中的基础会员服务模块，您可以在会员信息管理中查询该会员的详细基础信息和大量的会员行为信息</div>
    </div>
    <div class="contanier">
      <div class="user-info-box">
        <div class="title">用户信息概要</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  .big-title{
    padding: 10px 20px 0px 20px;
    width: 100%;
    color: #788188;
    .title-o{
      padding-bottom: 10px;
      font-size: 28px;
    }
    .title-t{
    }
  }
  .contanier {
    margin: 20px;
    padding: 20px;
    background: #ffffff;
    min-height: 800px;
    -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
    box-shadow: 0px 2px 6px 0px #e1e3e5;
    border-radius: 4px;
    padding: 0;
    .user-info-box{
      width: 100%;
      overflow: hidden;
      .title{
        padding: 0 0 0 10px;
        height: 35px;
        line-height: 35px;
        background-color: rgba(246, 248, 248, 1);
        color: #506477;
      }
    }
  }
}
</style>