<template>
    <div class="ringchart">
        <div :id="'container_' + this.data.username"></div>
    </div>    
</template>

<script>
    import { Chart } from '@antv/g2';
    export default {
      props: {
        'canvasData': {
          type: Object,
          default() {
            return {}
          },
        }
      },
      data () {
          return {
            data : this.canvasData,
            chart: Object,
            lastItem: '',
            chartData: []
          }

      },
        mounted() {
          // 总容量
          let quota = this.data.quota * 1024 * 1024 * 1024
          // 桶使用总量
          let num = this.data.usages.CapacityUsed[0].Buckets.reduce((cur, next) => {
            return cur += next.Bytes_Rounded
          }, 0)
          // 未使用你内存
          let surplus = quota - num
          this.chartData = this.data.usages.CapacityUsed[0].Buckets.map(item => {
            return {
              item: item.Bucket,
              count: this.formatByets(item.Bytes_Rounded),
              percent: Number((parseInt((item.Bytes_Rounded / quota) * 100) / 100).toFixed(10)),
              fill: 'skyblue'
            }
          })
          this.chartData.push({
            item: '剩余空间',
            count: this.formatByets(surplus),
            percent: Number((parseInt((surplus / quota) * 100 ) / 100).toFixed(10))
          })
          if (this.chartData.length !== 0) {
            
            this.setCharts(num / quota)
          }
        },
        methods: {
          setCharts (number) {
            this.chart = new Chart({
              container: 'container_' + this.data.username, // 指定图表容器 ID
              autoFit: true,
              width:260,
              height: 260,
              FacetTitle: '123'
            });
            this.chart.coordinate('theta', {
              radius: 0.75,
              innerRadius: 0.5,
            });
            // Step 2: 载入数据源
            this.chart.data(this.chartData);

            this.chart.scale('percent', {
              formatter: val => {
                val = val * 100 + '%';
                return val;
              }
            });
            this.chart.coordinate('theta', {
              radius: 0.75,
              innerRadius: 0.6
            });
            this.chart.tooltip({
              showTitle: false,
              showMarkers: false,
              itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
            });
            // 辅助文本
            this.chart
              .annotation()
              .text({
                position: ['50%', '50%'],
                content: `/${this.data.quota}GB`,
                style: {
                  fontSize: 16,
                  fill: '#8c8c8c',
                  textAlign: 'center',
                },
                offsetX: -4,
                offsetY: 20,
              })
              .text({
                position: ['50%', '50%'],
                content: `${this.formatByets(this.data.usages.Summary[1])}`,
                style: {
                  fontSize: 20,
                  fill: number >= 0.75  ? '#f40' : '#8c8c8c',
                  textAlign: 'center',
                },
                offsetX: -4,
                offsetY: -10,
              })
            this.chart
            .interval()
            .adjust('stack')
            .position('percent')
            .color('item', (item, color) => {
              if (item === '剩余空间') {
                return '#ccc'
              }
            })
            .tooltip('item*percent*count', (item, percent, count) => {
              // percent = percent * 100 + '%';
              return {
                name: item,
                value: count,
              };
            });
            this.chart.interaction('element-active');
            this.chart.render();
          },
          formatByets (byets) {
            return byets > (1024 * 1024 * 1024)  ? `${Number((byets / (1024 * 1024 *1024)).toFixed(2))}GB` :
            byets > (1024 * 1024 ) ? `${Number((byets / (1024 * 1024)).toFixed(2))}MB` :
            byets > 1024 ? `${byets / 1024}KB` : byets
          }
        },
      
    }
</script>

<style lang="less"  >

    // #container{
    //   height:100px;
    // }
</style>