<template>
	<div class="editSource">
		<el-form :model="editForm" label-position="right"  ref="form" class="demo-ruleForm" label-width="120px">
			<el-form-item label="uuid :"  prop="uuid">
				<el-input v-model="editForm.uuid" disabled></el-input>
			</el-form-item>
			<el-form-item label="cron表达式 :"  prop="cronExpression" disabled>
				<el-input v-model="editForm.cronExpression" ></el-input>
			</el-form-item>
			<el-form-item label="备份结束时间:"  prop="endTime">
				<el-date-picker type="datetime" placeholder="选择日期" v-model="editForm.endTime" style="width: 100%;"></el-date-picker>
			</el-form-item>
			<el-form-item label="备份保留时间 :"  prop="holdTime">
				<el-col :span="10">
					<el-input v-model="editForm.holdTime" ></el-input>
				</el-col>
				<el-col class="line" :span="1" style="margin-left:25px">-</el-col>
				<el-col :span="10">
					<el-select v-model="editForm.holdType"  style="width: 100%">
						<el-option label="天" value="0"></el-option>
						<el-option label="月" value="1"></el-option>
						<el-option label="年" value="2"></el-option>
					</el-select>
				</el-col>
			</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="$emit('input', false)">取 消</el-button>
				<el-button type="primary"  class="btn_margin_left" @click="updateBackup">更 新</el-button>
			</div>
	</div>
</template>

<script>
import { editFrom } from '@/api/api' 
	export default {
		props: ['value', 'backup-data'],
		data() {
				return  {
					editForm: {
						uuid: '',
						cronExpression: '',
						endTime: '',
						holdTime: '',
						holdType: ''
					}
				}
			},
			mounted() {
				this.editForm = {
					uuid: this.backupData.uuid,
					cronExpression: this.backupData.cronExpression,
					endTime: new Date(this.backupData.endTime),
					holdTime: this.backupData.holdTime,
					holdType: this.backupData.holdType.toString()
				}
			},
			methods: {
				updateBackup() {
					editFrom({
						uuid: this.editForm.uuid,
						cronExpression: this.editForm.cronExpression,
						endTime: this.editForm.endTime ? this.editForm.endTime.getTime() : this.editForm.endTime,
						holdTime: Number(this.editForm.holdTime),
						holdType: this.editForm.holdType
					}).then(res => {
						this.$emit('input', false)
						this.$emit('resflesh-click', {
							status: true
						})
					})
				}
			},
			watch: {
				'backupData': {
					doop: true,
					handler(newVal) {
							this.editForm = {
								uuid: newVal.uuid,
								cronExpression: newVal.cronExpression,
								endTime: newVal.endTime,
								holdTime: newVal.holdTime,
								holdType: newVal.holdType.toString()
						}
					}
				}
			}
		}
</script>

<style lang="scss" scoped>

</style>