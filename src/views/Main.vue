<template>
  
<div class="common-layout">
  <el-container class="lay-container">
    <!-- 自定义左侧组件 -->
     <common-aside/>
     <el-container>
      <el-header class="el-header">
        <common-header/>
      </el-header>
      <el-main class="right-main">
        <router-view></router-view>
       </el-main>
     </el-container>
  </el-container>
  
  
</div>
</template>
<script lang="ts" setup name="">
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
</script>

<style  lang="less">
.common-layout,.lay-container{
  height:100vw;
}
.el-header{
  background-color: #333;

}

</style>