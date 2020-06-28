<!--
 * @Author: your name
 * @Date: 2020-05-08 14:25:51
 * @LastEditTime: 2020-05-08 16:32:35
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
        <div class="user-infos">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple" style="text-align:center">
                <p class="pic">头像</p>
                <div class="name">飞驰的小三轮</div>
                <div class="userId">(UserID:2356942)</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <p>
                  真实姓名：
                  赵飞虎
                </p>
                <p>
                  出生性别：
                  男
                </p>
                <p>
                  手机号码：
                  1760****6029
                </p>
                <p>
                  出生日期：
                  1985-02-30（35岁）
                </p>
                <p>
                  所在城市：
                  浙江省 杭州市
                </p>
                <p>
                  详细地址：
                  上城区延****
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>
                  注册日期：
                  2018.02.12 12:15:32
                </p>
                <p>
                  注册渠道：
                  App(IOS)
                </p>
                <p>
                  微信OpenID：
                  wx98fb14481b3ab5a2
                </p>
                <p>
                  电子邮件：
                  caixukunhaoshuai@163.com
                </p>
                <p>
                  QQ账号：
                  100862377
                </p>
                <p>
                  民族：
                  汉族
                </p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <p>
                  车辆认证状态：
                  已认证
                </p>
                <p>
                  等级有效期：
                  2018-02-30 ～2020-02-30
                </p>
                <p>
                  会员偏好：
                  旅行/改装/车生活
                </p>
                <p>
                  协助入会人：
                  -
                </p>
                <p>
                  协助入会人：
                  -
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="num-box">
          <div>
            <span class="item-o">金卡会员</span>
            <span class="item-t">会员等级</span>
          </div>
          <div>
            <span class="item-o">30240</span>
            <span class="item-t">账户可用积分</span>
          </div>
          <div>
            <span class="item-o">54</span>
            <span class="item-t">售后返厂次数</span>
          </div>
          <div>
            <span class="item-o">34</span>
            <span class="item-t">参与活动次数</span>
          </div>
          <div>
            <span class="item-o">5</span>
            <span class="item-t">日常签到总数</span>
          </div>
          <div>
            <span class="item-o">3</span>
            <span class="item-t">社区发帖总数</span>
          </div>
          <div>
            <span class="item-o">54</span>
            <span class="item-t">商城订单总数</span>
          </div>
          <div>
            <span class="item-o">43</span>
            <span class="item-t">预约试驾总数</span>
          </div>
          <div>
            <span class="item-o">7</span>
            <span class="item-t">紧急救援总数</span>
          </div>
        </div>
      </div>
      <div class="lable-box">
        <p>
          会员标签：
          男士 / 85后 / 认证车主 / VA3社群 / VA5社群 / 旅行爱好者 / 改装爱好者/ 社区活跃用户
        </p>
      </div>
      <div class="infos-detail">
        <div class="tag-group">
          <span class="tag-group__title" style="min-height:55px;float:left; line-height:30px">信息详情：</span>
          <el-tag
            style="margin: 0 50px 20px 0"
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            effect="dark"
          >{{ item.label }}</el-tag>
        </div>
      </div>
      <div class="btn-box">
        <el-button>返回列表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { type: '', label: '认证记录' },
        { type: '', label: '积分记录' },
        { type: '', label: '返厂记录' },
        { type: '', label: '推荐购车' },
        { type: '', label: '商城订单' },
        { type: '', label: '预约试驾' },
        { type: '', label: '编辑记录' },
        { type: '', label: '附件管理' },
        { type: '', label: '紧急救援' },
        { type: '', label: '商城订单' },
        { type: '', label: '认证记录' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  .big-title {
    padding: 10px 20px 0px 20px;
    width: 100%;
    color: #788188;
    .title-o {
      padding-bottom: 10px;
      font-size: 28px;
    }
    .title-t {
    }
  }
  .contanier {
    .user-info-box {
      margin: 20px;
      background: #ffffff;
      -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
      box-shadow: 0px 2px 6px 0px #e1e3e5;
      border-radius: 4px;
      padding: 0;
      .title {
        padding: 0 0 0 20px;
        height: 35px;
        line-height: 35px;
        background-color: rgba(246, 248, 248, 1);
        color: #506477;
        font-size: 12px;
      }
      .user-infos {
        width: 98%;
        margin: 0 10px;
        padding: 20px 0;
        color: #788188;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        .pic{
          margin: 0 auto;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 1px solid #FAD733;
          line-height: 110px;
        }
        .name{
          padding: 20px 0 10px 0;
          font-weight: 700;
        }
      }
      .num-box {
        // display: grid;
        // grid-template-columns: repeat(auto-fill, 10%);
        display: grid;
        grid-template-columns: repeat(auto-fill, 10%);
        grid-gap: 10px;
        justify-content: space-between;
        padding: 20px 0;
        font-size: 12px;
        color: #788188;
        div {
          width: 100%;
          text-align: center;
          line-height: 30px;
          span {
            display: block;
            width: 100%;
          }
          .item-o {
            font-weight: 700;
          }
          .item-t {
          }
        }
      }
    }
    .lable-box {
      margin: 20px;
      background: #ffffff;
      -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
      box-shadow: 0px 2px 6px 0px #e1e3e5;
      border-radius: 4px;
      padding: 20px;
      color: #788188;
      font-size: 12px;
    }
    .infos-detail {
      margin: 20px;
      background: #ffffff;
      -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
      box-shadow: 0px 2px 6px 0px #e1e3e5;
      border-radius: 4px;
      padding: 20px;
      color: #788188;
      font-size: 12px;
    }
    .btn-box{
      margin: 20px 0;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
