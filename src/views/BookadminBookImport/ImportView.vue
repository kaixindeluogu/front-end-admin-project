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
          <el-form-item label="图书馆ID">
            <el-input style="width: 100%" placeholder="请输入图书馆ID" v-model="ruleForm.libraryId"></el-input>
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
          <el-form-item label="用户ID">
            <el-input style="width: 100%" placeholder="请输入用户ID" v-model="ruleForm.userId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出版日期">
            <el-date-picker style="width: 100%" v-model="ruleForm.publishTime" type="date" placeholder="选择日期"></el-date-picker>
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
            <el-input type="textarea" :rows="3" style="width: 100%" placeholder="请输入详情介绍" v-model="ruleForm.introduction"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="container">
        <el-upload
            style="margin-left: 118px;"
            v-model="ruleForm.cover"
            drag
            action="http://localhost:9080/v1/admin/fileType"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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

      // 表单
      ruleForm: {
        name:'姜炜',                                        // '书名',
        author:'崔傲',                                       //  '作者',
        userId:'1',                                         // 用户ID
        publisher:'天瑞城',                                     //'出版社',
        libraryId:'1',                                       //'图书馆ID',
        categoryId:'1',                                     //'分类ID',
        status:'在库',                                        //'状态(在库,借出)',
        cover:'',                                         //'书籍封面',
        publishTime:'',                             //'出版日期',
        storeAmount:'1',                                  //'库存数量',
        introduction:'240斤大胖子 真好啊 白胖白胖的',                                //'详细介绍',
        gmtCreate:''                           //'数据创建时间',
      },
      // 表单规则
      // rules: {
      //   name: [
      //     {required: true, message: '请输入书名', trigger: 'blur'},
      //     {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '不允许使用英文和特殊符号', trigger: 'blur'}
      //   ],
      //   cover: [
      //     {required: true, message: '请上传图书封面', trigger: 'blur'},
      //     {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '图书封面不能为空!', trigger: 'blur'}
      //   ],
      //   author: [
      //     {required: true, message: '请输入作者名', trigger: 'blur'},
      //     {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '不允许使用特殊符号', trigger: 'blur'}
      //   ],
      //   libraryId: [
      //     {required: true, message: '请输入图书馆名称', trigger: 'blur'},
      //     {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '不允许使用特殊符号', trigger: 'blur'}
      //   ],
      //   // author:'',                                       //  '作者',
      //   publisher:'',                                     //'出版社',
      //   // libraryId:'',                                       //'图书馆ID',
      //   categoryId:'',                                     //'分类ID',
      //   status:'',                                        //'状态(在库,借出)',
      //   // cover:'',                                         //'书籍封面',
      //   publishTime:'',                             //'出版日期',
      //   storeAmount:'',                                  //'库存数量',
      //   introduction:'',                                //'详细介绍',
      //   gmtCreate:'',                                   // 创建时间
      // }
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(file);
      //把上传图片完成之后 得到的图片路径用变量记录
      console.log(response.data)
      this.ruleForm.cover = response.data;

    },
    handleRemove(file, fileList) {
      //判断删除的是图片还是视频
      if (file.raw.type.includes("image")) {
        this.ruleForm.cover = "";
      }
      //发出删除文件的请求   file.response上传成功时服务器响应的内容ResultVO
      console.log(file.response);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get("http://localhost:9080/v1/admin/fileType/removeType?url=" + file.response.data).then(function () {
        console.log("服务器文件删除完成!");
      })
    },
    handlePictureCardPreview(file) {
      this.ruleForm.cover = file.url;
      this.dialogVisible = true;
    },


    // 提交表单
    post() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post("http://localhost:9080/v1/admin/books/uploadType", this.ruleForm).then((response) => {
        if (response.data.state == 20000) {
          this.$message.success("添加成功!");
          location.reload();
        } else {
          this.$message.error("导入失败,请重新导入!")
        }
      })
    }

}}
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
