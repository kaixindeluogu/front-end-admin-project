<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="libraryId" label="图书馆id" width="120"></el-table-column>
      <el-table-column prop="borrowPeriod" label="借阅期限" width="120"></el-table-column>
      <el-table-column prop="borrowLimit" label="最大借书量" width="120"></el-table-column>
      <el-table-column prop="overdueFineRule" label="逾期罚款规则" width="120"></el-table-column>
      <el-table-column prop="lostDamageRule" label="丢失或损坏规则" width="120"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" @click="openEditDialog(scope.row)">详情</el-button>
          <el-button slot="reference" @click="openDeleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="借阅规则" :visible.sync="editFormVisible">
      <el-form :model="ruleForm" label-width="120px">
        <el-form-item label="借阅规则" prop="borrowRule">
          <el-input v-model="ruleForm.borrowRule"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">修改</el-button>
        <el-button @click="editFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ruleForm: {
        borrowRule: '',
      },
      editFormVisible: false,

      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 20,
      total: 0,
    }
  },
  methods: {
    openDeleteConfirm(tableItem) {
      let message = '此操作将永久删除【' + tableItem.libraryId + '】信息，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(tableItem);
      }).catch(() => {
      });
    },
    //删除
    handleDelete(tableItem) {
      let url = 'http://localhost:9080/library/admin/rules/' + tableItem.id + '/delete';
      console.log('url = ' + url);

      this.axios.post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.loadRuleList();
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
    loadRuleList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9080/library/admin/rules/list?page=' + page;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
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
    openEditDialog(tableItem) {
      let url = 'http://localhost:9080/library/admin/rules/' + tableItem.id;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.ruleForm = jsonResult.data;
          this.editFormVisible = true;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadRuleList();
            }
          });
        }
      });
    },
  },
  mounted() {
    this.loadRuleList();
  }
}
</script>

<style scoped>

</style>