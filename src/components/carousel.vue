<template>
  <div class="carousel">
    <el-carousel height="365px" >
      <el-carousel-item v-for="(item, index) in list" :key="index" :interval="100000" :autoplay="false" indicator-position="outside">
        <RingChart :canvasData="item"></RingChart>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel, Select } from 'element-ui'
import { usage } from '@/api/api'
import RingChart from '../components/ringchart'
export default {
  data () {
    return {
      list: [
        // {
        //   username: "icbc",
        //   endpoint: "172.16.155.201:7480",
        //   quota: 200,
        //   displayName: "icbc",
        //   usages: {
        //     Entries: [ ],
        //     Summary: [
        //       231,
        //       4096,
        //       183
        //     ],
        //     CapacityUsed: [
        //       {
        //         Buckets: [
        //           {
        //             Bucket: "bucket-1",
        //             Bytes: 231,
        //             Bytes_Rounded: 4096
        //         },
        //         {
        //           Bucket: "bucket-2",
        //           Bytes: 0,
        //           Bytes_Rounded: 0
        //         },
        //         {
        //           Bucket: "bucket_1",
        //           Bytes: 0,
        //           Bytes_Rounded: 0
        //           }
        //         ]	
        //       }
        //     ]
        //   }
        // },
        // {
        //   username: "s3user",
        //   endpoint: "172.16.155.201:7480",
        //   quota: 100,
        //   displayName: "s3user",
        //   usages: {
        //     Entries: [ ],
        //     Summary: [
        //       0,
        //       0,
        //       0
        //     ],
        //     CapacityUsed: [
        //       {
        //       Buckets: [ ]
        //       }
        //     ]
        //   }
        // }
      ]
    }
  },
  mounted () {
    usage().then(res => {
      console.log(res);
      this.list = res
    }).catch(err => {

    })
  },
  components: {
    RingChart,
  },
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
  }
}

</style>