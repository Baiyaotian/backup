<template>
	<div class="home" height="100%">
		<div class="container-content">
			<div :style="{padding:'10px'}">
				<!-- 新增创建计划表单 -->
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<el-button type="primary" size="small" @click="addFormVisible = true">新建计划</el-button>
							<!-- 导出excel -->
							<el-button size="small" type="primary" @click="exportExcel">导出excel表格</el-button>
							<el-dialog title="创建备份计划" :visible.sync="addFormVisible">
								<addSource @resflesh-click="resCick" v-model="addFormVisible"></addSource>
							</el-dialog>
							<el-dialog title="编辑备份计划" :visible.sync="editFormVisible">
								<editSource @resflesh-click="resCick" v-model="editFormVisible" :backup-data="backupData"/>
							</el-dialog>
						</div>
					</el-col>
					<el-col :span="12" :offset="6">
						<div class="grid-content bg-purple">
							<el-input :placeholder="placeholder" v-model="input3" class="input-with-select">
								<el-select
									v-model="select"
									slot="prepend"
									placeholder="请选择"
									@change="searchChange"
									style="width: 150px"
								>
									<el-option label="备份任务名" value="backupName"></el-option>
									<el-option label="客户端IP" value="client"></el-option>
								</el-select>
								<el-button slot="append" icon="el-icon-search" @click.native="searchclick"></el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-table
				border="border"
				stripe
				v-loading="tableData.loading"
				header-row-class-name="table-header-class"
				:data="tableData"
				style="width: 100%"
				ref="backTable"
				@row-click="tableRowClick"
				@sort-change="tableSortChange"
        @filter-change="tableFilter"
			>
				<!-- <el-table-column label="全选" type="selection" align="center" width="60" sortable></el-table-column> -->
				<el-table-column
					prop="backupName"
					align="center"
					min-width="120"
					sortable="custom"
					label="备份任务名"
				></el-table-column>
				<el-table-column
					prop="client"
					show-overflow-tooltip
					align="center"
					min-width="120px"
					sortable="custom"
					label="客户端IP"
				></el-table-column>
				<el-table-column prop="bucket" align="center" min-width="82" label="对象储存桶"></el-table-column>
				<el-table-column
					prop="backupGroup"
					align="center"
					min-width="85"
					label="备份类型"
          column-key="backupGroup"
					:filters="backupFilters"
          :filter-multiple="false"
				></el-table-column>
				<el-table-column prop="cronExpression" align="center" min-width="90" label="cron表达式"></el-table-column>
				<el-table-column prop="state" align="center" min-width="108" label="状态">
					<template slot-scope="scope">
						<el-tag size="small" :type="scope.row.color" effect="dark">{{scope.row.state}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="prop" align="center" label="操作" width="300">
					<template slot-scope="scope">
						<div class="btn-size">
							<el-tooltip placement="top">
								<div slot="content">
									{{scope.row.cronTriggerList[0].state === 0x02 ? '运行' : '暂停'
									}}
								</div>
								<el-button
									style="font-size:12px"
									v-if="scope.row.cronTriggerList[0].state !== 0x00"
									@click="runOrStop(scope.row)"
									size="small"
									:type="scope.row.cronTriggerList[0].state=== 0x02? 'success' : 'warning'"
									:icon="scope.row.icon"
								></el-button>
								<el-button
									v-else
									disabled
									size="small"
									:type="scope.row.cronTriggerList[0].state=== 0x02? 'success' : 'danger'"
									:icon="scope.row.icon"
								></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="触发" placement="top-start">
								<el-button
									@click="tiggerBackup(scope.row)"
									size="small"
									type="primary"
									icon="iconfont icon-trigger"
								></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="中断" placement="top-start">
								<el-button
									@click="interruptBackup(scope.row)"
									size="small"
									icon="iconfont icon-Interrupts"
									class="tiggerbtn"
								></el-button>
							</el-tooltip>

							<!-- 修改删除 -->
							<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
								<el-button
									size="small"
									type="warning"
									icon="el-icon-edit"
									@click.native="editSoure(scope.row)"
								></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button size="small" type="danger" icon="el-icon-delete" @click="removeUser(scope.row)"></el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
				<el-table-column type="expand" width="1">
					<template slot-scope="scope">
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">uuid: {{scope.row.uuid}}</el-col>
								<el-col :span="12">备份任务名: {{scope.row.backupName}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">备份类型: {{scope.row.backupGroup}}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">客户端信息</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">备份客户端IP: {{scope.row.client}}</el-col>
								<el-col :span="12">用户名: {{scope.row.client.username}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">备份主机名: {{scope.row.hostname}}</el-col>
							</el-row>
						</div>
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">租户信息</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">租户: {{scope.row.tenant.username}}</el-col>
								<el-col :span="12">地址: {{scope.row.tenant.endpoint.address}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">类型: {{scope.row.tenant.endpoint.storageType===1 ? 'Ceph' : 'OBS' }}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">桶: {{scope.row.bucket}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">开始时间: {{scope.row.startTime}}</el-col>
								<el-col :span="12">结束时间: {{scope.row.endTime}}</el-col>
							</el-row>
							<el-row>
								<el-col
									:span="12"
								>备份保留时间: {{scope.row.holdTime}}{{scope.row.holdType === 0 ? '天' : scope.row.holdType === 1 ? '月' : '年'}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">挂载点: {{scope.row.mountPoint}}</el-col>
								<el-col :span="12">cron表达式: {{scope.row.cronExpression}}</el-col>
							</el-row>
							<div class="this-backgroundcol" :span="24">
								<el-row>
									<el-col :span="12">备份信息</el-col>
								</el-row>
								<el-row>
									<el-col
										:span="12"
										v-for="(item, key, index) in scope.row.backupData"
										:key="index"
									>{{key}}: {{item}}</el-col>
								</el-row>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination
					:current-page="currentPages"
					@current-change="handleCurrentChange"
					@size-change="hanldleSizeChange"
					:page-size="10"
					:page-sizes="[10, 20, 50]"
					layout="sizes, prev, pager, next, jumper"
					:total="total"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import { backup, deleteBackup, resumeBackup, backups } from "@/api/api";
	import {
		BACKUP_STATE,
		BACKUP_STATE_COLOR,
		BACKUP_GROUP_TYPE,
		BACKUP_STATE_ICON
	} from "@/utils/type";
	import { formatDate } from "@/utils/validate";
	import addSource from "./components/addSource";
	import editSource from "./components/editSource";
	import { export2Excel } from "@/assets/util";
	export default {
		name: "home",
		data() {
			return {
				operateType: "add",
				tableData: [],
				isCategory: null,
				isAddDialog: false,
				addFormVisible: false,
				editFormVisible: false,
				ruleForm: {
					name: "aaa",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: ""
				},
				formLabelWidth: "120px",
				labelPosition: "left",
				backupData: {},
				input3: "",
				select: "",
				maxHeight: document.documentElement.clientHeight - 270,
				placeholder: "请选择筛选字段",
				currentPages: 1,
				total: 0,
				size: 10,
				order: "",
				sort: "",
				columns: [],
				backupFilters: [],
				flag: false
			};
		},
		components: { addSource, editSource },
		methods: {
			getBackup(page, field, value, sort, order) {
				if (field === "client") {
					value = btoa(value);
				}
				let objData = field && value ? { page: page, [field]: value, size: this.size } : { page, size: this.size };
				backup({
					...objData,
					sort,
					order
				}).then(res => {
					this.tableData = res.content.map(item => {
						return {
							...item,
							...item.client,
							client: this.intToip(item.client.ipv4),
							state: BACKUP_STATE[item.cronTriggerList[0].state],
							color: BACKUP_STATE_COLOR[item.cronTriggerList[0].state],
							backupGroup: BACKUP_GROUP_TYPE[item.backupGroup],
							icon: BACKUP_STATE_ICON[item.cronTriggerList[0].state],
							endTime: formatDate(item.endTime),
							startTime: formatDate(item.startTime)
						};
					});
					this.total = res.totalElements;
				});
			},
			intToip(str) {
				var arr = new Array();
				arr[0] = (str >>> 24) >>> 0;
				arr[1] = ((str << 8) >>> 24) >>> 0;
				arr[2] = (str << 16) >>> 24;
				arr[3] = (str << 24) >>> 24;
				return (
					String(arr[0]) +
					"." +
					String(arr[1]) +
					"." +
					String(arr[2]) +
					"." +
					String(arr[3])
				);
			},
			runOrStop(item) {
				let option = "";
				if (item.cronTriggerList[0].state === 0x02) {
					option = "resume";
				} else {
					option = "pause";
				}
				resumeBackup(item.uuid, {
					option: option
				}).then(res => {
					this.getBackup(
						this.currentPages,
						this.select,
						this.input3,
						this.sort,
						this.order
					);
				});
			},
			tiggerBackup(item) {
				resumeBackup(item.uuid, {
					option: "trigger"
				}).then(res => {
					this.getBackup(
						this.currentPages,
						this.select,
						this.input3,
						this.sort,
						this.order
					);
				});
			},
			interruptBackup(item) {
				resumeBackup(item.uuid, {
					option: "interrupt"
				}).then(res => {
					this.getBackup(
						this.currentPages,
						this.select,
						this.input3,
						this.sort,
						this.order
					);
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						alert("submit!");
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			resCick(obj) {
				if (obj.status) {
					this.getBackup(
						this.currentPages,
						this.select,
						this.input3,
						this.sort,
						this.order
					);
				}
			},
			removeUser(item) {
				this.$confirm(
					"此操作将永久删除uuid为 " + item.uuid + " 的备份计划, 是否继续?",
					"提示",
					{ type: "warning" }
				)
					.then(() => {
						deleteBackup(item.uuid).then(res => {
							this.$message.success("删除成功");
							this.getBackup(
								this.currentPages,
								this.select,
								this.input3,
								this.sort,
								this.order
							);
						});
					})
					.catch(() => {
						this.$message.info("已取消操作!");
					});
			},
			editSoure(row) {
				console.log(row);
				this.backupData = row;
				this.editFormVisible = true;
			},
			getFrom() {
				tenant().then(res => {
					this.tableData = res.map(item => {
						return {
							...item,
							...item.endpoint
						};
					});
				});
			},
			tableRowClick(row) {
				if (row.backupData && row.backupData !== '""') {
					console.log(row.backupData);
					if (typeof row.backupData === "string") {
						row.backupData = JSON.parse(row.backupData);
						row.backupData.exclude = row.backupData.exclude.join(", ");
						row.backupData.include = row.backupData.include.join(", ");
					}
				}
				this.tableData.forEach(item => {
					if (item.uuid !== row.uuid) {
						this.$refs.backTable.toggleRowExpansion(item, false);
					}
					if (item.id !== row.id) {
						this.$refs.HistoryTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.backTable.toggleRowExpansion(row);
			},
			searchChange(val) {
				this.placeholder = `请输入${
					val === "backupName" ? "备份任务名" : "客户端Ip"
				}`;
			},
			searchclick() {
				this.getBackup(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			tableSortChange({ column, prop, order }) {
				this.sort = prop;
				this.order =
					order === "ascending" ? "asc" : order === "descending" ? "desc" : " ";
				this.getBackup(this.currentPages,	this.select,	this.input3,	this.sort,	this.order);
			},
			handleCurrentChange(val) {
				this.currentPages = val;
				this.getBackup(this.currentPages, this.select, this.input3);
			},
			handleCheckedCitiesChange() {},
			exportExcel() {
				this.columns.splice(0);
				backups().then(res => {
					for (let k in res[0]) {
						this.columns.push({
							title: k,
							key: k
						});
					}
				export2Excel(this.columns, res);
				})
      },
      tableFilter (filters) {
        this.getBackup(this.currentPages,	'type',	Object.values(filters).flat()[0],	this.sort,	this.order);
			},
			hanldleSizeChange (sizes) {
				this.size = sizes
				this.getBackup(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			}
		},
		mounted() {
			for (let k in BACKUP_GROUP_TYPE) {
				this.backupFilters.push({
					text: BACKUP_GROUP_TYPE[k],
					value: k
				});
			}
			this.getBackup(this.currentPages, this.select, this.input3);
		}
	};
</script>

<style lang="less" scoped>
body {
	margin: 0;
}
.home {
	width: 100%;
	.container-content {
		// height: 600px;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
		.el-table--scrollable-x .el-table__body-wrapper {
			overflow-x: none;
		}
	}
	.el-main {
		line-height: 0;
		text-align: left;
	}
	.table-header-class {
		height: 100px;
	}
	.btn-size .el-button {
		padding: 8px 12px;
	}
	.btn-size .el-button .iconfont {
		font-size: 12px !important;
	}
	.el-button + .el-button {
		// margin-left: 0px;
		margin-top: 15px;
	}
	.el-dialog__body {
		padding: 30px 30px;
	}
	.dialog-footer .btn_margin_left {
		margin-left: 20px;
	}
	.tiggerbtn {
		background-color: rgb(255, 201, 0);
		border: none;
		color: #fff;
	}
	.el-row {
		font-size: 12px;
		line-height: 18px;
	}
	.other-backgroundcol {
		background-color: #f2f6fc;
		padding: 10px 10px;
	}
	.this-backgroundcol {
		padding: 10px 10px;
	}
	.marginleft {
		margin-left: 100px;
	}
}
</style>