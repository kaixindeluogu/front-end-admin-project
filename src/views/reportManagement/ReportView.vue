<template>
  <div>
    <h2>用户举报信息</h2>
    <el-divider/>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="gmtCreate" label="日期" width="150"></el-table-column>
      <el-table-column prop="id" label="举报信息id" width="120"></el-table-column>
      <el-table-column prop="userId" label="用户id" width="120"></el-table-column>
      <el-table-column prop="libraryId" label="图书馆id" width="120"></el-table-column>
      <el-table-column prop="bookId" label="书籍id" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="170">
        <template slot-scope="scope">
          <el-switch
              style="display: block"
              :v-model="selectedOption"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="已审批"
              inactive-text="未审批"
              disabled>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" @click="openEditDialog(scope.row)">查看</el-button>
          <el-button slot="reference" @click="openDeleteConfirm(scope.row)">删除</el-button>
          <el-button type="primary" @click="pass">通过</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="举报详情数据" :visible.sync="editFormVisible" :disabled="true">
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="editForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="书籍id" prop="bookId">
          <el-input v-model="editForm.bookId"></el-input>
        </el-form-item>
        <el-form-item label="图书馆id" prop="libraryId">
          <el-input v-model="editForm.libraryId"></el-input>
        </el-form-item>
        <el-form-item label="举报内容" prop="content">
          <el-input v-model="editForm.reportContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分页控件 -->
    <div style="margin: 10px 0; text-align: right;">
      <el-pagination
          @current-change="changePage"
          layout="total, prev, pager, next"
          :hide-on-single-page="true"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 弹出详情对话框
    openEditDialog(tableItem) {
      let url = 'http://localhost:9080/v1/admin/report/' + tableItem.id;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.editForm = jsonResult.data;
          this.editFormVisible = true;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadReportList();
            }
          });
        }
      });
    },
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadReportList();
    },
    pass() {
      let url = 'http://localhost:9080/v1/admin/report/' + this.editForm.id + '/pass';
      this.axios.post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '审批通过！',
            type: 'success'
          });
          this.selectedOption = 1;
          this.loadReportList();
        } else if (jsonResult.state == 40400) {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.editFormVisible = false;
              this.loadReportList();
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
    // 弹出删除确认框
    openDeleteConfirm(tableItem) {
      let message = '此操作将永久删除【' + tableItem.userId + '】信息，是否继续？';
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
      let url = 'http://localhost:9080/v1/admin/report/' + tableItem.id + '/delete';
      console.log('url = ' + url);

      this.axios.post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.loadReportList();
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
    loadReportList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9080/v1/admin/report/list?page=' + page;
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
    }
  },
  mounted() {
    this.loadReportList();
  },

  data() {
    return {
      selectedOption: 0,
      tableData: [],
      // 分页相关数据
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 20,
      total: 0,
      // 详情数据
      // 编辑对话框相关数据
      editFormVisible: false,
      editForm: {
        id: '',
        userId: '',
        bookId: '',
        libraryId: '',
        reportContent: '',
        status:'',
        gmtCreate: '',
      },
    }
  }
}
</script>

<style scoped>

</style>