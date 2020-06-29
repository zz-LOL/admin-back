<!--
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-05-09 10:30:22
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-29 15:24:11
 * @Description: 经销商新增编辑页
 -->

<template>
  <div class="box">
    <div class="big-title">
      <div class="title-o" v-if="!isEdit">新增经销商</div>
      <div class="title-t" v-if="!isEdit">新增经销商入网，输入经销商的基础信息以及补充信息</div>
      <div class="title-o" v-if="isEdit">编辑经销商信息</div>
      <div class="title-t" v-if="isEdit">可编辑经销商的部分基础信息和补充信息</div>
    </div>

    <div class="condition-box">
      <div class="content-title" v-if="!isEdit">新增经销商</div>
      <div class="content-title" v-if="isEdit">编辑经销商</div>

      <el-card class="form-container" shadow="never">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" size="small">
          <el-form-item label="经销商代码：" :required="true">
            <el-input v-model="formData.dealerCode" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="经销商简称：" :required="true">
            <el-input v-model="formData.dealerShortName" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="经销商全称：" :required="true">
            <el-input v-model="formData.dealerName" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="联系方式：" :required="true">
            <el-input v-model="formData.mobile" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="部门：" :required="true">
            <el-select v-model="formData.department">
              <el-option label="东部" value="东部" ></el-option>
              <el-option label="西部" value="西部" ></el-option>
              <el-option label="南部" value="南部" ></el-option>
              <el-option label="北部" value="北部" ></el-option>
              <el-option label="中部" value="中部" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在省：" :required="true">
            <el-select v-model="formData.provinceCode" @change="changeOneClass">
              <el-option v-for="(item, index) in areaOneClass" :key="index" :label="item.name" :value="item.id" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在市：" :required="true">
            <el-select v-model="formData.cityCode">
              <el-option v-for="(item, index) in areaTwoClass" :key="index" :label="item.name" :value="item.id" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="详细地址：" :required="true">
            <el-input v-model="formData.address" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="门店图片：">
            <span style="font-size:12px" >可上传3张图片。(格式支持：.png .jpg .gif | 尺寸要求：100*100 | 文件大小：1MB以内)</span>
            <upload-img
              :jndex="1"
              brforeAfter="1"
              :oldImgUrl="formData.shopImgList"
              @getUploadImg="getUploadImg"
            ></upload-img>
          </el-form-item>

          <el-form-item label="经度：" :required="true">
            <el-input v-model="formData.accuracy" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="纬度：" :required="true">
            <el-input v-model="formData.latitude" class="input-width"></el-input>
          </el-form-item>

          <el-form-item label="服务类型：" :required="true">
            <el-select v-model="formData.saleType">
              <el-option label="燃油车" :value="1" ></el-option>
              <el-option label="电动车" :value="2" ></el-option>
              <el-option label="混合车" :value="3" ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提供服务：">
            <el-checkbox-group v-model="formData.provideServiceList">
              <el-checkbox label="1" >预约试驾</el-checkbox>
              <el-checkbox label="2" >预约保养</el-checkbox>
              <el-checkbox label="3" >紧急救援</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="当前状态：" :required="true">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="bottom-content">
      <div class="button-content">
        <el-button @click="returnList()" style="margin-right: 150px;">返回列表</el-button>
        <el-button v-if="!isEdit" type="primary" @click="onSubmit()">确认创建</el-button>
        <el-button v-if="isEdit" type="primary" @click="onSubmit()">确认修改</el-button>
      </div>
    </div>

     <el-dialog
      :title="isEdit ? '编辑经销商信息' : '创建经销商信息'"
      :visible.sync="confirmDialog"
      width="30%">
      <span v-if="isEdit">您确认编辑此经销商信息吗</span>
      <span v-if="!isEdit">您确认创建此经销商信息吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
import uploadImg from "./uploadImg.vue";
import { areaDict, cityList } from "@/api/outlet.js";
import { getDealerById, dealerSave, dealerUpdate } from '@/api/dealer.js'

