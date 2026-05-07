<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2026-4-30</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>

      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <el-card class="echart">
        <div ref="echart" style="height:280px"></div>
      </el-card>

      <div class="graph">
        <el-card>
          <div ref="userEchart" style="height:240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import api from '@/api/api'
import * as echarts from 'echarts'


const getImageUrl = (user: string) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const tableData = ref<any[]>([])
const countData = ref<any[]>([])



const tableLabel = ref({
  name: '课程',
  todayBuy: '今日购买',
  monthBuy: '本月购买',
  totalBuy: '总购买',
})

const xOptions = reactive({
  textStyle: { color: '#333' },
  legend: { top: '0', left: 'center' },
  grid: { left: '8%', right: '8%', top: '20%', bottom: '15%', containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: [] as any[],
    axisLine: { lineStyle: { color: '#17b3a3' } },
    axisLabel: { interval: 0, color: '#333', rotate: 30 },
  },
  yAxis: [{ type: 'value', axisLine: { lineStyle: { color: '#17b3a3' } } }],
  color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: [] as any[],
})
const pieOptions = reactive({
  tooltip: { trigger: 'item' },
  legend: { top: '0', left: 'center' },
  color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
  series: [] as any[],
})

// 三个图各自的容器 ref+observer
const echart = ref<HTMLElement | null>(null)
const userEchart = ref<HTMLElement | null>(null)
const videoEchart = ref<HTMLElement | null>(null)
  const observer = ref<ResizeObserver | null>(null)

const getTableData = async () => {
  const data = (await api.getTableData()) as any
  tableData.value = data.tableData
}

const getCountData = async () => {
  const data = (await api.getCountData()) as any
  countData.value = data
}

const getChartData = async () => {
  const { orderData, userData ,videoData} = (await api.getChartData()) as any

  // ===== 图1：订单折线图 =====
  xOptions.xAxis.data = orderData.date
  xOptions.series = Object.keys(orderData.data[0]).map((val) => ({
    name: val,
    data: orderData.data.map((item: any) => item[val]),
    type: 'line',
  }))
  const oneEchart = echarts.init(echart.value!)
  oneEchart.setOption(xOptions)

  // ===== 图2：用户柱状图 =====
  xOptions.xAxis.data = userData.map((item: any) => item.date)
  xOptions.series = [
    { name: '新增用户', data: userData.map((item: any) => item.new), type: 'bar' },
    { name: '活跃用户', data: userData.map((item: any) => item.active), type: 'bar' },
  ]
  const twoEchart = echarts.init(userEchart.value!)
  twoEchart.setOption(xOptions)

  pieOptions.series=[{
    data:videoData,
    type:'pie'
  }

  ]
  const threeEchart=echarts.init(videoEchart.value!)
  threeEchart.setOption(pieOptions)

//监听页面变化
  observer.value = new ResizeObserver(() => {
  oneEchart.resize()
  twoEchart.resize()
  threeEchart.resize()
})

// 让它观察这三个容器
observer.value.observe(echart.value!)
observer.value.observe(userEchart.value!)
observer.value.observe(videoEchart.value!)
}

onMounted(() => {
  getTableData()
  getCountData()
  getChartData()
})
</script>

<style scoped lang="less">
.home {
  // height: 100%;
  // overflow: hidden;
  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info {
      p {
        line-height: 40px;
      }
      .user-info-p {
        color: #999;
      }
      .user-info-admin {
        font-size: 35px;
      }
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .user-table {
    margin-top: 20px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display:flex;
    justify-content: space-between;
    .el-card{
      width:48%;
      height:260px;
    }
  }
}
</style>