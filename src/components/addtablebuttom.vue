<template>
    <div class="addtablebuttom">
        <el-form
      :model="form"
      :label-position="labelPosition"
      label-width="80px"
      :rules="rules"
      ref="form"
      
    >
      <el-form-item label="地址 :" :label-width="formLabelWidth" prop="address">
        <el-input v-model="form.address" autocomplete="off" placeholder="请输地址"></el-input>
      </el-form-item>
      <el-form-item label="https :" :label-width="formLabelWidth" prop="https">
         <el-radio-group v-model="form.https">
           <el-radio label="false">http</el-radio>
           <el-radio label="true" >https</el-radio>
         </el-radio-group>
      </el-form-item>
      <el-form-item label="存储类型 :" :label-width="formLabelWidth" prop="storageType">
        <el-radio-group v-model="form.storageType">
           <el-radio label="1" value="1">Ceph</el-radio>
           <el-radio label="2" value="2">华为OBS</el-radio>
         </el-radio-group>
      </el-form-item>
    <el-form-item label="名称 :" :label-width="formLabelWidth" prop="displayName">
        <el-input v-model="form.displayName" autocomplete="off" placeholder="请输名称"></el-input>
      </el-form-item>
     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" >取 消</el-button>
      <el-button type="primary" @click="addClick" class="btn_margin_left">创 建</el-button>
    </div>
    </div>
</template>

<script>
    import { validateIP } from "../utils/validate"; 
    import { addEndPoint } from '@/api/api'
    export default {
        data() {
            return {
              form: {
                address: '',
                https: '',
                storageType: '',
                displayName: '',
              },
              rules: {
                address: [
                  { required: true, message: "请输入地址", trigger: "blur" },
                  // { validator: validateIP, trigger: 'change' }
                ],
                displayName: [
                  { required: true, message: "请输入名称", trigger: "blur" },
                ],
                
              },
              formLabelWidth: "120px",
              labelPosition: "left"
            }
        },
        methods: {
            addClick() {
             //  console.log(typeof this.form.start_time)
             
             // console.log(this.$message)
             this.$refs.form.validate(valid => {
               if (valid) {
                 addEndPoint({
                   ...this.form
                 }).then(res => {
                    this.$emit("resflesh-click", true);
                    this.$emit("input", false);
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
    }
</script>

<style lang="scss" scoped>
    .el-radio{
      margin-right:70px
    }
</style>