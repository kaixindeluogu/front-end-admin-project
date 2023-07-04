<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <!--      <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>-->
      <!--      <el-breadcrumb-item>内容信息管理</el-breadcrumb-item>-->
      <!--      <el-breadcrumb-item>书籍信息管理</el-breadcrumb-item>-->
      <el-breadcrumb-item>书籍信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <hr>
    <br>
    <el-table
        :data="tableData.filter(data => !search ||
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.publisher.toLowerCase().includes(search.toLowerCase()) ||
        data.author.toLowerCase().includes(search.toLowerCase())
         )"
        border>
      <el-table-column
          fixed
          prop="id"
          label="ID"
          width="50"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          fixed
          prop="name"
          label="书名"
          width="120"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="author"
          label="作者"
          width="120"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="publisher"
          label="出版社"
          width="120"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="introduction"
          label="详情介绍"
          width="300"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="storeAmount"
          label="库存数量"
          width="120"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="status"
          label="是否出库"
          width="120"
          header-align="center"
          :align="'center'"
      ></el-table-column>
      <el-table-column
          prop="gmtCreate"
          label="上架时间"
          width="240"
          header-align="center"
          :align="'center'"
      ></el-table-column>



      <!--      <el-table-column-->
      <!--          fixed="right"-->
      <!--          label="操作"-->
      <!--          width="100"-->
      <!--          header-align="center"-->
      <!--          :align="'center'"-->
      <!--      ><template slot-scope="scope">-->
      <!--        <template slot="header" slot-scope="scope">-->
      <!--          <el-input-->
      <!--              v-model="search"-->
      <!--              size="mini"-->
      <!--              placeholder="输入关键字搜索"/>-->
      <!--        </template>-->
      <!--        <el-row>-->
      <!--          <el-button type="danger" plain @click="openDeleteConfirm(scope.row)">删除</el-button>-->
      <!--        </el-row>-->
      <!--      </template>-->
      <!--      </el-table-column>-->


      <el-table-column
          fixed="right"
          align="right"
          width="150"
          header-align="center"
          :align="'center'">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              plain
              @click="openDeleteConfirm(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--    分页控制-->
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
      }).then(() => {
        this.handleDelete(tableItem);
      }).catch(() => {
      });
    },
    handleDelete(tableItem) {
      let url = 'http://localhost:9080/admin/book/' + tableItem.id + '/delete';
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

      let url = 'http://localhost:9080/admin/book/selectType?page=' + page;
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
        id:'',
        name:'',
        author:'',
        publisher:'',
        status:'',
        storeAmount:'',
        introduction:'',
        gmtCreate:'',
      },
    }
  }
}

</script>

