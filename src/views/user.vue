<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline" @submit.prevent>
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名" v-model="formInline.keyWord" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="button" @click="handlesearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div class="table">
    <el-table :data="tableData" border style="width: 100%" row-key="id">
      <el-table-column
        v-for="item in tablelabel"
        :key="item.prop"
        :width="item.width ? item.width : 125"
        :prop="item.prop"
        :label="item.label"
      />

      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="primary" link size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="config.limit"
      :current-page="config.page"
      size="small"
      @current-change="handleChange"
    />
  </div>

  <!-- 新增/编辑弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import api from '@/api/api'

const tableData = ref<any[]>([])

const tablelabel = reactive([
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'sexLabel', label: '性别' },
  { prop: 'birth', label: '生日', width: 200 },
  { prop: 'addr', label: '地址', width: 400 },
])

const formInline = reactive({
  keyWord: '',
})

const config = reactive({
  name: '',
  page: 1,
  limit: 10,
})

const total = ref(0)

// ============ 弹窗相关 ============

// 弹窗显隐
const dialogVisible = ref(false)

// 当前操作类型：add 新增 / edit 编辑
const action = ref<'add' | 'edit'>('add')

// 表单实例引用（用于校验）
const userForm = ref<FormInstance>()

// 表单数据
const formUser = reactive({
  id: '',
  name: '',
  age: '',
  sex: '',
  birth: '',
  addr: '',
})

// 表单校验规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须是数字', trigger: 'blur' },
  ],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  birth: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
  addr: [{ required: true, message: '请输入地址', trigger: 'blur' }],
})

// 重置表单数据
const resetForm = () => {
  formUser.id = ''
  formUser.name = ''
  formUser.age = ''
  formUser.sex = ''
  formUser.birth = ''
  formUser.addr = ''
}

// 点击"新增"按钮
const handleAdd = () => {
  action.value = 'add'
  resetForm()
  dialogVisible.value = true
}

// 点击"编辑"按钮
const handleEdit = (row: any) => {
  action.value = 'edit'
  // 把当前行的数据填入表单（注意要做一次拷贝避免引用污染）
  Object.assign(formUser, row)
  // 性别从 0/1 数字转字符串（el-option 用的是字符串）
  formUser.sex = String(row.sex)
  dialogVisible.value = true
}

// 点击"取消"
const handleCancel = () => {
  dialogVisible.value = false
  userForm.value?.clearValidate()  // 清除校验提示
}

// 点击右上角 X
const handleClose = (done: () => void) => {
  done()
  userForm.value?.clearValidate()
}

// 点击"确定"提交
const onSubmit = () => {
  userForm.value?.validate(async (valid) => {
    if (!valid) return  // 校验未通过

    if (action.value === 'add') {
      await api.addUser({ ...formUser })
      ElMessage.success('新增成功')
    } else {
      await api.editUser({ ...formUser })
      ElMessage.success('编辑成功')
    }

    dialogVisible.value = false
    getUserData()  // 重新拉数据
  })
}

// ============ 表格相关 ============

// 搜索
const handlesearch = () => {
  config.name = formInline.keyWord
  config.page = 1
  getUserData()
}

// 翻页
const handleChange = (page: any) => {
  config.page = page
  getUserData()
}

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm('你确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await api.deleteUser({ id: row.id })
      ElMessage.success('删除成功')
      getUserData()
    })
    .catch(() => {})
}

// 拉数据
const getUserData = async () => {
  const params = { ...config }
  const data = (await api.getUserData(params)) as any
  tableData.value = data.list.map((item: any) => ({
    ...item,
    sexLabel: item.sex === 1 ? '男' : '女',
  }))
  total.value = data.count
}

onMounted(() => {
  getUserData()
})
</script>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
  display: flex;
}
// 修复 inline form 里 select 宽度问题
.select-clearn :deep(.el-select) {
  width: 200px;
}
</style>