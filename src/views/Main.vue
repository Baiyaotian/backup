<template>
  <div id="app" class>
    <!-- <el-container>
      <el-container>
        <el-header style="padding:0"> -->
        <!-- <div style="height:60px; line-height:60px; width:290px; display: inline-block">自动化备份系统 KKBackup</div> -->
         
        <!-- </el-header>
        <el-main style="position: relative">
            
          <el-main style="margin-left: 300px">
            
          </el-main>
        </el-main>
        <el-footer>
            <el-row>
              <el-col>KKBackup v0.1</el-col>
            </el-row>
        </el-footer>
        
      </el-container>
    </el-container> -->
    <el-container>
      <el-header>
          <div class="bigtitle" style="color:rgb(255, 255, 255);height:60px; line-height:60px; width:300px;position: absolute;left:0; background-color: rgb(51, 61, 71);font-weight:blod; ">自动化备份系统 KKBackup</div>
         <el-menu
          style="margin-left:300px"
          :router="true"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="menuSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="home_index">备份计划</el-menu-item>
          <el-menu-item index="history_index">备份历史</el-menu-item>
          <el-menu-item index="recover_index">恢复历史</el-menu-item>
        </el-menu>
        <el-button style="right:75px" @click="clean">清理</el-button>
        <el-button style="right:10px" @click="loginOut">注销</el-button>
      </el-header>
      <el-container style="height: calc(100% - 60px)">
        <el-aside style="position:absoult; left:0;top:0">
          <div class="topcanvas">
            <carousel></carousel>
          </div>
          <div class="middlecanvas">
            <Table></Table>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer style="line-height:30px">
              <span>Copyright by 中国工商银行股份有限公司</span> <br>
              <span>KKBackup v0.1</span>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Carousel from "@/components/carousel";
import Table from "@/components/table";
import { EVENT_TYPE } from '@/utils/type'
import { logout, clean } from '@/api/api'
import Cookies from 'js-cookie'
import { NativeEventSource, EventSourcePolyfill} from 'event-source-polyfill'
export default {
  components: {
    // RingChart,
    Carousel,
    Table
  },
  data() {
    return {
      activeIndex: JSON.parse(localStorage.getItem("active")) || "/",
      activeIndex2: "1",
      activeOpened: JSON.parse(localStorage.getItem("openeds")),
      isCollapse: false,
      active: JSON.parse(localStorage.getItem("active")) || "/"
    };
  },
  methods: {
    menuSelect(index, indexPath) {
      this.active = index;
      localStorage.setItem("active", JSON.stringify(index));
      localStorage.setItem("openeds", JSON.stringify([indexPath[0]]));
    },
    tabAside() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(index, indexPath) {
      this.active = index;
      // console.log(indexPath);
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    loginOut () {
      logout().then(res => {
        Cookies.remove('access_token')
        this.$router.push({
          name: 'login'
        })
      })
    },
    clean() {
      clean().then(res => {
        this.$message.success('清理成功')
      }).catch(err => {
        this.$message.error(err.message)
      })
    } 
  },
  mounted() {
    const EventSource = NativeEventSource || EventSourcePolyfill
    let es = new EventSource('api/api/event')
    es.addEventListener('message', (e) => {
      this.$notify({
        title: JSON.parse(e.data).title,
        message: JSON.parse(e.data).message,
        type: EVENT_TYPE[JSON.parse(e.data).type]
      })
    })
  },
};
</script>

<style lang="less">
.bruce {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(135deg, #f66, #f90, #3c9, #09f, #66f) left
    center/400% 400%;
  animation: move 10s infinite;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.bigtitle{
  -webkit-box-shadow: inset 1px 1px 2px rgba(238, 238, 238, 0.2);
  font: normal 14px/14px Arial, Helvetica, sans-serif;
  font-size: 18px;
}
.el-header,
.el-footer {
  position: relative;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  padding: 0 !important;
  .el-button {
    position: absolute;
    right: 20px;
    top:10px
} 
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  .topcanvas {
    overflow: hidden;
  }
  .bottom {
    width: 100%;
    height: 200px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  padding: 20px 20px 0 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
