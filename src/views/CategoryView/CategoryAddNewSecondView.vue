<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-promotion"></i> 后台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bookadmin/CategoryList' }">类别管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: './CategoryListSecond' }">二级类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增标签</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="一级类别" prop="typeId">
        <el-select v-model="ruleForm.parentName" placeholder="请选择">
          <el-option
              v-for="item in CategoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级类别名称" prop="name">
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
      // 标签类别的下拉菜单的选择列表
      CategoryOptions: [],
      // 表单
      ruleForm: {
        parentName: '男生',
        name: '测试二级类别X',
        sort: '99',
      },
      // 表单规则
      rules: {
        parentId: [
          {required: true, message: '请选择一级类别', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入二级类别名称', trigger: 'blur'},
          {pattern: /^[a-zA-Z\u4e00-\u9fa5]{2,10}$/, message: '二级类别必须是2~10长度的字符组成，且不允许使用标点符号', trigger: 'blur'}
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
      this.$router.push('/bookadmin/CategoryListSecond');
    },
    // 加载标签类别列表
    loadCategoryList() {
      let url = 'http://localhost:9080/admin/categories/list?queryType=all';
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.CategoryOptions = jsonResult.data.list;
          if (this.CategoryOptions && this.CategoryOptions[0]) {
            this.ruleForm.parentId = this.CategoryOptions[0].id;
          }
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
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:9080/admin/categories/add-new/second';
          console.log('url = ' + url);
          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios
              .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
              .post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '新增标签成功！',
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
  },
  mounted() {
    this.loadCategoryList();
  }
}
</script>

<style>
</style>