<template>
  <div class="account">
    <h1 style="color: black">个人账户管理</h1>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" ></el-table-column>
      <el-table-column prop="userName" label="用户名" ></el-table-column>
      <el-table-column prop="nickName" label="昵称" ></el-table-column>
      <el-table-column prop="authority" label="权限管理" width="145">
        <template slot-scope="scope">
          <el-select  @change="toggleEnable(scope.row)" v-model="scope.row.admin">
            <el-option label="用户"        :value="0"></el-option>
            <el-option label="作家"       :value="1"></el-option>
            <el-option label="管理员"        :value="2"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"  @click="openEditDialog(scope.row)">编 辑</el-button>
          <el-button size="mini" type="danger" @click="openDeleteConfirm(scope.row)">删 除</el-button>
        </template>

      </el-table-column>
    </el-table>

<!--修改数据的表单 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px">
        <el-form-item prop="userName" label="用户名" >
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="昵称" >
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick()">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
export default {
  data() {
    return {

      value2: 0,
      // 编辑对话框相关数据
      dialogFormVisible: false,
      form: {
        id:'',
        userName:'',
        nickName:'',
      },
      // 分页相关数据
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 20,
      total: 0,

      tableData: [],
    }
  },
  methods: {
    // 弹出修改对话框
    openEditDialog(tableItem){
      let url = 'http://localhost:9080/content/users/'+ tableItem.id;
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.form = jsonResult.data;
          this.dialogFormVisible = true;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadUserList();
            }
          });
        }
      });
    },
    // 执行修改
    handleClick() {
      let url = 'http://localhost:9080/content/users/' + this.form.id + '/update/info';
      console.log('url = ' + url);
      let formData = this.qs.stringify(this.form);
      console.log('formData = ' + formData);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url, formData).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '修改权限成功！',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.loadUserList();
        } else if (jsonResult.state == 40400) {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false;
              this.loadUserList();
            }
          });
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      });
    },
    // 加载标签列表
    loadUserList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9080/content/users?page=' + page;
      console.log('url = ' + url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.tableData = jsonResult.data.list;
          this.currentPage = jsonResult.data.currentPage;
          this.pageSize = jsonResult.data.pageSize;
          this.total = jsonResult.data.total;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {

            }
          });
        }
      });
    },
    // 弹出删除确认框
    openDeleteConfirm(tableItem){
        let message = '此操作将永久删除用户名为【' + tableItem.userName + '】的用户，是否继续？';

        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(tableItem);
        }).catch(() => {
        });
      },
    //执行删除
    handleDelete(tableItem) {
      let url = 'http://localhost:9080/content/users/' + tableItem.id + '/delete';
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除标签成功！',
            type: 'success'
          });
          this.loadUserList();
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }
      });
    },
    //修改权限
    toggleEnable(item) {
      alert("你将修改此用户的权限.");
      let enableText = ['用户','作家' , '管理员'];
      let url = 'http://localhost:9080/content/users/'+item.id
      if (item.admin === 0){
        url += '/enable'
      }else if (item.admin === 1){
        url += '/disable'
      }else {
        url += '/Admin'
      }

      console.log('url = '+url);
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response)=>{
        let jsonResult = response.data;
        if (jsonResult.state == 20000){
          this.$message({
            message:enableText[item.admin] + '权限成功!',
            type: 'success'
          });
        }else {
          let title = '操作失败';
          this.$alert(jsonResult.message,title,{
            confirmButtonText: ' 确定',
            callback: action => {
              if (jsonResult.state == 40400){
                this.loadUserList();
              }
            }
          });
        }
      });
    },

  },


  mounted() {
    this.loadUserList();
  }
}
</script>
<style>

</style>



