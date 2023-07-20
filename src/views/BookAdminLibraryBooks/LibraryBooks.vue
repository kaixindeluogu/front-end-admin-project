<template>
<div>
  <!-- 表格,图书馆书籍展示页面 -->
  <el-table :data="bookArr"   style="width: 100%" >
    <el-table-column fixed prop="id" label="编号" width="50px"></el-table-column>
    <el-table-column prop="name" label="书名" width="200px"></el-table-column>
    <el-table-column prop="categoryId" label="分类" width="100px"></el-table-column>
    <el-table-column label="封面">
      <template slot-scope="scope">
        <img :src="scope.row.cover" alt="" style="max-width: 100%">
      </template>
    </el-table-column>
    <el-table-column prop="author" label="作者" width="100px"></el-table-column>
    <el-table-column prop="publishTime" label="出版时间" width="100px"></el-table-column>
    <el-table-column prop="publisher" label="出版社" width="100px"></el-table-column>
    <el-table-column prop="storeAmount" label="库存数量" width="100px"></el-table-column>
    <el-table-column prop="introduction" label="书籍详情"width="400px"></el-table-column>
    <el-table-column prop="sort" label="排序序号" width="100px"></el-table-column>
    <el-table-column prop="gmtCreate" label="创建时间"width="100px"></el-table-column>
    <el-table-column label="操作" fixed="right" width="200px">
      <template slot-scope="scope"  >
        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                   @click="openEditDialog(scope.row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 修改数据的表单 -->
  <el-dialog title="编辑标签数据" :visible.sync="editFormVisible">
    <el-form :model="editForm"  label-width="120px">
      <el-form-item label="书名" prop="name">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="editForm.author"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="editForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="storeAmount">
        <el-input v-model="editForm.storeAmount"></el-input>
      </el-form-item>
      <el-form-item label="文章详情" prop="introduction">
        <el-input v-model="editForm.introduction"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "LibraryBooks",

  data() {
    return {
      bookArr: [],
      editFormVisible: false,
      editForm: {
        id: '',
        name: '',
        author:'',
        publisher: '',
        storeAmount: '',
        introduction:''
      },
    };
  },
  methods: {
    /**
     * 编辑按钮显示修改图书详情
     * @param tableItem  图书ID
     */
    openEditDialog(tableItem) {
      let url = 'http://localhost:9080/v1/bookadmin/book/' + tableItem.id;
      console.log('url = ' + url);

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.editForm = jsonResult.data;
          this.editFormVisible = true;
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
    /**
     * 修改当前对象信息
     */
    handleEdit() {
      let url = 'http://localhost:9080/v1/bookadmin/book/update';
      console.log('url = ' + url);
      /*let formData = this.qs.stringify(this.editForm);
      console.log('formData = ' + formData);*/

      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post(url,this.editForm).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '修改标签成功！',
            type: 'success'
          });
          this.editFormVisible = false;
        } else if (jsonResult.state == 40400) {
          let title = '操作失败';
          this.$alert(jsonResult.message, title, {
            confirmButtonText: '确定',
            callback: action => {
              this.editFormVisible = false;
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
    /**
     * 查询当前图书馆书籍信息
     */
    bookList() {
      this.axios
          .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
          .post("http://localhost:9080/v1/bookadmin/book/"+ localStorage.getItem('id')+"/list").then((response) => {
        if (response.data.state == 20000) {
          this.bookArr = response.data.data;

        }
      });


    },
    handleDelete(row) {
      /**
       * 删除操作,根据当条信息主键ID
       */
      if (confirm("您确认删除吗?")){
        this.axios
            .create({'headers': {'Authorization': localStorage.getItem('jwt')}})
            .post("http://localhost:9080/v1/bookadmin/book/"+row.id+"/delete")
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
    this.bookList();
  }
}



</script>

<style scoped>

</style>