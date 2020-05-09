<!--
 * @Author: your name
 * @Date: 2020-05-08 14:25:51
 * @LastEditTime: 2020-05-09 11:18:18
 * @LastEditors: wangxudong
 * @Description: In User Settings Edit
 * @FilePath: /admin-back/src/views/table/detail.vue
 -->
<template>
  <div class="box">
    <div class="big-title">
      <div class="title-o">会员信息管理</div>
      <div class="title-t">会员信息管理作为会员服务系统中的基础会员服务模块，您可以在会员信息管理中查询该会员的详细基础信息和大量的会员行为信息</div>
    </div>
    <div class="condition-box">
      <div class="content-title">用户信息检索</div>

      <div class="condition-box-l">
        <div class="condition-box-f">
          <div class="input-box">
            <div class="col">
              <span>会员昵称:</span>
              <el-input placeholder="请输入" v-model="filter.nickName"></el-input>
            </div>
            <div class="col">
              <span>会员姓名:</span>
              <el-input placeholder="请输入" v-model="filter.mobile"></el-input>
            </div>
            <div class="col">
              <span>登录账号:</span>
              <el-input placeholder="请输入" v-model="filter.realName"></el-input>
            </div>
          </div>
          <div class="input-box">
            <div class="col">
              <span>会员编号:</span>
              <el-input placeholder="请输入" v-model="filter.account"></el-input>
            </div>
            <div class="col">
              <span>会员类型:</span>
              <el-select v-model="filter.authorStatus" style="width: 100%" placeholder="请选择">
                <el-option :value="0">未认证</el-option>
                <el-option :value="1">已认证</el-option>
              </el-select>
            </div>
            <div class="col">
              <span>会员等级:</span>
              <el-select v-model="filter.authorStatus" style="width: 100%" placeholder="请选择">
                <el-option :value="0">未认证</el-option>
                <el-option :value="1">已认证</el-option>
              </el-select>
            </div>
          </div>
          <div class="input-box">
            <div class="col">
              <span>注册渠道:</span>
              <el-select v-model="filter.authorStatus" style="width: 100%" placeholder="请选择">
                <el-option :value="0">未认证</el-option>
                <el-option :value="1">已认证</el-option>
              </el-select>
            </div>
            <div class="col">
              <span>注册时间:</span>
              <el-date-picker
                v-model="filter.registerStartTime"
                style="width: 100%"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="col"></div>
          </div>
        </div>

        <div class="condition-box-r">
          <el-button type="primary" @click="queryBtn">查询</el-button>
          <el-button @click="onDeptInit">重置</el-button>
        </div>
      </div>
    </div>

    <!-- 表格渲染 -->
    <div class="condition-box">
      <div class="content-title">会员列表</div>
      <div class="tabs-content">
        <el-table v-loading="ajaxContent.loading" :data="columnsData">
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column prop="nickName" label="用户昵称" width="180"></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="180"></el-table-column>
          <el-table-column prop="realName" label="用户姓名"></el-table-column>
          <el-table-column prop="gender" label="用户性别">
            <template slot-scope="scope">
              <p v-if="scope.row.gender === 1">男</p>
              <p v-if="scope.row.gender === 2">女</p>
            </template>
          </el-table-column>
          <el-table-column prop="provinceName" label="所属城市"></el-table-column>
          <el-table-column prop="authorStatus" label="认证状态">
            <template slot-scope="scope">
              <p v-if="scope.row.authorStatus === 0">未认证</p>
              <p v-if="scope.row.genauthorStatusder === 1">已认证</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间"></el-table-column>
          <el-table-column prop="authorStatus" label="用户状态">
            <template slot-scope="scope">
              <p v-if="scope.row.status === 0">非注册平台</p>
              <p v-if="scope.row.status === 1">注册平台</p>
            </template>
          </el-table-column>
          <el-table-column prop="authorStatus" label="会员状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
              <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="batch-operate-container">
          <el-select size="small" style="float: left;margin-right: 20px;" v-model="operateType" placeholder="批量操作">
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
          >确定</el-button>

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
  </div>
</template>

