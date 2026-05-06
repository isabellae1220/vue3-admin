// 整个项目api统一管理
import request from './request'

export default{
  getTableData(){
    return request({
      url:'/home/getTableData',
      method:'get',
      mock:false,
    })
  }
}