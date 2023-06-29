<template>
  <div>
    <div class="about">
      <div>
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
                    <el-table-column
                        label="id" prop="id"></el-table-column>
          <el-table-column
              label="图书馆名" prop="name"></el-table-column>
          <el-input v-model="editForm.name"></el-input>
          <el-table-column
              label="总借阅量" prop="borrowingVolume"></el-table-column>
          <el-input v-model="editForm.borrowingVolume"></el-input>
          <el-table-column
              label="总用户数量" prop="userId"></el-table-column>
          <el-input v-model="editForm.userId"></el-input>
          <el-table-column
              label="图书馆地址" prop="address"></el-table-column>
          <el-input v-model="editForm.address"></el-input>
          <el-table-column
              label="总书籍数量" prop="storeAmount"></el-table-column>
          <el-input v-model="editForm.storeAmount"></el-input>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/></template>
<!--            <template slot-scope="scope">-->
<!--              <el-button size="mini" type="danger" @click="openDeleteConfirm(scope.row)">删除</el-button>-->
<!--            </template>-->
          </el-table-column>
        </el-table>

      </div>
    </div>

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
    handleEdit(){
      this.value = 1;
    },
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadReportList();
    },
    openDeleteConfirm(tableItem) {
      let message = '把他永久删除 , 你确定？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(tableItem);
      }).catch(() => {
      });
    },
    handleDelete(tableItem) {
      let url = 'http://localhost:9080/v1/admin/dataStatistics/' + tableItem.id + '/delete';
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

      let url = 'http://localhost:9080/v1/admin/dataStatistics/list/select/Type?page=' + page;
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
      value: 0,
      tableData: [],
      search:'',
      // 分页相关数据
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 20,
      total: 0,
      // 详情数据
      // 编辑对话框相关数据
      editForm: {
        Id:'',
        name:'',
        borrowingVolume: '',
        address:'',
        userId:'',
        storeAmount :'',

      },
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1970px) {
  .idxs {
    margin: 60px auto;
    width: calc(100% - 290px);
    max-width: 1570px;
    min-width: 1200px;
  }
}

@media screen and (max-width: 1969px) {
  .idxs {
    /*width: 1270px;*/
    /*min-width: 1000px;*/
    /*margin-top: 60px;*/
    /*margin-left: 270px;*/
    /*padding: 40px;*/
    width: calc(100% - 290px);
    max-width: 1570px;
    min-width: 1200px;
    margin: 60px auto;
  }

  .idxs {
    margin-left: 50px;
  }
}

</style>