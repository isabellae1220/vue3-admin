import Mock from 'mockjs'

// 解析 URL 查询参数
function param2Obj(url: any) {
  const search = url.split('?')[1]
  if (!search) return {}
  const params = new URLSearchParams(search)
  return Object.fromEntries(params)
}

let List: any[] = []
const count = 200

// 模拟 200 条用户数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    })
  )
}

export default {
  /**
   * 获取列表
   * 参数: name, page, limit
   * 返回: { code, data: { list, count } }
   */
  getUserList: (config: any) => {
    console.log('🔍 完整 URL:', config.url)
    const parsed: any = param2Obj(config.url)
    console.log('🔍 解析参数:', parsed)

    const name = parsed.name
    const page = Number(parsed.page) || 1
    const limit = Number(parsed.limit) || 10

    console.log('🔍 最终参数:', { name, page, limit })

    // 按 name 模糊过滤
    const mockList = List.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })

    // 分页切片
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    )

    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      },
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: (config:any) => {
    const { id } = param2Obj(config.url)

    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  // 在 export default 内加这两个方法

addUser: (config: any) => {
  const newUser = param2Obj(config.url) as any
  newUser.id = Mock.Random.guid()
  newUser.sex = Number(newUser.sex)
  newUser.age = Number(newUser.age)
  List.unshift(newUser)   // 插到列表最前面
  return {
    code: 200,
    data: newUser,
    msg: '新增成功',
  }
},

editUser: (config: any) => {
  const data: any = param2Obj(config.url)
  const index = List.findIndex(u => u.id === data.id)
  if (index === -1) {
    return { code: -999, msg: '用户不存在' }
  }
  // 转换类型
  data.sex = Number(data.sex)
  data.age = Number(data.age)
  // 用新数据覆盖
  List[index] = { ...List[index], ...data }
  return {
    code: 200,
    data: List[index],
    msg: '编辑成功',
  }
},
}

 