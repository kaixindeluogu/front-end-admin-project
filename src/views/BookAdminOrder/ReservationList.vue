<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <!-- 数据表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="reservationTime" label="预约时间" width="200" align="center"></el-table-column>
      <el-table-column prop="status" label="预约状态" width="100" align="center"></el-table-column>
      <el-table-column prop="cancelReason" label="取消原因" header-align="center"
                       show-overflow-tooltip></el-table-column>

      <el-table-column prop="number" label="预约人数" width="100" align="center"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="100" align="center"></el-table-column>
      <el-table-column prop="bookId" label="书籍ID" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     @click="openEditDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <div style="margin: 10px 0;text-align: right;">
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
  data() {
    return {
      // 表格数据
      tableData: [
      ],
      // 分页相关数据
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 3,
      total: 0
    }
  },
  methods: {
    // 切换分页
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.ReservationList();
    },
    //修改弹出对话框

    //弹出删除确认框
    openDeleteConfirm(tableItem){
      let message='此操作将永久删除该预约信息, 是否继续?'
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
    handleDelete(tableItem){
      let url = 'http://localhost:9080/v1/admin/reservation/' + tableItem.id + '/delete';
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.loadTagList();
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


    ReservationList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9080/v1/admin/reservation/list?page=' + page;
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
    }
  },

    mounted() {
    this.ReservationList();
  }

}

</script>