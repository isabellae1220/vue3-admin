const env = (import.meta.env.MODE || 'prod') as 'development' | 'test' | 'prod'

const EnvConfig = {
  development: { baseApi: '/api', mockApi: 'https://apifoxmock.com/...' },
  test:        { baseApi: '//test.future.com/api', mockApi: 'https://apifoxmock.com/...' },
  prod:        { baseApi: '//future.com/api', mockApi: 'https://apifoxmock.com/...' }
}

export default {
  env,
  ...EnvConfig[env],     // 把当前环境的 baseApi 和 mockApi 展开
  mock:false,            // 是否使用 Apifox 在线 mock
}