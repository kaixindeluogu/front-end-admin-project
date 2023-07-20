<template>
  <div>


    <!-- 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="图书馆名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="图书馆地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="借阅规则" prop="rule">
        <el-input v-model="ruleForm.rule"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        name: '',
        address: '',
        rule: ''
      },
      // 表单规则
      rules: {
        name: [
          {required: true, message: '请输入图书馆名称', trigger: 'blur'},
          {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '图书馆名称必须是2~10长度的字符组成，且不允许使用英文和特殊符号', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入图书馆地址', trigger: 'blur'},
          {pattern: /^[\u4e00-\u9fa5]{2,10}/, message: '图书馆地址必须是2~10长度的字符组成，且不允许使用英文和特殊符号', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080//v1/admin/library/add-new';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
              .post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '新增图书馆成功！',
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
          });
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