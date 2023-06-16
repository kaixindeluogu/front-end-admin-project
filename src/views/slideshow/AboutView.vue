<template>
  <div>
    <el-divider/>
    <el-form>
      <el-form-item label="文章标题">
        <el-input style="width: 200px"
                  placeholder="请输入标题"></el-input>
      </el-form-item>
      <img v-if="isEdit" :src="oldImgUrl"
           style="width: 145px;height: 145px;">
      <el-form-item label="上传图片">
        <el-upload
            action="/v1/upload"
            name="file"
            limit="1"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="优先级">
        <el-select v-model="priority" placeholder="请选择优先级">
          <el-option label="高" value="high"></el-option>
          <el-option label="中" value="medium"></el-option>
          <el-option label="低" value="low"></el-option>
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
      // 上传图片数据
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
      if (file.raw.type.includes("image")) {
        //把上传图片完成之后 得到的图片路径用变量记录
        this.c.imgUrl = response.data;
      }
    },
    handleRemove(file, fileList) {
      //判断删除的是图片还是视频
      if (file.raw.type.includes("image")) {
        this.c.imgUrl = "";
      }
      //发出删除文件的请求   file.response上传成功时服务器响应的内容ResultVO
      console.log(file.response);
      axios.get("/v1/upload/remove?url=" + file.response.data).then(function () {
        console.log("服务器文件删除完成!");
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 提交表单
    post(c) {
      this.$refs[c].validate((valid) => {
        if (valid) {
          axios.post("/v1/contents/add-new", v.c).then((response) => {
            if (response.data.code == 1) {
              v.$message.success("发布完成!");
              location.href = "/articleManagement.html";
            }
          })
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
