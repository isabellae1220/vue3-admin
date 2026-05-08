import {defineStore} from 'pinia'
import {ref} from 'vue'
function initState(){
  return{
    isCollapse:false,
   tags: [{
  path:'/home',
  name:'home',
  label:'首页',
  icon:'home'
 }],
 currentMeun:null
  } 
}
export const useAllDateStore=defineStore('allDate',()=>{
  const state=ref(initState())
  function selectMeun(val:any){
    if(val.name==='home'){
      state.value.currentMeun=null;
    }else{
    let index=state.value.tags.findIndex(item=>item.name===val.name)
    index===-1?state.value.tags.push(val):'';
    }
  }
  function updateTags(tag:any){
    let index=state.value.tags.findIndex(item=>item.name===tag.name)
    state.value.tags.splice(index,1)
  }
  return{state,selectMeun,updateTags};
}
)