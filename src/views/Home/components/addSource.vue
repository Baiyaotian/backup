<template>
	<div class="addSource">
		<el-form :model="addForm" label-position="right"  :rules="addFormRules" ref="form" class="demo-ruleForm" label-width="120px">
			<el-form-item label="备份任务名 :"  prop="backupName">
				<el-input v-model="addForm.backupName" autocomplete="off" placeholder="请输入备注任务名"></el-input>
			</el-form-item>
			<el-form-item label="备份客户端IP:"  prop="ipv4">
				<el-select v-model="addForm.ipv4" >
					<el-option :label="item" :value="item" v-for="(item, index) in clientIpList" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="租户:"  prop="username">
				<el-select v-model="addForm.username" filterable @change="usernameChange" lable>
					<el-option :label="item.username" :value="`${item.username}|${item.address}`" v-for="(item, index) in tenantList" :key="index">
						<span style="float:left">{{item.username}}</span>
						<span style="float:right;font-size:12px; color:#ccc">{{item.address}}</span>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="对象存储桶 :"  prop="bucket" :span="10">
				<el-select v-model="addForm.bucket">
					<el-option :label="item" :value="item" v-for="(item, index) in bucketList" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="挂载点:"  prop="mountPoint" :span="10">
				<el-input type="input" v-model="addForm.mountPoint"></el-input>
			</el-form-item>
			<el-form-item label="备份类型 :"  prop="backupGroup" :span="10">
				<el-select v-model="addForm.backupGroup" placeholder="请选择" @change="selectvale">
					<el-option :label="item" :value="key" v-for="(item, key, index) in backupGroupList" :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item v-if="addForm.backupGroup == 1" label="备份路径 :"  prop="baseDir">
				<el-input type="textarea" v-model="addForm.baseDir"></el-input>
			</el-form-item>
			<el-form-item v-if="addForm.backupGroup == 1" label="文件列表 :"  prop="include">
				<el-input type="input" @change="includeChange" v-model="addForm.include"></el-input>
				<div>
					<el-tag style="margin-right:5px" effect="dark" closable v-for="(item, index) in includeList" :key="index" @close="includeClose(item)">{{item}}</el-tag>
				</div>
			</el-form-item>
			<el-form-item v-if="addForm.backupGroup == 1" label="排除文件列表 :"  prop="exclude">
				<el-input type="input" @change="excludeChange" v-model="addForm.exclude"></el-input>
				<div>
					<el-tag  effect="dark" closable v-for="(item, index) in excludeList" :key="index"  @close="excludeClose(item)">{{item}}</el-tag>
				</div>
			</el-form-item>
			<el-form-item v-if="addForm.backupGroup != 1" label="备份脚本 :"  prop="script">
				<el-input type="textarea" v-model="addForm.script"></el-input>
			</el-form-item>
			<el-form-item label="备份起始时间 :"  prop="startTime">
				<el-col :span="10">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.startTime" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="备份结束时间 :"  prop="endTime">
				<el-col :span="10">
					<el-date-picker  type="datetime" placeholder="选择日期" v-model="addForm.endTime" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="corn表达式 :"  prop="cronExpression">
				<el-col>
					<corntn v-show="cronShow" v-model="addForm.cronExpression"></corntn>
					<el-input v-model="addForm.cronExpression" auto-complete="off" >
						<el-button slot="append" v-if="!cronShow" @click.native="cronShow = true" icon="el-icon-arrow-up" title="打开图形配置"></el-button>
						<el-button slot="append" v-else @click.native="cronShow = false" icon="el-icon-arrow-down" title="关闭图形配置"></el-button>
				</el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="备份保留时间 :"  prop="holdTime">
				<el-col :span="10">
					<el-input v-model="addForm.holdTime" autocomplete="off" placeholder="1"></el-input>
				</el-col>
				<el-col class="line" :span="1" style="margin-left:25px">-</el-col>
				<el-col :span="10">
					<el-select v-model="addForm.holdTimeType" placeholder="天" style="width: 100%">
						<el-option label="天" value="0"></el-option>
						<el-option label="月" value="1"></el-option>
						<el-option label="年" value="2"></el-option>
					</el-select>
				</el-col>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click.native="addClick" class="btn_margin_left">创 建</el-button>
		</div>
	</div>
