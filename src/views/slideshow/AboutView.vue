<template>
  <div>
    <el-divider/>
    <el-form>
      <el-form-item label="文章标题">
        <el-input style="width: 200px"
                  placeholder="请输入标题" v-model="c.title"></el-input>
      </el-form-item>

      <el-form-item label="上传图片">
        <el-upload v-model="c.imgUrl"
                   action="http://localhost:9080/v1/admin/file/"
                   name="file"
                   :limit=1
                   list-type="picture-card" ,
                   :headers="uploadHeaders" ,
                   :on-success="handleSuccess" ,
                   :on-preview="handlePictureCardPreview" ,
                   :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="优先级">
        <el-select v-model="c.sort" placeholder="请选择优先级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
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
      uploadHeaders: {
        Authorization: localStorage.getItem('jwt'),
      },
      // 上传图片数据
      isEdit: false,
      c: {
        title: '',
        imgUrl: '',
        sort: ''
      }
    };
  },
  methods: {


    handleSuccess(response, file, fileList) {
      console.log(file);
      //把上传图片完成之后 得到的图片路径用变量记录
      console.log(response.data)
      this.c.imgUrl = response.data;

    },
    handleRemove(file, fileList) {
      //判断删除的是图片还是视频
      if (file.raw.type.includes("image")) {
        this.c.imgUrl = "";
      }
      //发出删除文件的请求   file.response上传成功时服务器响应的内容ResultVO
      console.log(file.response);
      axios.get("http://localhost:9080/v1/admin/file/remove?url=" + file.response.data).then(function () {
        console.log("服务器文件删除完成!");
      })
    },
    handlePictureCardPreview(file) {
      this.c.imgUrl = file.url;
      this.dialogVisible = true;
    },


    // 提交表单
    post() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post("http://localhost:9080/v1/admin/banner/upload", this.c).then((response) => {
        if (response.data.state == 20000) {
          this.$message.success("添加成功!");
          location.reload();
        } else {
          this.$message.error("发布失败,请重新发送!")
        }
      })
    }
  }
}
</script>
