<template>
  <div>
    <el-container>
      <el-header class="header">
        <h1>图书馆后台管理</h1>
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

            <el-menu-item index="/bookadmin/librarybooks">
              <i class="el-icon-menu"></i>
              <span slot="title">书籍管理</span>
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

<style>
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

