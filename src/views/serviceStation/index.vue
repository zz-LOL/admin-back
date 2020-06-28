<!--
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-06-22 16:30:00
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-28 17:22:06
 * @Description: 服务站列表
--> 

<template>
  <div class="box">
    <div v-if="!showPage && !showDetail">
      <div class="big-title">
      <div class="title-o">服务站管理</div>
      <div class="title-t">管理员可以在此模块中管理服务站的基础信息</div>
    </div>
    <div class="condition-box">
      <div class="content-title">搜索</div>

      <div class="condition-box-l">
        <div class="condition-box-f">
          <div class="input-box">
            <div class="col">
              <span>服务站代码:</span>
              <el-input placeholder="请输入" size="medium" v-model="filter.serviceStandCode"></el-input>
            </div>
            <div class="col">
              <span>服务站简称:</span>
              <el-input placeholder="请输入" size="medium" v-model="filter.serviceStandShortName"></el-input>
            </div>
            <div class="col">
              <span>服务站全称:</span>
              <el-input placeholder="请输入" size="medium" v-model="filter.serviceStandName"></el-input>
            </div>
          </div>
          <div class="input-box">
            <div class="col">
              <span>服务站所在省:</span>
              <el-select v-model="filter.provinceCode" size="medium" style="width: 100%" placeholder="请选择">
                <el-option :value="0">北京市</el-option>
                <el-option :value="1">天津市</el-option>
              </el-select>
            </div>

            <div class="col">
              <span>服务站所在市:</span>
              <el-select v-model="filter.cityCode" size="medium" style="width: 100%"  placeholder="请选择">
                <el-option :value="0">朝阳区</el-option>
                <el-option :value="1">海淀区</el-option>
              </el-select>
            </div>

            <div class="col">
              <span>入网时间:</span>
              <el-date-picker
                v-model="filter.time"
                size="medium"
                style="width: 100%"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="changeDate"
              ></el-date-picker>
            </div>
          </div>
          <div class="input-box">
            <div class="col">
              <span>服务类型:</span>
              <el-select v-model="filter.saleType" size="medium" style="width: 100%" placeholder="请选择">
                <el-option :value="1">燃油车</el-option>
                <el-option :value="2">电动车</el-option>
                <el-option :value="3">混合车</el-option>
              </el-select>
            </div>
            <div class="col">
              <span>部门:</span>
              <el-select v-model="filter.department" size="medium" style="width: 100%" placeholder="请选择">
                <el-option value="东部">东部</el-option>
                <el-option value="西部">西部</el-option>
                <el-option value="南部">南部</el-option>
                <el-option value="北部">北部</el-option>
                <el-option value="中部">中部</el-option>
              </el-select>
            </div>
            <div class="col"></div>
          </div>
        </div>

        <div class="condition-box-r">
          <el-button type="primary" size="medium" @click="queryBtn">查询</el-button>
          <el-button size="medium" @click="onDeptInit">重置</el-button>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <el-button type="primary" size="medium" @click="newPage">新增</el-button>

    </div>

    <!-- 表格渲染 -->
    <div class="condition-box">
      <div class="content-title">会员列表</div>
      <el-tabs v-model="filter.status" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name=""></el-tab-pane>
        <el-tab-pane label="启用" name="1"></el-tab-pane>
        <el-tab-pane label="禁用" name="2"></el-tab-pane>
      </el-tabs>
      <div class="tabs-content">
        <el-table v-loading="ajaxContent.loading" :data="columnsData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column prop="serviceStandCode" label="服务站编码" width="180"></el-table-column>
          <el-table-column prop="serviceStandShortName" label="服务站简称" width="180"></el-table-column>
          <el-table-column prop="serviceStandName" label="服务站全称" width="180"></el-table-column>
          <el-table-column prop="department" label="部门" width="180"></el-table-column>
          <el-table-column prop="saleType" label="服务类型" width="180">
            <template slot-scope="scope">
              <p v-if="scope.row.saleType === 1">燃油车</p>
              <p v-if="scope.row.saleType === 2">电动车</p>
              <p v-if="scope.row.saleType === 2">混合车</p>
            </template>
          </el-table-column>
          <el-table-column prop="provinceName" label="所在省" width="180"></el-table-column>
          <el-table-column prop="cityName" label="所在市" width="180"></el-table-column>
          <el-table-column prop="address" label="详细地址" width="180"></el-table-column>
          <el-table-column prop="accuracy" label="精度" width="180"></el-table-column>
          <el-table-column prop="latitude" label="纬度" width="180"></el-table-column>
          <el-table-column prop="mobile" label="联系方式" width="180"></el-table-column>
          <el-table-column prop="status" label="当前状态" width="180">
            <template slot-scope="scope">
              <p v-if="scope.row.status === 1">启用</p>
              <p v-if="scope.row.status === 2">禁用</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="text" v-if="scope.row.status === 1" @click="showStatus(2, scope.row)">禁用</el-button>
              <el-button size="mini" type="text" v-if="scope.row.status === 2" @click="showStatus(1, scope.row)">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="batch-operate-container">
          <!-- <el-select
            size="small"
            style="float: left;margin-right: 20px;"
            v-model="operateType"
            placeholder="批量操作"
          >
            <el-option
              v-for="item in operates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            style="float: left"
            class="search-button"
            @click="handleBatchOperate()"
            type="primary"
            size="small"
          >确定</el-button> -->

          <pagination
            v-show="ajaxContent.totalCount>0"
            :total="ajaxContent.totalCount"
            :page.sync="filter.startPage"
            :limit.sync="filter.pageSize"
            @pagination="ajaxLists"
          />
        </div>
      </div>
    </div>

    <el-dialog
      :title="showDialogStatus === 1 ? '启用通知' : '禁用通知'"
      :visible.sync="statusrDialogVisible"
      width="30%">
      <span v-if="showDialogStatus === 1">您确认启用此服务站吗</span>
      <span v-if="showDialogStatus === 2">您确认禁用此服务站吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleStatus">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    

    <add-and-edit v-if="showPage" :queryId="queryId" :isEdit="isEdit" @closePage="closePageFunc" ></add-and-edit>

    <detail-page v-if="showDetail" :queryId="queryId" @closePage="closePageFunc" ></detail-page>

  </div>
