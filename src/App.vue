<template>
  <div style="width: 100%; height: 100%">
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
