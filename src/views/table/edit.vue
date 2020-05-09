<!--
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-05-09 10:30:22
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-05-09 11:05:02
 * @Description: 编辑页
 -->

<template>
  <div class="box">
    <div class="big-title">
      <div class="title-o">会员信息管理</div>
      <div class="title-t">会员信息管理作为会员服务系统中的基础会员服务模块，您可以在会员信息管理中查询该会员的详细基础信息和大量的会员行为信息</div>
    </div>

    <div class="condition-box">
      <div class="content-title">编辑用户信息</div>

      <el-card class="form-container" shadow="never">
        <el-form :model="coupon" :rules="rules" ref="couponFrom" label-width="150px" size="small">
          <el-form-item label="会员类型：">
            <el-select v-model="coupon.type">
              <el-option
                v-for="type in typeOptions"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员名称：" prop="name">
            <el-input v-model="coupon.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="适用平台：">
            <el-select v-model="coupon.platform">
              <el-option
                v-for="item in platformOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总发行量：" prop="publishCount">
            <el-input
              v-model.number="coupon.publishCount"
              placeholder="只能输入正整数"
              class="input-width"
            ></el-input>
          </el-form-item>
          <el-form-item label="面额：" prop="amount">
            <el-input
              v-model.number="coupon.amount"
              placeholder="面值只能是数值，限2位小数"
              class="input-width"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="每人限领：">
            <el-input v-model="coupon.perLimit" placeholder="只能输入正整数" class="input-width">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <el-form-item label="使用门槛：" prop="minPoint">
            <el-input v-model.number="coupon.minPoint" placeholder="只能输入正整数" class="input-width">
              <template slot="prepend">满</template>
              <template slot="append">元可用</template>
            </el-input>
          </el-form-item>
          <el-form-item label="有效期：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="coupon.startTime"
              style="width: 150px"
            ></el-date-picker>
            <span style="margin-left: 20px;margin-right: 20px">至</span>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="coupon.endTime"
              style="width: 150px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="可使用商品：">
            <el-radio-group v-model="coupon.useType">
              <el-radio-button :label="0">全场通用</el-radio-button>
              <el-radio-button :label="1">指定分类</el-radio-button>
              <el-radio-button :label="2">指定商品</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="coupon.useType===1">
            <el-cascader
              clearable
              placeholder="请选择分类名称"
              v-model="selectProductCate"
              :options="productCateOptions"
            ></el-cascader>
            <el-button @click="handleAddProductCategoryRelation()">添加</el-button>
            <el-table
              ref="productCateRelationTable"
              :data="coupon.productCategoryRelationList"
              style="width: 100%;margin-top: 20px"
              border
            >
              <el-table-column label="分类名称" align="center">
                <template
                  slot-scope="scope"
                >{{scope.row.parentCategoryName}}>{{scope.row.productCategoryName}}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDeleteProductCateRelation(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item v-show="coupon.useType===2">
            <el-select
              v-model="selectProduct"
              filterable
              remote
              reserve-keyword
              placeholder="商品名称/商品货号"
              :remote-method="searchProductMethod"
              :loading="selectProductLoading"
            >
              <el-option
                v-for="item in selectProductOptions"
                :key="item.productId"
                :label="item.productName"
                :value="item.productId"
              >
                <span style="float: left">{{ item.productName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">NO.{{ item.productSn }}</span>
              </el-option>
            </el-select>
            <el-button @click="handleAddProductRelation()">添加</el-button>
            <el-table
              ref="productRelationTable"
              :data="coupon.productRelationList"
              style="width: 100%;margin-top: 20px"
              border
            >
              <el-table-column label="商品名称" align="center">
                <template slot-scope="scope">{{scope.row.productName}}</template>
              </el-table-column>
              <el-table-column label="货号" align="center" width="120">
                <template slot-scope="scope">NO.{{scope.row.productSn}}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDeleteProductRelation(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              class="input-width"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="coupon.note"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="bottom-content">
      <div class="button-content">
        <el-button type="primary" @click="onSubmit('couponFrom')" style="margin-right: 150px;">确认修改</el-button>
        <el-button v-if="!isEdit" @click="resetForm('couponFrom')">返回列表</el-button>
      </div>
    </div>

  </div>
</template>
<script>
const defaultCoupon = {
  type: 0,
  name: null,
  platform: 0,
  amount: null,
  perLimit: 1,
  minPoint: null,
  startTime: null,
  endTime: null,
  useType: 0,
  note: null,
  publishCount: null,
  productRelationList: [],
  productCategoryRelationList: []
};
const defaultTypeOptions = [
  {
    label: "全场赠券",
    value: 0
  },
  {
    label: "会员赠券",
    value: 1
  },
  {
    label: "购物赠券",
    value: 2
  },
  {
    label: "注册赠券",
    value: 3
  }
];
const defaultPlatformOptions = [
  {
    label: "全平台",
    value: 0
  },
  {
    label: "移动平台",
    value: 1
  },
  {
    label: "PC平台",
    value: 2
  }
];
export default {
  name: "CouponDetail",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coupon: Object.assign({}, defaultCoupon),
      typeOptions: Object.assign({}, defaultTypeOptions),
      platformOptions: Object.assign({}, defaultPlatformOptions),
      rules: {
        name: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        publishCount: [
          {
            type: "number",
            required: true,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ],
        amount: [
          {
            type: "number",
            required: true,
            message: "面值只能是数值，0.01-10000，限2位小数",
            trigger: "blur"
          }
        ],
        minPoint: [
          {
            type: "number",
            required: true,
            message: "只能输入正整数",
            trigger: "blur"
          }
        ]
      },
      selectProduct: null,
      selectProductLoading: false,
      selectProductOptions: [],
      selectProductCate: null,
      productCateOptions: []
    };
  },
  created() {
    if (this.isEdit) {
      getCoupon(this.$route.query.id).then(response => {
        this.coupon = response.data;
      });
    }
    this.getProductCateList();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            if (this.isEdit) {
              updateCoupon(this.$route.query.id, this.coupon).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createCoupon(this.coupon).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000
                });
                this.$router.back();
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.coupon = Object.assign({}, defaultCoupon);
    },
    searchProductMethod(query) {
      if (query !== "") {
        this.loading = true;
        fetchProductList({ keyword: query }).then(response => {
          this.loading = false;
          let productList = response.data;
          this.selectProductOptions = [];
          for (let i = 0; i < productList.length; i++) {
            let item = productList[i];
            this.selectProductOptions.push({
              productId: item.id,
              productName: item.name,
              productSn: item.productSn
            });
          }
        });
      } else {
        this.selectProductOptions = [];
      }
    },
    handleAddProductRelation() {
      if (this.selectProduct === null) {
        this.$message({
          message: "请先选择商品",
          type: "warning"
        });
        return;
      }
      this.coupon.productRelationList.push(
        this.getProductById(this.selectProduct)
      );
      this.selectProduct = null;
    },
    handleDeleteProductRelation(index, row) {
      this.coupon.productRelationList.splice(index, 1);
    },
    handleAddProductCategoryRelation() {
      if (
        this.selectProductCate === null ||
        this.selectProductCate.length === 0
      ) {
        this.$message({
          message: "请先选择商品分类",
          type: "warning"
        });
        return;
      }
      this.coupon.productCategoryRelationList.push(
        this.getProductCateByIds(this.selectProductCate)
      );
      this.selectProductCate = [];
    },
    handleDeleteProductCateRelation(index, row) {
      this.coupon.productCategoryRelationList.splice(index, 1);
    },
    getProductById(id) {
      for (let i = 0; i < this.selectProductOptions.length; i++) {
        if (id === this.selectProductOptions[i].productId) {
          return this.selectProductOptions[i];
        }
      }
      return null;
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
  height: 32px;
  .button-content {
    width: 100%;
    height: 32px;
    margin: 20px 0;
    text-align: center;
  }
}
</style>
