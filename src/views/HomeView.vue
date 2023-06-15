<template>
  <div>
    <el-container>
      <el-header class="header">
        <h1>Xxx管理系统</h1>
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
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/about">About</el-menu-item>
                <el-menu-item index="/home/other">Other</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group >
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
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

