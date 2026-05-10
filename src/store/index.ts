import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

function initState() {
  return {
    isCollapse: false,
    tags: [{
      path: '/home',
      name: 'home',
      label: '首页',
      icon: 'home'
    }],
    currentMeun: null as any,
    menuList: JSON.parse(localStorage.getItem('menuList') || '[]'),  // ← 恢复
    routerList: [] as any[],
    token: localStorage.getItem('token') || '',                       // ← 恢复
  }
}

export const useAllDateStore = defineStore('allDate', () => {
  const state = ref(initState())

  function selectMeun(val: any) {
    if (val.name === 'home') {
      state.value.currentMeun = null
    } else {
      state.value.currentMeun = val
      let index = state.value.tags.findIndex(item => item.name === val.name)
      index === -1 ? state.value.tags.push(val) : ''
      state.value.currentMeun = val  
    }
  }

  function updateTags(tag: any) {
    let index = state.value.tags.findIndex(item => item.name === tag.name)
    state.value.tags.splice(index, 1)
  }

  // 设置menuList + 动态注册路由
  function setMenuList(val: any) {
    state.value.menuList = val

    const menu = state.value.menuList
    const module = import.meta.glob('../views/**/*.vue')
    const routeArr: any[] = []

    menu.forEach((item: any) => {
      if (item.children) {
        item.children.forEach((val: any) => {
          let url = `../views/${val.url}.vue`
          val.component = module[url]
          routeArr.push(...item.children)
        })
      } else {
        let url = `../views/${item.url}.vue`
        item.component = module[url]
        routeArr.push(item)
      }
    })

    routeArr.forEach((item: any) => {
      const removeFn = router.addRoute('main', item)
      state.value.routerList.push(removeFn)   // 存删除函数
    })
  }

  // 清除动态路由 + 重置状态
 function clearRoutes() {
  state.value.routerList.forEach((fn: any) => fn())
  state.value.routerList = []
  state.value.menuList = []
  state.value.token = ''
  state.value.tags = [{ path: '/home', name: 'home', label: '首页', icon: 'home' }]
  
  // ↓ 别忘了清localStorage
  localStorage.removeItem('token')
  localStorage.removeItem('menuList')
}

  return { state, selectMeun, updateTags, setMenuList, clearRoutes }
})