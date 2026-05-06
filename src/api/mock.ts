import Mock from 'mockjs'
import homeApi from './mockData/home'

Mock.mock(/\/home\/getTableData/, 'get', homeApi.getTableData)
//        ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//         正则匹配,URL 中包含这串就拦截