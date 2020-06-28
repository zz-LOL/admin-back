<!--
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-06-22 16:31:22
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-28 16:06:27
 * @Description: 服务站详情
--> 

<template>
  <div class="goods-contanier">
    <div class="big-title">
      <div class="title-o">服务站详情</div>
      <div class="title-t">查看服务站的详细信息，包括基础门店信息和补充信息</div>
    </div>
    
    <!-- 基本信息 -->
    <div class="base-info">
      <div class="title">服务站基础信息</div>
      <div class="infos-contanier">
        <el-row>
          <el-col :span="6">
            <span>服务站代码：</span>
            {{ detail.serviceStandCode }}
          </el-col>
          <el-col :span="6">
            <span>服务站简称：</span>
            {{ detail.serviceStandShortName }}
          </el-col>
          <el-col :span="6">
            <span>服务站全称：</span>
            {{ detail.serviceStandName }}
          </el-col>
          <el-col :span="6">
            <span>联系方式：</span>
            {{ detail.mobile }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>部门：</span>
            {{ detail.department }}
          </el-col>
          <el-col :span="6">
            <span>所在省：</span>
            {{ detail.provinceName }}
          </el-col>
          <el-col :span="6">
            <span>所在市：</span>
            {{ detail.cityName }}
          </el-col>
          <el-col :span="6">
            <span>详细地址：</span>
            {{ detail.address }}
          </el-col>
        </el-row>
      </div>
    </div>


    <div class="list-content">
      <div class="title">补充信息</div>

      <div class="list">
        <div class="left-key">门店图片:</div>
        <div class="right-value">
          <!-- <div class="img-li">
            <a :href="testimg" data-lightbox="roadtrip" style="width: 100%; height: 100%">
              <img :src="testimg" alt />
            </a>
          </div>-->
          <div v-if="detail.shopImgList">
            <div class="img-li" v-for="(item, index) in detail.shopImgList" :key="index">
              <a :href="item" data-lightbox="roadtrip" style="width: 100%; height: 100%">
                <img :src="item" alt />
              </a>
            </div>
          </div>
          <div v-if="!detail.shopImgList">
            <div class="img-li"></div>
          </div>
        </div>
        <div class="clear"></div>
      </div>

      <div class="list">
        <div class="left-key">经度:</div>
        <div class="right-value">{{ detail.accuracy }}</div>
        <div class="clear"></div>
      </div>

      <div class="list">
        <div class="left-key">纬度:</div>
        <div class="right-value">{{ detail.latitude }}</div>
        <div class="clear"></div>
      </div>

      <div class="list">
        <div class="left-key">当前状态:</div>
        <div class="right-value" v-if="detail.status === 1">启用</div>
        <div class="right-value" v-if="detail.status === 2">禁用</div>
        <div class="clear"></div>
      </div>

      <div class="list">
        <div class="left-key">服务类型:</div>
        <div class="right-value" v-if="detail.saleType === 1">燃油车</div>
        <div class="right-value" v-if="detail.saleType === 2">电动车</div>
        <div class="right-value" v-if="detail.saleType === 3">混合车</div>
        <div class="clear"></div>
      </div>

      <div class="list">
        <div class="left-key">提供服务:</div>
        <div class="right-value">{{ getServerName(detail.provideServiceList) }}</div>
        <div class="clear"></div>
      </div>

    </div>

    <div class="bottom-content">
      <div class="button-content">
        <el-button @click="closeBtn()">返回列表</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { getServiceById } from "@/api/outlet.js";

export default {
  props: {
    queryId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      detail: {
      }
    }
  },
  created() {
    if (this.queryId) {
      getServiceById(this.queryId).then(response => {
        if (response.code === 200) {
          this.detail = response.result;
        }
      });
    }
  },
  methods: {
    closeBtn() {
      this.$emit('closePage');
    },
    getServerName(numArray) {
      if (numArray) {
        let nameArr = []
        numArray.forEach(element => {
          if (element === '1') {
            nameArr.push('预约试驾 ')
          } else if (element === '2') {
            nameArr.push('预约保养 ')
          } else if (element === '3') {
            nameArr.push('紧急救援 ')
          } 
        });

        return nameArr.join("/")
      }else {
        return ''
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.goods-contanier {
  .base-info {
    overflow: hidden;
    margin: 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 2px 6px 0px #e1e3e5;
    border-radius: 4px;
    .title {
      padding: 0 20px;
      width: 100%;
      height: 40px;
      background: #f6f8f8;
      line-height: 40px;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333;
    }
    .infos-contanier {
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333;
      padding: 10px 20px;
      .ant-row {
        margin-bottom: 10px;
        .ant-col-6 {
          span {
            float: left;
            width: 100px;
            text-align: right;
          }
        }
      }
    }
  }
  .buy-setting {
    .setting-contanier {
      .infos-item {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .goods-serve {
    .infos-item {
      margin-bottom: 10px;
      .store-contanier {
        padding: 0 0 0 30px;
        .box {
          width: 100%;
          min-height: 100px;
          padding: 3px 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          p div{
            margin-bottom: 10px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.fw {
  font-weight: 700;
}
.goods-sall-info {
  .ant-row {
    margin: 20px 0px;
    span {
      float: left;
    }
    .ant-input {
      float: left;
      width: 200px;
    }
  }
  .chose-item {
    margin-top: -10px;
    text-align: center;
  }
}
.bottom-content {
  position: relative;
  width: 100%;
  height: 32px;
  .button-content {
    width: 100%;
    height: 32px;
    margin: 20px 0;
    text-align: center;
    .left-button {
      margin-right: 20px;
    }
  }
}

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

.el-row{
  margin: 20px;
}

.list-content {
  background-color: #fff;
  height: 350px;
  margin: 20px;
  box-shadow: 0px 2px 6px 0px #e1e3e5;
  border-radius: 4px;
  font-family: "PingFangSC";
  font-size: 14px;
  color: #333;
  .title {
    padding: 0 20px;
    width: 100%;
    height: 40px;
    background: #f6f8f8;
    line-height: 40px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
  }
  .list {
    width: 100%;
    min-height: 40px;
    line-height: 40px;
    .left-key {
      float: left;
      width: 120px;
      text-align: right;
      padding-right: 10px;
    }
    .right-value {
      float: left;
      width: calc(100% - 160px);
      text-align: left;
      word-break: break-all;
      word-wrap: break-word;
      display: inline;
      .select-width {
        width: 150px;
      }
      .img-li {
        float: left;
        list-style-type: none;
        width: 160px;
        height: 100px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

</style>

