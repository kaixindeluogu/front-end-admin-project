<template>
  <div>
    <form style="display: flex ;
    flex-wrap: wrap ;
    justify-content: center;
    align-items: center">
      <input style="flex-grow: 1;
      height: 40px; padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px 0 0 5px"
      type="text"
      placeholder="输入搜索内容">
      <button style="height: 60px;
                padding: 0 20px;
                font-size: 16px;
                font-weight: bold;
                color: black;
                background-color: white;
                border: 1px solid black;
                border-radius: 0 5px 5px 0;
                cursor: pointer;"  type="submit">搜索</button>
    </form>
    <br>
    <hr>
    <br>
      <el-table
          :data="tableData"
          border>
        <el-table-column
            fixed
            prop="date"
            label="编号"
            width="50"
            header-align="center"
            :align="'center'"
        ></el-table-column>
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
            label="详情介绍"
            width="300">
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
            prop="zip"
            label="上架时间"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-row>
              <el-button type="danger" plain>删除</el-button>
            </el-row>
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
        date: '1',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '3',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '4',
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

