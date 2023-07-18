<template>
  <div>
    <el-container>
      <el-header class="header" style="display: flex; justify-content: space-between;">
        <h1>纸片图书管理系统</h1>
        <p class="user1">当前用户为{{ username }},</p>
        <p  icon="el-icon-close" @click="openLogoutConfirm()">退出登录</p>
      </el-header>
      <el-container class="body">
        <el-aside class="aside">
          <el-menu
              router
              :default-active="$router.currentRoute.path"
              class="el-menu-vertical-demo"
              background-color="#425c79"
              text-color="#fff"
              active-text-color="#ffd04b">


            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>书籍管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/bookadmin/import">书籍添加</el-menu-item>
                <el-menu-item index="/bookadmin/librarybooks">书籍展示</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-menu-item index="/bookadmin/librarydataStatistics">
              <i class="el-icon-menu"></i>
              <span slot="title">图书馆数据统计</span>
            </el-menu-item>

            <el-menu-item index="/bookadmin/reservationList">
              <i class="el-icon-menu"></i>
              <span slot="title">订单展示</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>借阅规则管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="libraryRule">规则导入</el-menu-item>
                <el-menu-item index="ruleList">规则查看</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/bookadmin/OrderApproval">
              <i class="el-icon-menu"></i>
              <span slot="title">预约信息管理</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>

</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username")
    }
  },
  methods: {
    openLogoutConfirm() {
      //todo跳出弹框,并确认是否登出
      this.$confirm('您将退出个人信息登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem("jwt")
        this.$message({
          type: 'success',
          message: '已退出登录!'
        });
        this.$router.replace('/')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出登录'
        });
      });

    }
  }
}

</script>

<style>
.user1{
  position: relative;
  padding-left:1050px ;
}
.header{background: #2c3e50;color: #fff;line-height: 60px;}
.body { position: absolute;top: 60px;bottom: 0;left: 0;right: 0;}
.aside {background: #425c79}
.aside .el-menu{border: 0}
.el-menu i {
  color: #fff !important;
}
.el-menu.is-active{}
.main {}

</style>

