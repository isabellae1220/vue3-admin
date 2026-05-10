// 整个项目api统一管理
import request from './request'

export default{
  getTableData(){
    return request({
      url:'/home/getTableData',
      method:'get',
      // mock:false,
    })
  },
  getCountData(){
    return request({
      url:'/home/getCountData',
      method:'get',
      // mock:false,
    })
  },
  getChartData(){
    return request({
      url:'/home/getChartData',
      method:'get',
      // mock:false,
    })
  },
  getUserData(data:any){
    return request({
      url:'/user/getUserData',
      method:'get',
      data,
      // mock:false,
    })
  },
  deleteUser(data:any){
    return request({
      url:'/user/deleteUser',
      method:'get',
      data,
      // mock:false,
    })
  },addUser(data: any) {
  return request({
    url: '/user/addUser',
    method: 'get',
    data,
  })
},
editUser(data: any) {
  return request({
    url: '/user/editUser',
    method: 'get',
    data,
  })
},
getMenu(params:any){
  return request({
    url:'/permission/getMenu',
    method:'post',
    data:params
  })
}
}
