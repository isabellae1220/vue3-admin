import router from '@/router'
import { useAllDateStore } from '@/store'

router.beforeEach((to, from, next) => {
  const store = useAllDateStore()
  const token = store.state.token

  if (to.path === '/login') {
    next()
  } else if (!token) {
    next('/login')
  } else {
    // 有token,但是动态路由没注册(刷新场景)
    if (store.state.routerList.length === 0 && store.state.menuList.length > 0) {
      store.setMenuList(store.state.menuList)   // 重新注册
      next({ ...to, replace: true })             // 重新进入,触发新注册的路由
    } else {
      next()
    }
  }
})