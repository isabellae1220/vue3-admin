import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'
import menuApi from './mockData/permission'
Mock.mock(/\/home\/getTableData/, 'get', homeApi.getTableData)
//        ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//         正则匹配,URL 中包含这串就拦截
Mock.mock(/\/home\/getCountData/, 'get', homeApi.getCountData)
Mock.mock(/\/home\/getChartData/, 'get', homeApi.getChartData)

Mock.mock(/\/user\/getUserData/, 'get', userApi.getUserList)
Mock.mock(/\/user\/deleteUser/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/addUser/, 'get', userApi.addUser)
Mock.mock(/\/user\/editUser/, 'get', userApi.editUser)
Mock.mock(/\/permission\/getMenu/, 'post', menuApi.getMenu)





