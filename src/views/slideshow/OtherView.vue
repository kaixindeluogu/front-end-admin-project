<template>
  <div>
    <h2>轮播图管理</h2>
    <el-table :data="bannerArr" style="width: 100%" >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" style="max-width: 100%">
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="优先级"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerArr: []
    };
  },
  methods: {
    bannerList() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post("http://localhost:9080/v1/admin/banner/list").then((response) => {
        if (response.data.state == 20000) {
          this.bannerArr = response.data.data;
          // 使用 Fetch API 获取图片
        }
      });


    },
    handleDelete(row) {
      // 处理删除操作
      if (confirm("您确认删除吗?")){
        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .get("http://localhost:9080/v1/admin/file/remove?url=" + row.imgUrl).then(function () {
          console.log("服务器文件删除完成!");
        })

        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .get("http://localhost:9080/v1/admin/banner/"+row.id+"/delete")
            .then((response) => {

              if (response.data.state == 20000) {
                this.$message.success("删除成功");
                location.reload();
              }else {
                this.$message.error("删除失败");
              }
            });
      }
    }
  },
  mounted() {
    this.bannerList();
  }
};
</script>