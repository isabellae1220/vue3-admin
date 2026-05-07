<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInline.keyWord" />
      </el-form-item>
      <el-form-item @submit.prevent>
        <el-button type="primary" native-type="button" @click="handlesearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column 
      v-for="item in tablelabel" 
      :key="item.prop"
      :width="item.width ? item.width : 125"
      :prop="item.prop"
      :label="item.label"
      />
     
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
         <el-button type="primary" link size="small">编辑</el-button>
         <el-button type="danger" link size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref ,onMounted,reactive} from 'vue'
import api from '@/api/api'

const tableData = ref<any[]>([])



const handleClick = (row: any) => {
  console.log(row)
}

const tablelabel=reactive([
  {
    prop:'name',
    label:'姓名'
  },
  {
    prop:'age',
    label:'年龄'
  },
  {
    prop:'sexLabel',
    label:'性别'
  },{
    prop:'birth',
    label:'生日',
    width:200
  },{
    prop:'addr',
    label:'地址',
    width:400
    
  }
])
const formInline=reactive({
  keyWord:''
})
const config=reactive({
  name:''
})
const handlesearch = () => {
  console.log('🔥 我被点击了！')
  console.log('🔥 点击搜索！formInline.keyWord =', formInline.keyWord)
  config.name = formInline.keyWord
  getUserData()
}
const getUserData = async () => {
  const params = { ...config }   // ← 解构成普通对象
 console.log('🚀 发请求时 config:', JSON.stringify(params))
  const data = await api.getUserData(params) as any
  console.log('返回数据:', data)
  tableData.value=data.list.map((item:any)=>({
    ...item,
    sexLabel:item.sex===1?'男':'女'
  }
  ))
}
onMounted(() => {
  getUserData()
})
</script>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
}
</style>

