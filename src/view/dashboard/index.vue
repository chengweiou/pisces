<template>
  <proj-header title="Dashboard"/>
  <el-main>
    <div class="df">
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 6;">
        <div style="height: 300px;"><v-chart :option="lineOption" /></div>
      </el-card>
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 4;">
        <div style="height: 300px;"><v-chart :option="pieOption" /></div>
      </el-card>
    </div>
    <div class="df">
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 1;">
        <div style="height: 150px;"><v-chart :option="barOption" /></div>
      </el-card>
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 1;">
        <div style="height: 150px;">this is a chart</div>
      </el-card>
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 1;">
        <div style="height: 150px;">this is a chart</div>
      </el-card>
      <el-card style="margin-right: 10px; margin-bottom: 10px; flex: 1;">
        <div style="height: 150px;">this is a chart</div>
      </el-card>
    </div>
  </el-main>
</template>

<script setup>
// tip: 导入 component
import ProjHeader from '@/component/nav/projHeader.vue'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart, PieChart, BarChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components"
import VChart from "vue-echarts"
import { ref } from "vue"
// tip: 导入 data
// tip: 定义 各种 use
use([
  CanvasRenderer,
  LineChart, PieChart, BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

// tip: 定义 页面
// 指定图表的配置项和数据
const lineOption = ref({
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150],
      type: 'line',
    },
  ],
})
const pieOption = ref({
  title: {
    text: "Traffic Sources",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
})
const barOption = ref({
  title: {
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  legend: {
    data:['销量'],
  },
  xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20],
  }],
})
// tip: 定义 不需要关联的
// tip: 定义 需要关联的
// tip: 定义 computed 计算的
// tip: 定义 方法
// tip: 初始化空数据
</script>
<style scoped>
</style>
