<template>
  <div class="carousel">
    <el-carousel height="380px" :interval="100000" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in usageList" :key="index" >
        <RingChart :canvasData="item"></RingChart>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel, Select } from 'element-ui'
import { usage } from '@/api/api'
import RingChart from '../components/ringchart'
import { getUsage } from '@/utils/json/data'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    // console.log(getUsage())
    // this.list = getUsage()
    usage().then(res => {
      this.list = res
      this.setUsages(this.list)
    }).catch(err => {
      this.$message.error(err.message)
    })
  },
  methods: {
    ...mapMutations([
      'setUsages'
    ])
  },
  components: {
    RingChart,
  },
  computed: {
    ...mapState({
      usageList: 'usageList'
    })
  }
}
</script>

<style lang="less" >
@import url("../assets/css/reset.css");
.el-carousel__item {
  h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
}
.el-carousel--horizontal {
  overflow-x: hidden;
  overflow-y: hidden;
  //  height: 200px;
  .el-carousel__indicators--horizontal .el-carousel__indicators{
  bottom:-8px;
}
}

.el-carousel__item {
  background-color: #e9eef3;
  width: 100% !important;
  height: 100% !important;
  left: 0 !important;
}
.carousel {
  .el-carousel {
    .el-carousel__indicators {
      bottom: -8px;
    }
    .el-carousel__arrow {
      display: none;
    }
  }
}

</style>