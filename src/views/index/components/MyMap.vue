<template>
  <div ref="myMap" style="width: 100%; height: 700px"></div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, toRefs } from "vue"
import * as echarts from "echarts"
import china from "@/data/china.json"
echarts.registerMap("china", china as any)

const myMap = ref()
const props = defineProps<{
  data: {}[]
}>()
let myMapChart: echarts.ECharts

watch(
  () => props.data,
  () => {
    const data = props.data.map((item: { [key: string]: string | number }) => ({ name: item.areaName, value: item.saleNum }))
    if (!myMapChart) {
      myMapChart = echarts.init(myMap.value)
    }
    const options = {
      tooltip: {
        show: true,
        formatter: "{b0} <br />销量： {c0}",
        backgroundColor: "rgba(50,50,50,0.7)",
        textStyle: {
          color: "#fff"
        }
      },
      series: {
        type: "map",
        map: "china",
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: "red"
          }
        },
        itemStyle: {
          borderColor: "#fff"
        },
        data
      },
      visualMap: {
        type: "continuous",
        min: 0,
        max: 1000000,
        calculable: true,
        inRange: {
          color: ["#121122", "rgba(3,4,5,0.4)", "red"]
        }
      }
    }
    myMapChart.setOption(options)
  }
)
</script>

<style lang="less" scoped></style>