<script type='text/ecmascript-6'>
import { userinfoList } from "@/api/userinfoManage.js";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      columnsData: [],
      columns: [
        {
          title: "用户昵称",
          dataIndex: "nickName"
        },
        {
          title: "手机号码",
          dataIndex: "mobile"
        },
        {
          title: "用户姓名",
          dataIndex: "realName"
        },
        {
          title: "用户性别",
          dataIndex: "gender",
          scopedSlots: { customRender: "gender" }
        },
        {
          title: "所属城市",
          dataIndex: "provinceName",
          scopedSlots: { customRender: "provinceName" }
        },
        {
          title: "认证状态",
          dataIndex: "authorStatus",
          scopedSlots: { customRender: "authorStatus" }
        },
        {
          title: "注册时间",
          dataIndex: "createTime"
        },
        /* {
          title: "持有积分",
          dataIndex: "score"
        }, */
        {
          title: "用户状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          key: "39",
          width: 100,
          fixed: "right",
          align: "center",
          scopedSlots: { customRender: "opreation" }
        }
      ],
      ajaxContent: {
        totalCount: 0,
        loading: false
      },
      filter: {
        mobile: "",
        store: "",
        registerStartTime: "",
        registerEndTime: "",
        score: "",
        memberLevel: undefined,
        authorStatus: undefined,
        account: "",
        realName: "",
        nickName: "",
        startPage: 1,
        pageSize: 10
      },
      timeValue: "",
      btnLoading: false,
      showDetail: false, // 是否显示详情
      queryUserId: "",
      ajaxList: {
        msg: "OK",
        code: 200,
        userList: {
          list: [
            {
              account: "13146098122",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 1,
              headImgUrl: "",
              id: 1,
              memberLevel: 1,
              mobile: "13146098122",
              nickName: "KRY11766",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 20,
              status: 0,
              updateTime: "2020-03-25 13:27:15",
              userIdStr: ""
            },
            {
              account: "18500061657",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 2,
              headImgUrl: "",
              id: 2,
              memberLevel: 2,
              mobile: "18500061657",
              nickName: "毛线",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 34,
              status: 0,
              updateTime: "2020-03-30 10:27:53",
              userIdStr: ""
            },
            {
              account: "13521799899",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 1,
              headImgUrl: "",
              id: 3,
              memberLevel: 3,
              mobile: "13521799899",
              nickName: "逃离地球8",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 20,
              status: 0,
              updateTime: "2020-03-30 10:27:51",
              userIdStr: ""
            },
            {
              account: "15010376858",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 2,
              headImgUrl: "",
              id: 4,
              memberLevel: 4,
              mobile: "15010376858",
              nickName: "二哥",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 20,
              status: 0,
              updateTime: "2020-03-30 10:28:00",
              userIdStr: ""
            },
            {
              account: "15010376812",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 1,
              headImgUrl: "",
              id: 5,
              memberLevel: 4,
              mobile: "15010376812",
              nickName: "test",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 20,
              status: 0,
              updateTime: "2020-03-30 10:25:23",
              userIdStr: ""
            },
            {
              account: "13791765853",
              address: "电影学院",
              areaId: 1001,
              areaName: "学院里",
              authorStatus: 0,
              birthDay: "2020-02-12",
              cityId: 100,
              cityName: "海淀",
              createTime: "2020-02-19 19:31:47",
              gender: 1,
              headImgUrl: "",
              id: 6,
              memberLevel: 1,
              mobile: "13791765853",
              nickName: "王代春",
              openid: "qq_12331",
              password: "",
              platForm: 1,
              platNo: 1,
              provinceId: 1,
              provinceName: "北京",
              realName: "码云",
              registerFlag: 0,
              score: 12,
              status: 0,
              updateTime: "2020-03-30 10:26:39",
              userIdStr: ""
            }
          ],
          page: 1,
          pages: 1,
          totalRows: 6
        }
      }
    };
  },
  mounted() {
    var res2 = this.ajaxList.userList;
    this.columnsData = res2.list;
    this.filter.startPage = res2.page;
    this.ajaxContent.totalCount = res2.totalRows;
    this.ajaxContent.loading = false;
  },
  methods: {
    // from表单操作
    openChange(data, status) {
      if (status.length > 0) {
        if (status[0] !== "") {
          this.filter.registerStartTime = status[0] + " 00:00:00";
        } else {
          this.filter.registerStartTime = "";
        }
        if (status[1] !== "") {
          this.filter.registerEndTime = status[1] + " 23:59:59";
        } else {
          this.filter.registerEndTime = "";
        }
      }
    },
    // 查询操作
    queryBtn() {
      this.filter.startPage = 1;
      this.ajaxLists();
    },
    // 重置操作
    onDeptInit() {
      this.filter = {
        mobile: "",
        store: "",
        registerStartTime: "",
        registerEndTime: "",
        score: "",
        memberLevel: undefined,
        authorStatus: undefined,
        account: "",
        realName: "",
        nickName: "",
        startPage: 1,
        pageSize: 10
      };
      this.timeValue = "";
      this.ajaxLists();
    },
    opera() {},
    // 查询表单操作
    ajaxLists() {
      this.ajaxContent.loading = true;
      userinfoList(this.filter).then(res => {
        if (res.data.code === 200) {
          var res2 = res.data.userList;
          this.columnsData = res2.list;
          this.filter.startPage = res2.page;
          this.ajaxContent.totalCount = res2.totalRows;
          this.ajaxContent.loading = false;
        }
      });
    },
    onChange(page, size) {
      this.filter.startPage = page;
      this.ajaxLists();
    },
    onShowSizeChange(page, size) {
      this.filter.startPage = page;
      this.filter.pageSize = size;
      this.ajaxLists();
    },
    // 查看
    read(data) {
      this.showDetail = true;
      this.queryUserId = data.id;
    },
    // 子组件触发关闭详情页
    closePageFunc() {
      this.showDetail = false;
    }
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
</style>
