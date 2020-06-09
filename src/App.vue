<template>
  <div id="app" class>
    <router-view />
  </div>
</template>
<script>
import Carousel from "@/components/carousel";
import Table from "@/components/table";
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
      console.log(index);
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
    }
  }
};
</script>

<style lang="less" scoped>

html,body{
  width:100%;
  height: 100%;
  margin: 0px;
}
#app{
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  .topcanvas {
    flex: 3;
    // padding: 20px;
    .carousel {
      height: 280px;
    }
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
