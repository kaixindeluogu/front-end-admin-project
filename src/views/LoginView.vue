<template>
  <div class="about">
    <h1>登录页面</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="登录" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>

      <el-form-item label="注册" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        password:''

      },
      rules: {
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:8080/v1/users/login';

          this.axios.post(url, this.ruleForm).then((response) => {
            if (response.data.code == 1) {
              this.$message({
                message: '登陆成功',
                type:'success'
              })
            } else {
              this.$message.error(response.data.msg);
            }
          });


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
