<template>
  <div class="tags">
    <el-tag
    v-for='(tag,index) in tags'
    :key="tag.name"
    :closable="tag.name!=='home'"
    :effect="route.name===tag.name?'dark':'plain'"
    @click="handleMeun(tag)"
    @close="handleClose(tag,index)">
  {{ tag.label }}
  </el-tag>
  </div>
</template>

<script lang="ts" setup >
import {ref,computed} from 'vue';
import { useAllDateStore } from '@/store';
 import{useRoute,useRouter}from 'vue-router'
 const store=useAllDateStore()
 const tags=computed(()=>store.state.tags)
 const route=useRoute()
 const router=useRouter()

 const handleMeun=(tag:any)=>{
 router.push(tag.path)
 store.selectMeun(tag)
 }
  const handleClose=(tag:any,index:any)=>{
   store.updateTags(tag)
   if(tag.name!==route.name)return
   if(index===store.state.tags.length){
    store.selectMeun(tags.value[index-1])
    router.push(tags.value[index-1].path)
   }else{
    store.selectMeun(tags.value[index])
    router.push(tags.value[index].path)
   }
 }

</script>

<style lang="less" scoped>
.tags{
  margin:20px 0 0 20px;
}
el-tag{
 margin-right:10px;
}
</style>