<template>
  <el-aside :width="width">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      >

      <h3 v-show="!isCollapse">通用后台管理器</h3>
      <h3 v-show="isCollapse">后台</h3>

      <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path">
        <component class="icons" :is="item.icon"></component>
        <span >{{ item.label }}</span>
      </el-menu-item>

      <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
        <template slot="title">
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subItem.path" :index="subItem.path">
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
    
      
      </el-submenu>
     
      
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup >
 import{ref,computed} from 'vue'
 import { useAllDateStore } from '@/store/index'
 const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'House',
          url: 'Home'
      	},
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'VideoPlay',
            url: 'Mall'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'User',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'Location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'Setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'Setting',
                    url: 'Page2'
                }
            ]
              }
            ])
        
  const noChildren=computed(()=>list.value.filter(item=>!item.children))
  const hasChildren=computed(()=>list.value.filter(item=>item.children))
  // 引入store 从store中获取isCollapse
  const store=useAllDateStore()
  const isCollapse=computed(()=>store.state.isCollapse)
  // 导航宽度也是动态获取 true（收）64。false（开）180
  const width=computed(()=>store.state.isCollapse?'64px':'180px')

</script>

<style lang="less" scoped>
.icons{
  width:18px;
  height:18px;
  margin-right:5px;
}
.el-menu{
  border-right:none;
 
  
  h3{
    line-height:48px;
    color:#fff;
    text-align:center;
  }
}
.el-aside{
  height:100%;
  background-color: #545c64;
}

</style>