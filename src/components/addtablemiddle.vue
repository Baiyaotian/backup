<template>
    <div class="addtablemiddle">
      <el-form :model="form" :label-position="labelPosition" label-width="80px" ref="form">

        <el-form-item label="对象存储地址:" :label-width="formLabelWidth" prop="endpoint.address" >
          <!-- <el-input  autocomplete="off" ></el-input> -->
          <el-select v-model="form.endpoint.address" style="width:100%">
            <el-option v-for="(item, index) in endpointList" :key="index" :value="item.address" :label="item.address"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="accessKey :" :label-width="formLabelWidth" prop="accessKey">
          <el-input v-model="form.accessKey" autocomplete="off" placeholder="accessKey"></el-input>
        </el-form-item>
        <el-form-item label="secretKey:" :label-width="formLabelWidth" prop="secretKey">
          <el-input v-model="form.secretKey" autocomplete="off" placeholder="secretKey"></el-input>
        </el-form-item>
        
        <el-form-item label="quota:" :label-width="formLabelWidth" prop="quota">
          <el-input v-model="form.quota" autocomplete="off" placeholder="quota" style="width:94%; margin-right:10px"></el-input> GB
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" >取 消</el-button>
      <el-button type="primary" @click="addClick" class="btn_margin_left">创 建</el-button>
    </div>
    </div>
</template>

<script>
import { validateIP, isMB } from "../utils/validate";
import { addTenant, endPoint } from '@/api/api'
// console.log(validateIP);
// import { resource, } from ''
// import addSource from './components/addSource'
export default {
  props: ["is_category", "value"],
  data() {
    return {
      form: {
        accessKey: "",
        secretKey: "",
        endpoint: {
          address: ''
        },
        quota: 0
      },
      formLabelWidth: "120px",
      labelPosition: "left",
      endpointList: []
    };
  },
  methods: {
    addClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addTenant({
              ...this.form,
              quota: Number(this.form.quota)
          }).then(res =>{
            this.$emit("resflesh-click", true);
            this.$emit("input", false);
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      });
    },
    close(){
      this.$emit("input", false);
      // console.log(1)
      
    },
    selectvale(){
      "this.form.backup_group === 'text'" ?  "this.form.foot.diable === 'true'" : "this.form.foot.diable === 'false'"
        console.log(1)
      }
      
    },
    mounted() {
      endPoint().then(res => {
        this.endpointList = res
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>