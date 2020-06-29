<!--
 * @Author: wangxudong
 * @Email: wangxudong@foxgoing.com
 * @Date: 2020-05-14 17:36:39
 * @LastEditors: wangxudong
 * @LastEditTime: 2020-06-28 13:26:11
 * @Description: 上传组件
 -->

<template>
  <div>
    <el-upload
      class="avatar-uploader"
      list-type="picture-card"
      action=""
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      :http-request="handleChange"
      :file-list="oldFileList"
      :on-remove="removeChange"
    >
      <div>
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import { upload } from "@/api/outlet.js";

export default {
  name: "uploadImg",
  props: ["jndex", "brforeAfter", "oldImgUrl"],
  data() {
    return {
      filters: {},
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      shopImgList: [],
      oldFileList: []
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.oldImgUrl) {
        this.oldImgUrl.forEach(element => {
          this.oldFileList.push({
            name: "image.jpg",
            url: element
          });
        });
      }
    }, 500);
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      if (!isJPG) {
        this.$message.error("图标格式只能是.png .jpg .gif!");
      }
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("图标大小不超过1MB!");
      }
      if (this.fileList && this.fileList.length === 3) {
        this.$message.error("最多可上传3张图片!");
        return false
      }
      return isJPG && isLt2M;
    },
    handleChange(info) {
      console.log(info);
      console.log(this.jndex);
      console.log(this.brforeAfter);
      if (this.uploadImg === []) {
        return false;
      }
      upload(info).then(res => {
        if (res.code === 200) {
          this.filters.imgUrl = res.url;
          this.fileList.push({
            uid: 1,
            name: "image.jpg",
            status: "done",
            url: this.filters.imgUrl,
            thumbUrl: this.filters.imgUrl
          });
          console.log(this.fileList);
          
          this.shopImgList = []
          for (var i=0;i<this.fileList.length;i++)
          { 
              this.shopImgList.push(this.fileList[i].url)
          }
          this.$emit(
            "getUploadImg",
            this.shopImgList,
            this.jndex,
            this.brforeAfter
          );
        }
      });
    },
    removeChange(file, fileLIst) {
      this.shopImgList = []
      fileLIst.forEach(item => {
        this.shopImgList.push([
          item.url
        ])
      });
      this.$emit("getUploadImg", this.shopImgList, this.jndex, this.brforeAfter);
    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