</template>

<script type='text/ecmascript-6'>
import { serviceList, updateDisabled, updateEnabled } from "@/api/outlet.js";

import Pagination from "@/components/Pagination";
import addAndEdit from "./addAndEdit.vue"
import detailPage from "./detail.vue"

export default {
  components: {
    Pagination, addAndEdit, detailPage
  },
  data() {
    return {
      columnsData: [],
      ajaxContent: {
        totalCount: 0,
        loading: false
      },
      filter: {
        serviceStandCode: "",
        serviceStandShortName: "",
        serviceStandName: "",
        provinceCode: undefined,
        cityCode: undefined,
        time: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        saleType: undefined,
        department: undefined,
        status: "",
        startPage: 1,
        pageSize: 10
      },
      btnLoading: false,
      showDetail: false, // 是否显示详情
      queryUserId: "",
      operateType: null,
      operates: [{
        value: 0,
        label: '批量停用'
      }, {
        value: 1,
        label: '批量启用'
      }],
      statusrDialogVisible: false,
      activeName: 'first',
      showDialogStatus: 1,
      updateFunc: [null, updateEnabled, updateDisabled ],
      statusId: null,
      showPage: false,
      queryId: null,
      isEdit: false,
      showDetail: false,
      multipleSelection: null
    };
  },
  mounted() {
    this.ajaxContent.loading = false;
    this.ajaxLists();
  },
  methods: {
    newPage() {
      this.isEdit = false
      this.queryId = null
      this.showPage = true
    },
    changeDate(value, time) {
      this.filter.createTimeStart = value[0] + " 00:00:00"
      this.filter.createTimeEnd = value[1] + " 23:59:59"
    },
    handleClick(tab, event) {
        this.ajaxLists();
    },
    // 查询操作
    queryBtn() {
      this.filter.startPage = 1;
      this.ajaxLists();
    },
    // 重置操作
    onDeptInit() {
      this.filter = {
        serviceStandCode: "",
        serviceStandShortName: "",
        serviceStandName: "",
        provinceCode: undefined,
        cityCode: undefined,
        time: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        saleType: undefined,
        department: undefined,
        status: "",
        startPage: 1,
        pageSize: 10
      };
      this.ajaxLists();
    },
    handleSelectionChange(val) {
      debugger
      this.multipleSelection = val;
    },
    // 查询表单操作
    ajaxLists() {
      this.ajaxContent.loading = true;
      if (this.filter.status != 1 && this.filter.status != 2) {
        this.filter.status = null
      }
      serviceList(this.filter).then(res => {
        if (res.code === 200) {
          var res2 = res.result;
          this.columnsData = res2.list;
          this.filter.startPage = res2.pags;
          this.ajaxContent.totalCount = res2.total;
          this.ajaxContent.loading = false;
        }
      });
    },
    // 查看
    read(data) {
      this.showDetail = true;
      this.queryUserId = data.id;
    },
    showStatus(value, item) {
      this.showDialogStatus = value
      this.statusId = item.id
      this.statusrDialogVisible = true
    },
    handleStatus() {
      this.updateFunc[this.showDialogStatus]({id: this.statusId}).then(res => {
        if (res.code === 200) {
          this.statusrDialogVisible = false
          this.ajaxLists()
          this.$message({
            message: this.showDialogStatus === 1 ? '启用成功' : '禁用成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: this.showDialogStatus === 1 ? '启用成功' : '禁用成功',
            type: 'error'
          });
        }
      });
    },
    // 子组件触发关闭详情页
    closePageFunc() {
      this.showPage = false;
      this.showDetail = false;
      this.ajaxLists();
    },
    handleEdit(index, row) {
      this.isEdit = true
      this.queryId = row.id
      this.showPage = true
    },
    handleDetail(index, row) {
      this.isEdit = true
      this.queryId = row.id
      this.showDetail = true
    },
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.showDetail = false;
      }
    }
  }
};
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
.input-box {
  display: flex;
  padding-top: 20px;
  .col {
    flex: 1;
    display: flex;
    &:nth-child(2) {
      margin: 0 10px;
    }
    span {
      display: inline-block;
      min-width: 100px;
      padding-right: 10px;
      line-height: 32px;
      text-align: right;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #333;
    }
    .ant-select,
    .ant-calendar-picker,
    .ant-cascader-picker {
      width: 100%;
      text-align: left;
      padding: 0;
    }
  }
}

.tabs-content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .content-title {
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f8f8;
    margin-bottom: 20px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
  }
}

.batch-operate-container {
  display: inline-block;
  margin: 20px 0;
}

.btn-box {
  margin: 20px 20px;
  padding: 20px;
  background-color: #fff;
  button {
    margin-right: 10px;
  }
}
</style>
