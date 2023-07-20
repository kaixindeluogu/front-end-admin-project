<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-promotion"></i> 后台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bookadmin/CategoryList' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: './CategoryList' }">一级类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增标签类别</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="left"></el-divider>

    <!-- 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="一级类别名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="warning" @click="gotoList">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单
      ruleForm: {
        name: '测试类别名称X',
        sort: '99',
      },
      // 表单规则
      rules: {
        name: [
          {required: true, message: '请输入一级类别名称', trigger: 'blur'},
          {pattern: /^[a-zA-Z\u4e00-\u9fa5]{2,10}$/, message: '一级类别必须是2~10长度的字符组成，且不允许使用标点符号', trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入排序序号', trigger: 'blur'},
          {pattern: /^(\d{1}|[1-9]{1}[0-9]{1})$/, message: '排序序号必须是0~99之间的值', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 返回列表
    gotoList() {
      this.$router.push('/bookadmin/CategoryList');
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/admin/categories/add-new';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios.post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '新增标签类别成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              let title = '操作失败';
              this.$alert(jsonResult.message, title, {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          }).catch(error => {
            let title = '错误';
            let message = '程序执行过程中出现错误，请打开浏览器的控制台查看详细错误信息！';
            this.$alert(message, title, {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            console.log(error);
          });
        } else {
          console.log('请求参数格式错误！');
          return false;
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

<style>
</style>