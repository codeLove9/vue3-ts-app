<template>
  <el-radio-group v-model="selectLabel" @change="dayChange">
    <el-radio-button label="sale_">销量</el-radio-button>
    <el-radio-button label="_money">销售额</el-radio-button>
  </el-radio-group>
  <el-select v-model="selectDay" class="m-2" placeholder="Select" @change="dayChange">
    <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
  </el-select>
  <div ref="pie" style="width: 100%; height: 500px"></div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, toRefs } from "vue"
import * as echarts from "echarts"
const props = defineProps<{
  data: {
    name: string
    today_money: string
    // 设置索引签名
    [key: string]: string
  }[]
}>()
// 拿dom
const pie = ref()

const state = reactive({
  selectLabel: "_money",
  selectDay: "today",
  options: [
    { name: "今天", value: "today" },
    { name: "昨天", value: "yesterday" },
    { name: "前三天", value: "three_days" },
    { name: "前七天", value: "seven_days" }
  ]
})

const { selectLabel, selectDay, options } = toRefs(state)

let myChart: echarts.ECharts

const initPie = () => {
  let key = ""
  if (selectLabel.value == "_money") {
    key = selectDay.value + selectLabel.value
  } else {
    key = selectLabel.value + selectDay.value
  }
  // const arr = props.data.map((item: {[key: string] : string}) => ({ name: item.name, value: item[key] }))
  const arr = props.data.map(item => ({ name: item.name, value: item[key] }))
  
  // 初始化实例
  if (!myChart) {
    myChart = echarts.init(pie.value)
  }
  var option = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: 20,
      right: 10,
      width: 300,
      height: 100,
      orient: "vertical"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["25%", "45%"],
        avoidLabelOverlap: false,
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: true
        },
        data: arr
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}

const dayChange = () => {
  initPie()
}

watch(
  () => props.data,
  () => {
    initPie()
  }
)
</script>

<style lang="less" scoped></style>
