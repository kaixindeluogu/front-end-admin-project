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
      <el-form-item label="书名">
        <el-input style="width: 200px"
                  placeholder="请输入书名" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input style="width: 200px"
                  placeholder="请输入作者名字" v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="图书馆ID">
        <el-input style="width: 200px"
                  placeholder="请输入图书馆ID" v-model="ruleForm.libraryId"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input style="width: 200px"
                  placeholder="请输入出版社" v-model="ruleForm.publisher"></el-input>
      </el-form-item>
<!--      <el-form-item label="类型">-->
<!--        <el-input style="width: 200px"-->
<!--                  placeholder="请输入书名" v-model="ruleForm.name"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item label="用户ID">
        <el-input style="width: 200px"
                  placeholder="请输入用户ID" v-model="ruleForm.libraryId"></el-input>
      </el-form-item>
      <el-form-item label="出版日期">
        <el-date-picker
            style="width: 200px"
            v-model="ruleForm.publishTime"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入库数量">
        <el-input style="width: 200px"
                  placeholder="请输入入库数量" v-model="ruleForm.storeAmount"></el-input>
      </el-form-item>

      <el-form-item label="详情介绍">
<!--        <el-input style="width: 200px"-->
<!--                  placeholder="请输入详情介绍" v-model="ruleForm.introduction"></el-input>-->
        <el-input
            style="width: 200px"
            type="textarea"
            :rows="3"
            placeholder="请输入详情介绍"
            v-model="ruleForm.introduction">
        </el-input>
      </el-form-item>



      <el-form-item label="状态">
        <el-input style="width: 200px"
                  placeholder="是否在库" v-model="ruleForm.status"></el-input>
      </el-form-item>

      <el-form-item label="上传图片">
        <el-upload v-model="ruleForm.cover"
                   action="http://localhost:9080/v1/admin/fileType"
                   name="file"
                   :limit=1
                   list-type="picture-card"
                   :on-success="handleSuccess"
                   :on-preview="handlePictureCardPreview"
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <br>
      <el-button @click="post()" style="margin: 20px" size="small" type="primary">点击上传</el-button>
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
      rules: {
        // name:'',                                        // '书名',
        // author:'',                                       //  '作者',
        // publisher:'',                                     //'出版社',
        // libraryId:'',                                       //'图书馆ID',
        // categoryId:'',                                     //'分类ID',
        // status:'',                                        //'状态(在库,借出)',
        // cover:'',                                         //'书籍封面',
        // publishTime:'',                             //'出版日期',
        // storeAmount:'',                                  //'库存数量',
        // introduction:'',                                //'详细介绍',
        // gmtCreate:''
      }
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
