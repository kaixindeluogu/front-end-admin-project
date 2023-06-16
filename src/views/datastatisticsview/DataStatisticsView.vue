<!--支付界面-->
<template>
  <div>
    <div class="about">
      <el-table
          :data="tableData.filter(data => !search || data.libraryName.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
        <el-table-column
            label="图书馆名"
            prop="libraryName">
        </el-table-column>
        <el-table-column
            label="书籍量"
            prop="bookNumber">
        </el-table-column>
        <el-table-column
            label="点击量"
            prop="click">
        </el-table-column>
        <el-table-column
            label="会员数"
            prop="VIPNumber">
        </el-table-column>
        <el-table-column
            label="反馈量"
            prop="feedbackQuantity">
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="date">
        </el-table-column>
        <el-table-column
            align="right">
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
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "dataStatistics",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        libraryName: '知途图书馆',
        bookNumber: '1234',
        click:'54654654',
        VIPNumber:'784535',
        feedbackQuantity: '87978',
      },  {
        date: '2016-05-04',
        libraryName: '知行书社',
        bookNumber: '12333',
        click: '22222',
        VIPNumber:'879789',
        feedbackQuantity: '345654',
      },
        {
          date: '2016-05-04',
          libraryName: '博雅馆',
          bookNumber: '123123',
          click: '33333',
          VIPNumber:'786786',
          feedbackQuantity: '5456546',
        }, {
          date: '2016-05-01',
          libraryName: '读史阁',
          bookNumber: '64546',
          click: '44444',
          VIPNumber:'87987',
          feedbackQuantity: '64578',
        },  {
          date: '2016-05-01',
          libraryName: '智慧树图书馆',
          bookNumber: '64546',
          click: '44444',
          VIPNumber:'87978',
          feedbackQuantity: '45687',
        }, {
          date: '2016-05-01',
          libraryName: '阅驿馆',
          bookNumber: '64546',
          click: '44444',
          VIPNumber:'65445',
          feedbackQuantity: '678645',
        }, {
          date: '2016-05-01',
          libraryName: '静雅斋',
          bookNumber: '64546',
          click: '12453',
          VIPNumber:'786987',
          feedbackQuantity: '45354',
        }, {
          date: '2016-05-01',
          libraryName: '清音阁',
          bookNumber: '64546',
          click: '88865',
          VIPNumber:'87687',
          feedbackQuantity: '78645',
        }, {
          date: '2016-05-01',
          libraryName: '阳台书院',
          bookNumber: '64546',
          click: '45654',
          VIPNumber:'876987',
          feedbackQuantity: '64564',
        },{
          date: '2016-05-03',
          libraryName: '清澈书屋',
          bookNumber: '6666',
          click: '555554',
          VIPNumber:'1411',
          feedbackQuantity: '45654',
        }],
      search: ''
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {

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