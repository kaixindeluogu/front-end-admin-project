<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="借阅期限" prop="borrowPeriod">
        <el-input v-model="ruleForm.borrowPeriod"></el-input>
      </el-form-item>
      <el-form-item label="最大借书量" prop="borrowLimit">
        <el-input v-model="ruleForm.borrowLimit"></el-input>
      </el-form-item>
      <el-form-item label="借阅规则" prop="borrowRule">
        <el-input type="textarea" v-model="ruleForm.borrowRule"></el-input>
      </el-form-item>
      <el-form-item label="逾期罚款规则" prop="overdueFineRule">
        <el-input v-model="ruleForm.overdueFineRule"></el-input>
      </el-form-item>
      <el-form-item label="丢失或损坏规则" prop="lostDamageRule">
        <el-input v-model="ruleForm.lostDamageRule"></el-input>
      </el-form-item>
      <el-form-item label="图书馆编号" prop="libraryId">
        <el-input v-model="ruleForm.libraryId"></el-input>
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
        borrowPeriod: '',
        borrowLimit: '',
        borrowRule: '',
        overdueFineRule:'',
        lostDamageRule:'',
        libraryId: ''
      },
      // 表单规则
      rules: {
        borrowPeriod: [
          {required: true, message: '请输入借阅期限', trigger: 'blur'},
        ],
        borrowLimit: [
          {required: true, message: '请输入最大借书量', trigger: 'blur'},
        ],
        borrowRule: [
          {required: true, message: '请输入借阅规则', trigger: 'blur'}
        ],
        overdueFineRule: [
          {required: true, message: '请输入逾期罚款规则', trigger: 'blur'},
        ],
        lostDamageRule: [
          {required: true, message: '请输入丢失或损坏规则', trigger: 'blur'},
        ],
        libraryId: [
          {required: true, message: '请输入图书馆编号', trigger: 'blur'},
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/library/admin/rules/add-new';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios.post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '规则导入成功！',
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

<style scoped>

</style>