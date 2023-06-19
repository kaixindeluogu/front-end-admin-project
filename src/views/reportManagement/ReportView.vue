<template>
<div>
    <h2>用户举报信息</h2>
    <el-divider/>
<!--    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="province"
          label="省份"
          width="120">
      </el-table-column>
      <el-table-column
          prop="city"
          label="市区"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="300">
      </el-table-column>
      <el-table-column
          prop="zip"
          label="邮编"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="id" label="用户id" width="120"></el-table-column>
      <el-table-column prop="libraryId" label="图书馆id" width="120"></el-table-column>
      <el-table-column prop="bookId" label="书籍id" width="120"></el-table-column>
      <el-table-column prop="reportContent" label="举报内容" width="300"></el-table-column>
      <el-table-column prop="status" label="状态" width="170">
        <template slot-scope="scope">
          <el-switch
              style="display: block"
              @change="toggleEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="已审批"
              inactive-text="未审批">
          </el-switch>
        </template>

      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-popover
              placement="right"
              width="400"
              trigger="click">
            <el-table :data="tableData">
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="userId" label="用户id"></el-table-column>
              <el-table-column width="300" property="content" label="内容"></el-table-column>
            </el-table>
            <el-button slot="reference">查看</el-button>
            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                       @click="openDeleteConfirm(scope.row)"></el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  methods: {
    changePage(page) {
      this.$router.replace('?page=' + page);
      this.loadTagTypeList();
    },
    handleClick(row) {
      console.log(row);
    },
    toggleEnable(item) {
      alert('即将切换【' + item.id + " - " + item.name + '】的启用状态，还没做！');
    },
    openDeleteConfirm(item) {
      alert('即将删除【' + item.id + " - " + item.name + '】，还没做！');
    },
    loadTagTypeList() {
      let page = this.$router.currentRoute.query.page;
      if (!page) { page = 1; }

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
    this.loadTagTypeList();
  },

  data() {
    return {
      value:true,
      tableData: [],
      currentPage: 0,
      pageSize: 0,
      total: 0
    }
  }
}
</script>

<style scoped>

</style>