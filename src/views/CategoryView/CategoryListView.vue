<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-s-promotion"></i> 后台管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bookadmin/CategoryList' }">类别管理</el-breadcrumb-item>
      <el-breadcrumb-item>一级类别管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider content-position="left"></el-divider>

    <!-- 操作区域 -->
    <div style="margin: 0 0 20px 0;">
      <el-button type="primary" size="small" @click="$router.push('/bookadmin/CategoryAddNew')">添加一级类别</el-button>
    </div>

    <!-- 数据表格 -->
    <el-divider content-position="left">一级类别列表</el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" header-align="center"
                       show-overflow-tooltip></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
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
      tableData: [],
      // 分页相关数据
      currentPage: this.$router.currentRoute.query.page ? parseInt(this.$router.currentRoute.query.page) : 1,
      pageSize: 0,
      total: 0
    }
  },
  methods: {
    // 切换分页
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadCategoryList();
    },
    // 弹出修改对话框
    openEditDialog(tableItem) {
      let url = 'http://localhost:9080/admin/categories/' + tableItem.id;
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.editForm = jsonResult.data;
          this.editFormVisible = true;
        } else {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.loadCategoryList();
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
    handleEdit() {
      let url = 'http://localhost:9080/admin/categories/' + this.editForm.id + '/update';
      console.log('url = ' + url);
      let formData = this.qs.stringify(this.editForm);
      console.log('formData = ' + formData);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .post(url, formData).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '修改类别成功！',
            type: 'success'
          });
          this.editFormVisible = false;
          this.loadCategoryList();
        } else if (jsonResult.state == 40400) {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.editFormVisible = false;
              this.loadCategoryList();
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
    // 弹出删除确认框
    openDeleteConfirm(tableItem) {
      let message = '此操作将永久删除【' + tableItem.name + '】类别，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(tableItem);
      }).catch(() => {
      });
    },
    // 执行删除
    handleDelete(tableItem) {
      let url = 'http://localhost:9080/admin/categories/' + tableItem.id + '/delete';
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
          .post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除标签成功！',
            type: 'success'
          });
          this.loadCategoryList();
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
    // 加载类别列表
    loadCategoryList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) {
        page = 1;
      }

      let url = 'http://localhost:9080/admin/categories/list?page=' + page;
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('localJwt')}})
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
    }
  },
  mounted() {
    this.loadCategoryList();
  }
}
</script>