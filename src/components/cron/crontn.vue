<template>
  <div id="crontn">
   <el-form :model="form" label-width="80px" style=" margin-bottom:0px;margin-left: -80px">
      <el-form-item >
       <cron v-model="criondata"></cron>
       <span style="color: #E6A23C; font-size: 12px;">cron从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份</span>
     </el-form-item>
     <!-- <el-form-item >
       <el-input v-model="form.cronExpression" auto-complete="off" >
          <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-up" @click="showCronBox = true" title="打开图形配置"></el-button>
          <el-button slot="append" v-else icon="el-icon-arrow-down" @click="showCronBox = false" title="关闭图形配置"></el-button>
       </el-input>
     </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import cron from './cron'

export default {
  name: 'App',
  components: {
    cron
  },
  watch: {
    'criondata': {
      doop: true,
      handler(newVal) {
        if (newVal) {
          // this.form.cronExpression = Object.values(newVal).join('  ')
          this.$emit('input', Object.values(newVal).join('  '))
        }
      }
    }
  },
  data () {
    return {
      showCronBox: false,
      criondata: {},
      form: {
        cronExpression: ''
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 700px;
  color: #2c3e50;
  margin-top: 60px;
}
</style>