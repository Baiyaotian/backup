<template>
    <div class="addtabletop">
        <el-form
      :model="form"
      :label-position="labelPosition"
      label-width="80px"
      :rules="rules"
      ref="form"
      
    >
      <el-form-item label="主机名 :" :label-width="formLabelWidth" prop="hostname">
        <el-input v-model="form.hostname" autocomplete="off" placeholder="请输入主机名"></el-input>
      </el-form-item>
      <el-form-item label="备份客户端IP:" :label-width="formLabelWidth" prop="ipv4">
        <el-input v-model="form.ipv4" autocomplete="off" placeholder="请输入客户端IP"></el-input>
      </el-form-item>
      <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username">
        <el-input v-model="form.username" autocomplete="off" placeholder="请输入客户端用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" type="password" placeholder="请输入客户端密码"></el-input>
      </el-form-item>
     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" >取 消</el-button>
      <el-button type="primary" @click.native="addClick" class="btn_margin_left">创 建</el-button>
    </div>
    </div>
</template>

<script>
import { validateIP, ipToint, isMB } from "../utils/validate"
import { addClient } from '@/api/api'
export default {
  props: ["is_category", "value"],
  data() {
    return {
      form: {
        hostname: '',
        username: '',
        password: '',
        ipv4: ''
      },
      rules: {
        hostname: [
          { required: true, message: "请输入主机名", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入备份用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        ipv4: [
          { required: true, message: "请输入备份客户端IP", trigger: "blur" },
          { validator: validateIP, trigger: 'change' }
        ],
      },
      formLabelWidth: "120px",
      labelPosition: "left"
    };
  },
  methods: {
    addClick() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addClient({
            ...this.form,
            ipv4: ipToint(this.form.ipv4)
          }).then(res => {
            console.log(res);
            this.$emit("resflesh-client", true);
            this.$emit("input", false);
          }).
          catch(err => {
            console.log('添加失败');
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
  }
  // methods: {
  //     confirmSource () {
  //         let resultObj = {}
  //         resultObj = {
  //             backup_name: this.addForm.backup_name,
  //             recoverip: this.addForm.recoverip,
  //             bucket: this.addForm.bucket,
  //             backup_group: this.addForm.backup_group,
  //             path_foot: this.addForm.path_foot,
  //             list: this.addForm.list,
  //             start_time: this.addForm.start_time,
  //             imp_time: this.addForm.imp_time,
  //             hold_time: this.addForm.hold_time,
  //             flow_control: this.addForm.flow_control,
  //             status: this.addForm.status,
  //         }
  //         this.$refs.addForm.validate((valid) => {
  //             if (vailid) {
  //                 this.$emit('changeKafka', {
  //                     loading: true,
  //                     msg: '添加数据中，请稍等...',
  //                     category:this.isCategory
  //                 })
  //                 if (this.isButton) {
  //                     resultObj.client_id =this.addKafkaForm.client_id
  //                     resultObj.group_id = this.addKafkaForm.group_id
  //                     resultObj.topic = this.addKafkaForm.topic
  //                     resultObj.filter = this.addKafkaForm.filter
  //                     resultObj.kafkaIpList = this.addKafkaForm.kafkaIpList

  //                 }
  //             }

  //         })
  //     }
  // },
  // watch: {
      
  // },
// };
</script>

<style lang="scss" scoped>

</style>