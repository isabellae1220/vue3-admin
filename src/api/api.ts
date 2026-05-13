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
  getUserData(params:any){
    return request({
      url:'/user',
      method:'get',
      params,
      // mock:false,
    })
  },
  deleteUser(data:any){
    return request({
      url:'/user/deleteUser',
      method:'post',
      data,
      // mock:false,
    })
  },addUser(data: any) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data,
  })
},
editUser(data: any) {
  return request({
    url: '/user/updateUser',
    method: 'post',
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