</template>
<script>
	import corntn from '../../../components/cron/crontn'
	import { validateIP, isMB, intToip, ipToint} from '@/utils/validate'
	import { client, tenant, bucket } from '@/api/api'
	import { addFrom } from '@/api/api'
	import { BACKUP_GROUP_TYPE } from '@/utils/type'
	// console.log(validateIP)
	
	// import { resource, } from ''
	
	// import addSource from './components/addSource'
	
	export default {
		components: {
    		corntn
  		},
		props: ['is_category', 'value'],
		data() {
			return {
				includeList: [],
				excludeList: [],
				clientIpList: [],
				tenantList: [],
				bucketList: [],
				backupGroupList: BACKUP_GROUP_TYPE,
				dirData: {
					baseDir:  '',
					include: [],
					exclude: []
				},
				cronShow: false,
				addForm: {
					backupName: '',  //备份任务名
					backupGroup: '', // 备份类型
					// client: {
					// 	ipv4: '', // 备份客户端IP
					// },
					ipv4: '',
					username: '',
					// tenant: {
					// 	username: '', // 租户名字
					// 	endpoint: {
					// 		address: '' //租户的address
					// 	}
					// },
					bucket: '', // 对象存储桶
					baseDir: '', //备份路径
					include: '', // 文件列表
					exclude: '', //排除文件列表
					script: '', // 备份脚本
					// data: {
					// 	baseDir: '', //备份路径
					// 	include: [], // 文件列表
					// 	exclude: [], //排除文件列表
					// 	script: '' // 备份脚本
					// },
					startTime: '',
					endTime: '',
					cronExpression: '0 0/5 * * * ? * ' ,//表达式
					holdTimeType: '0', 
					holdTime: '999999999999',
					mountPoint: '/buckup'
				},
				addFormRules: {
					backupName: [{required: true,message: '请选输入备份任务名',	trigger: 'change'}],
					backupGroup: [{required: true,message: '请选输入备份类型',	trigger: 'change'}],
					ipv4: [{required: true,message: '请选输入备份客户端IP',	trigger: 'change'}],
					username: [{required: true,message: '请选输入租户名字',	trigger: 'change'}],
					bucket: [{required: true,message: '请选输入对象存储桶',	trigger: 'change'}],
					// baseDir: [{required: true,message: '请选输入备份路径',	trigger: 'change'}],
					// include: [{required: true,message: '请选输入文件列表',	trigger: 'change'}],
					// exclude: [{required: true,message: '请选输入排除文件列表',	trigger: 'change'}],
					// script: [{required: true,message: '请选输入备份脚本',	trigger: 'change'}],
					startTime: [{required: true,message: '请选输入备份起始时间',	trigger: 'change', type: 'date'}],
					endTime: [{required: true,message: '请选输入备份结束时间',	trigger: 'change', type: 'date'}],
					cronExpression: [{required: true,message: '请选输入表达式',	trigger: 'change'}],
					mountPoint: [{required: true,message: '请选输入挂载点',	trigger: 'change'}],
					holdTimeType: [{required: true,message: '不能为空',	trigger: 'change'}],
					holdTime: [{required: true,message: '不能为空',	trigger: 'change'}],
				}
			}	
		},	
		methods: {	
			addClick() {
				if (this.addForm.backupGroup === '1') {
					this.dirData = {
						baseDir: this.addForm.baseDir,
						include: this.includeList,
						exclude: this.excludeList,
					}
				} else {
					this.dirData = {
						scripts: this.addForm.script
					}
				}
				this.$refs.form.validate(valid => {
					if (valid) {
						let formData = {
							backupName: this.addForm.backupName,  //备份任务名
							backupGroup: this.addForm.backupGroup, // 备份类型
							client: {
								ipv4: ipToint(this.addForm.ipv4), // 备份客户端IP
							},
							tenant: {
								username: this.addForm.username.split('|')[0], // 租户名字
								endpoint: {
									address: this.addForm.username.split('|')[1] //租户的address
								}
							},
							bucket: this.addForm.bucket, // 对象存储桶
							data: JSON.stringify(this.dirData),
							startTime: this.addForm.startTime.getTime(),
							endTime: this.addForm.endTime.getTime(),
							cronExpression: this.addForm.cronExpression,//表达式
							holdTimeType: this.addForm.holdTimeType, 
							holdTime: this.addForm.holdTime,
							mountPoint: this.addForm.mountPoint
						}
						console.log(formData);
						addFrom(formData).then(res => {
							this.$emit('input',  false)
							this.$emit('resflesh-click', {
								status: true
							})
						})
					}
				});
			},
			close() {
	
				this.$emit('input', false)
	
				// console.log(1)
	
			},
			selectvale(val) {
				
			},
			getBucket(username, endpoint) {
				bucket({
					username,
					endpoint
				}).then(res => {
					console.log(res);
					this.bucketList = res.map(item => item.name)
				})
			},
			usernameChange (val) {
				let [ value, label ] = val.split('|')
				this.getBucket(value, btoa(label))
			},
			includeChange (value) {
				this.includeList.push(value)
				this.addForm.include = ''
			},
			includeClose (name) {
				let index = this.includeList.findIndex(item => item === name)
				this.includeList.splice(index, 1)
			},
			excludeChange (value) {
				this.excludeList.push(value)
			},
			excludeClose (name) {
				let index = this.excludeList.findIndex(item => item === name)
				this.excludeList.splice(index, 1)
			},
		},
		mounted() {
			console.log(this.backupGroupList);
			client().then(res => {
				this.clientIpList = res.map(item => intToip(item.ipv4))
			})
			tenant().then(res => {
				console.log(res);
				this.tenantList = res.map(item => {
					return {
						...item,
						address: item.endpoint.address
					}
				})
			})
		},
	}
</script>
<style lang="less" scoped>
	.container-content {
		height: 600px;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
	}
	.el-button+.el-button {
		margin-left: 0px;
		margin-top: 10px;
	}
	.el-dialog__body {
		padding: 30px 30px;
	}
	.dialog-footer .btn_margin_left {
		margin-left: 20px;
	}
</style>