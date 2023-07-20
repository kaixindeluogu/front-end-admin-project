<template>
  <div>
    <!-- 顶部面包屑标识与导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div id="main" style="width: 1000px;height:800px"></div>
  </div>
</template>

<script>

export default {

  data() {
    return {

    }
  },
  methods: {

    initEcharts(){
      let chartDom = document.getElementById('main');
      let myChart = this.echarts.init(chartDom);
      let option;
      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['玄幻', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ['修仙', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ['穿越', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ['宫斗', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
              ['种田经商', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: { type: 'category' },
          yAxis: { gridIndex: 0 },
          grid: { top: '55%' },
          series: [
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: { focus: 'series' }
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: {
                focus: 'self'
              },
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        };
        myChart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        myChart.setOption(option);
      });

      option && myChart.setOption(option);

    },


  },
  mounted() {
    this.initEcharts();
  }
}
</script>

<style scoped>

</style>