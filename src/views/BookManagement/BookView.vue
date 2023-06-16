<template>
  <div>
      <el-table
          :data="tableData"
          border>
        <el-table-column
            fixed
            prop="date"
            label="编号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="name"
            label="书名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="province"
            label="作者"
            width="120">
        </el-table-column>
        <el-table-column
            prop="city"
            label="出版社"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="图书馆信息"
            width="300">
        </el-table-column>
        <el-table-column
            prop="zip"
            label="库存数量"
            width="120">
        </el-table-column>
        <el-table-column
            prop="zip"
            label="是否出库"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>


<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>