export default {
  name: "serviceAddAndEdit",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    queryId: {
      type: Number,
      default: null
    }
  },
  components: { uploadImg },
  data() {
    return {
      formData: {
        dealerCode: '',
        dealerShortName: '',
        dealerName: '',
        mobile: '',
        department: undefined,
        provinceCode: undefined,
        cityCode: undefined,
        address: '',
        shopImgList: null,
        accuracy: '',
        latitude: '',
        // saleType: undefined,
        provideServiceList: [],
        status: undefined
      },
      rules: {},
      confirmDialog: false,
      areaOneClass: [],
      areaTwoClass: []
    };
  },
  created() {
    if (this.isEdit) {
      getDealerById(this.queryId).then(response => {
        if (response.code === 200) {
          this.formData = response.result;
        }
      });
    }
    this.getAreaDict()
  },
  methods: {
    onSubmit() {
      // 验证表单
      // 验证经销商代码
      const codeLength = this.formData.dealerCode.replace(/^\s+|\s+$/g, "").length;
      if (codeLength === 0 || codeLength === undefined) {
        this.$message.error("经销商代码不能为空！");
        return false;
      }
      if (codeLength > 20) {
        this.$message.error("经销商代码不能超过20个字符！");
        return false;
      }

      // 验证经销商简称
      const shortNameLength = this.formData.dealerShortName.replace(/^\s+|\s+$/g, "").length;
      if (shortNameLength === 0 || shortNameLength === undefined) {
        this.$message.error("经销商简称不能为空！");
        return false;
      }
      if (shortNameLength > 20) {
        this.$message.error("经销商简称不能超过20个字符！");
        return false;
      }

      // 验证经销商全称
      const standNameLength = this.formData.dealerName.replace(/^\s+|\s+$/g, "").length;
      if (standNameLength === 0 || standNameLength === undefined) {
        this.$message.error("经销商全称不能为空！");
        return false;
      }
      if (standNameLength > 50) {
        this.$message.error("经销商全称不能超过50个字符！");
        return false;
      }

      // 验证联系方式
      const mobileLength = this.formData.mobile.replace(/^\s+|\s+$/g, "").length;
      if (mobileLength === 0 || mobileLength === undefined) {
        this.$message.error("联系方式不能为空！");
        return false;
      }
      if (mobileLength > 100) {
        this.$message.error("经销商全称不能超过100个字符！");
        return false;
      }

      // 验证部门
      if (this.formData.department === '' || this.formData.department === undefined || this.formData.department === null) {
        this.$message.error("请选择部门！");
        return false;
      }

      // 验证所在省
      if (this.formData.provinceCode === '' || this.formData.provinceCode === undefined || this.formData.provinceCode === null) {
        this.$message.error("请选择所在省！");
        return false;
      }

      // 验证所在市
      if (this.formData.cityCode === '' || this.formData.cityCode === undefined || this.formData.cityCode === null) {
        this.$message.error("请选择所在市！");
        return false;
      }

      // 验证详细地址
      const addressLength = this.formData.address.replace(/^\s+|\s+$/g, "").length;
      if (addressLength === 0 || addressLength === undefined) {
        this.$message.error("详细地址不能为空！");
        return false;
      }
      if (addressLength > 100) {
        this.$message.error("详细地址不能超过100个字符！");
        return false;
      }

      // 验证经度
      const accuracyLength = this.formData.accuracy.replace(/^\s+|\s+$/g, "").length;
      if (accuracyLength === 0 || accuracyLength === undefined) {
        this.$message.error("经度不能为空！");
        return false;
      }
      if (accuracyLength > 10) {
        this.$message.error("经度不能超过10个字符！");
        return false;
      }

      // 验证纬度
      const latitudeLength = this.formData.latitude.replace(/^\s+|\s+$/g, "").length;
      if (latitudeLength === 0 || latitudeLength === undefined) {
        this.$message.error("纬度不能为空！");
        return false;
      }
      if (latitudeLength > 10) {
        this.$message.error("纬度不能超过10个字符！");
        return false;
      }

      // 验证服务类型
      if (this.formData.saleType === '' || this.formData.saleType === undefined || this.formData.saleType === null) {
        this.$message.error("请选择服务类型！");
        return false;
      }

      // 验证当前状态
      if (this.formData.status === '' || this.formData.status === undefined || this.formData.status === null) {
        this.$message.error("请选择当前状态！");
        return false;
      }

      this.confirmDialog = true

    },
    handleConfirm() {
      if (!this.isEdit) {
        // 如果是新增
        dealerSave(this.formData).then(response => {
          if (response.code === 200) {
            this.$message.success('新增经销商信息成功!')
            this.confirmDialog = false
            this.returnList()
          } else {
            this.$message.error('新增经销商信息失败!')
          }
        });
      } else {
        // 如果是编辑
        dealerUpdate(this.formData).then(response => {
          if (response.code === 200) {
            this.$message.success('编辑经销商信息成功!')
            this.confirmDialog = false
            this.returnList()
          } else {
            this.$message.error('编辑经销商信息失败!')
          }
        });
      }
    },
    returnList() {
      this.$emit('closePage');
    },
    getUploadImg(url) {
      this.formData.shopImgList = url;
    },
    changeOneClass(val, item) {
      cityList(val).then(response => {
        if (response.code === 200) {
          this.areaTwoClass = response.result
        }
      });
    },
    getAreaDict() {
      areaDict().then(response => {
        if (response.code === 200) {
          this.areaOneClass = response.result
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.input-width {
  width: 60%;
}
.form-container {
  position: relative;
  background: #fff;
  overflow: hidden;
}

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
    margin: 20px;
    padding: 20px;
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
    box-shadow: 0px 2px 6px 0px #e1e3e5;
    border-radius: 4px;
    padding: 0;
    .user-info-box {
      width: 100%;
      overflow: hidden;
      .title {
        padding: 0 0 0 10px;
        height: 35px;
        line-height: 35px;
        background-color: rgba(246, 248, 248, 1);
        color: #506477;
      }
      .user-infos {
        color: #788188;
      }
    }
  }
}

.condition-box {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background: #ffffff;
  -webkit-box-shadow: 0px 2px 6px 0px #e1e3e5;
  box-shadow: 0px 2px 6px 0px #e1e3e5;
  border-radius: 4px;
  padding: 0;
  .content-title {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f8f8;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
  }
  .condition-box-l {
    display: flex;
    padding: 0 20px 30px;
    flex: 1;
    .condition-box-f {
      width: calc(100% - 180px);
    }
    .condition-box-r {
      width: 180px;
      margin: 20px 0 0 20px;
      button {
        margin: 0;
      }
      button:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
}

.bottom-content {
  position: relative;
  width: 100%;
  height: 52px;
  .button-content {
    width: 100%;
    height: 32px;
    margin: 20px 0;
    text-align: center;
  }
}
</style>
