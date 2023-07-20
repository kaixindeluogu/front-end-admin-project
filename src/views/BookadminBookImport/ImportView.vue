<template>
  <div>
    <!-- 顶部面包屑标识与导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion">后台管理</i>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加类别</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="书名">
            <el-input style="width: 100%" placeholder="请输入书名" v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者">
            <el-input style="width: 100%" placeholder="请输入作者名字" v-model="ruleForm.author"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出版日期">
            <el-date-picker style="width: 100%" v-model="ruleForm.publishTime" type="date"
                            placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出版社">
            <el-input style="width: 100%" placeholder="请输入出版社" v-model="ruleForm.publisher"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="入库数量">
            <el-input style="width: 100%" placeholder="请输入入库数量" v-model="ruleForm.storeAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-input style="width: 100%" placeholder="是否在库" v-model="ruleForm.status"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="详情介绍">
            <el-input type="textarea" :rows="3" style="width: 100%" placeholder="请输入详情介绍"
                      v-model="ruleForm.introduction"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="container">
        <el-upload
            style="margin-left: 118px;"
            v-model="ruleForm.cover"
            drag
            action="http://localhost:9080/v1/admin/file/"
            :headers="uploadHeaders"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将封面图片和PDF文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button @click="post()" class="upload-button" size="small" type="primary">点击上传</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadHeaders: {
        Authorization: localStorage.getItem('jwt'),
      },
      // 表单
      ruleForm: {
        name: '姜炜',                                        // '书名',
        author: '崔傲',                                       //  '作者',
        userId: '1',                                         // 用户ID
        libraryId: '',
        publisher: '天瑞城',                                     //'出版社',
        categoryId: '1',                                     //'分类ID',
        status: '在库',                                        //'状态(在库,借出)',
        cover: '',                                         //'书籍封面',
        publishTime: '',                             //'出版日期',
        storeAmount: '1',                                  //'库存数量',
        introduction: '240斤大胖子 真好啊 白胖白胖的',                                //'详细介绍',
        gmtCreate: '',                           //'数据创建时间',
        pdfUrl: ''  //上传的PDF路径
      },
      // 表单规则
      rules: {}
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      // console.log(file);
      // //把上传图片完成之后 得到的图片路径用变量记录
      //
      // console.log(response.data)
      // this.ruleForm.cover = response.data;
      console.log(file);
      const extension = file.name.split('.').pop().toLowerCase();

      // 判断文件类型
      if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif') {
        // 文件是图片
        console.log('文件是图片');
        this.ruleForm.cover = response.data;
        console.log(this.ruleForm.cover)
      } else if (extension === 'pdf') {
        // 文件是PDF
        console.log('文件是PDF');
        this.ruleForm.pdfUrl = response.data;
        console.log(this.ruleForm.pdfUrl)
      } else {
        // 其他文件类型
        console.log('文件类型未知');
        this.$message.error("请上传图片和PDF文件!")
      }

    },

    handleRemove(file, fileList) {
      //判断删除的是图片还是视频
      if (file.raw.type.includes("image")) {
        this.ruleForm.url = "";
      }
      //发出删除文件的请求   file.response上传成功时服务器响应的内容ResultVO
      console.log(file.response);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get("http://localhost:9080/v1/admin/file/remove?url=" + file.response.data).then(function () {
        console.log("服务器文件删除完成!");
      })
    },
    handlePictureCardPreview(file) {
      this.ruleForm.cover = file.url;
      this.dialogVisible = true;
    },


    // 提交表单
    post() {
      // this.ruleForm.libraryId = localStorage.getItem('id')
      let url = 'http://localhost:9080/v1/admin/books/uploadType';
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url, this.ruleForm, this.ruleForm.libraryId = localStorage.getItem('id'))  // 将 this.ruleForm 作为请求的数据进行传递
          .then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message.success("添加成功!");
              location.reload();
            } else {
              let title = '操作失败';
              this.$alert(jsonResult.message, title, {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          });
    }
  }
}


</script>
<style>
.container {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  margin-bottom: 20px; /* 为容器底部添加一定的间距 */
}

/*.upload-component {*/
/*  margin-right: 100px; !* 将上传组件与右侧的按钮保持一定的间距 *!*/
/*}*/

.upload-button {
  margin-left: 118px; /* 根据您的需求进行左侧间距调整 */
  margin-right: 1500px; /* 根据您的需求进行右侧间距调整 */
}
</style>
