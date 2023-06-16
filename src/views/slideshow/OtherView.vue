<template>
  <div>
    <h2>轮播图管理</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" alt="" style="max-width: 100%">
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
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
      tableData: [
        {
          id: 1,
          title: '轮播图1',
          imageUrl: 'https://picsum.photos/200/300',
          priority: 'high',
          createdAt: '2021-01-01 10:00:00'
        },
        {
          id: 2,
          title: '轮播图2',
          imageUrl: 'https://picsum.photos/200/300',
          priority: 'medium',
          createdAt: '2021-01-02 10:00:00'
        },
        {
          id: 3,
          title: '轮播图3',
          imageUrl: 'https://picsum.photos/200/300',
          priority: 'low',
          createdAt: '2021-01-03 10:00:00'
        }
      ]
    };
  },
  methods: {
    handleEdit(row) {
      // 处理编辑操作
    },
    handleDelete(row) {
      // 处理删除操作
    }
  }
};
</script>