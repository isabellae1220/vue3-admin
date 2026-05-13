import{createRouter,createWebHashHistory} from 'vue-router'

const routes=[
  {
  path:'/',
  name:'main',
  component:()=>import('@/views/Main.vue'),
  redirect:'/home',
  children:[]
},
{
  path:"/login",
    name:"login",
    component:()=>import("@/views/Login.vue"),
},
{
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@/views/404.vue')
}
]
const router=createRouter({
  history:createWebHashHistory(),
  routes,
});

export default router;