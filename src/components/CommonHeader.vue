<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="handleCollapse" size="small">
        <component class="icons" :is="'Menu'" ></component>
      </el-button>
    <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="bread">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     </el-breadcrumb>
    </div>

    <div class="r-content">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
         <img :src="getImageUrl('user')" alt="User Image" class="user"/>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  </div>
  </div>
</template>

<script lang="ts" setup >
import { useAllDateStore } from '@/store';
//  import{ref,computed} from 'vue'

 const getImageUrl=(user:string)=>{
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
 }
 // 导入store 获取isCollapse的值 并点击取反
 const store=useAllDateStore()
 const handleCollapse=()=>{
  store.state.isCollapse=!store.state.isCollapse
 }

</script>

<style lang="less" scoped>
.header{
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height:100%;
  background-color: #333;
}
.icons{
  width:20px;
  height:20px;
}
.r-content{
  .user{
    width:40px;
    height:40px;
    border-radius:50%;
  }
}
.l-content{
  display:flex;
  align-items:center;
  .el-button{
    margin-right:20px;
  }
}
:deep(.bread span){
color:#fff !important;
cursor: pointer !important;
}
</style>