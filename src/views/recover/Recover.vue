<template>
	<div class="recover">
		<div class="container-content">
			<!-- 序号	备份序号	备份名称	备份客户IP	类型	恢复路径/脚本	执行时间	完成状态	执行 -->
			<div :style="{padding:'10px'}">
				<el-row :gutter="20">
					<el-col :span="12" :offset="12">
						<div class="grid-content bg-purple">
							<el-input :placeholder="placeholder" v-model="input3" class="input-with-select">
								<el-select
									v-model="select"
									slot="prepend"
									placeholder="请选择"
									@change="searchChange"
									style="width: 150px"
								>
									<el-option label="备份名称" value="backupName"></el-option>
									<el-option label="恢复客户端IP" value="client"></el-option>
								</el-select>
								<el-button slot="append" icon="el-icon-search" @click.native="searchclick"></el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-table
				border="border"
				header-row-class-name="table-header-class"
				:data="tableData"
				style="width: 100%"
				ref="backTable"
				@row-click="tableRowClick"
				@sort-change="tableSortChange"
				@filter-change="tableFilter"
			>
				<el-table-column label="Id" prop="id" align="center" min-width="60px"></el-table-column>
				<el-table-column prop="backupRecordId" align="center" min-width="60px" label="备份历史Id"></el-table-column>
				<el-table-column prop="backupName" align="center" min-width="80" label="备份名称"></el-table-column>
				<el-table-column
					prop="recovertype"
					column-key="recovertype"
					align="center"
					min-width="60"
					label="类型"
					:filters="backupFilters"
					:filter-multiple="false"
				></el-table-column>
				<el-table-column prop="client" align="center" sortable="custom" min-width="120" label="恢复客户IP"></el-table-column>
				<el-table-column prop="username" align="center" min-width="80" label="租户"></el-table-column>
				<el-table-column prop="address" align="center" min-width="100" label="对象存储地址">
					<template slot-scope="scope">
						<el-tooltip effect="dark" :content="scope.row.address" placement="top-start">
							<span>{{scope.row.displayName}}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="bucket" align="center" min-width="80" label="桶"></el-table-column>
				<el-table-column prop="startTime" align="center" min-width="150px" label="开始时间"></el-table-column>
				<el-table-column prop="endTime" align="center" min-width="150px" label="结束时间"></el-table-column>
				<el-table-column prop="state" align="center" min-width="80" label="完成状态">
					<template slot-scope="scope">
						<el-tag size="small" :type="scope.row.color" effect="dark">{{scope.row.state}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="prop" align="center" width="120px" label="操作">
					<template slot-scope="scope">
						<div class="btn-size">
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button
									@click="removeRecovery(scope.row)"
									size="small"
									type="danger"
									icon="el-icon-delete"
									:disabled="scope.row.state === '等待中' || scope.row.state === '运行中'"
								></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="中断" placement="top-start">
								<el-button
									@click="interRecovery(scope.row)"
									:disabled="scope.row.state !== '等待中' && scope.row.state !== '运行中'"
									size="small"
									icon="iconfont icon-Interrupts"
									class="tiggerbtn"
								></el-button>
							</el-tooltip>
						</div>
					</template>
				</el-table-column>
				<el-table-column type="expand" width="1">
					<template slot-scope="scope">
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">id: {{scope.row.id}}</el-col>
								<el-col :span="12">uuid: {{scope.row.uuid}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">备份名称: {{scope.row.backupName}}</el-col>
								<el-col :span="12">类型: {{scope.row.recovertype}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">恢复客户IP: {{scope.row.client}}</el-col>
								<el-col :span="12">租户: {{scope.row.username}}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">客户端信息</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">对象存储地址: {{scope.row.address}}</el-col>
								<el-col :span="12">桶: {{scope.row.bucket}}</el-col>
							</el-row>
						</div>
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">开始时间: {{scope.row.startTime}}</el-col>
								<el-col :span="12">结束时间: {{scope.row.endTime}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">完成状态: {{scope.row.state }}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">恢复历史:</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">{{scope.row.recovertype === '文件' ? '恢复路径' : '恢复脚本'}}: {{scope.row.data.data}}</el-col>
								<el-col :span="12">挂载点: {{scope.row.data.mountPoint}}</el-col>
								<el-col :span="12">结束时间: {{scope.row.endTime}}</el-col>
							</el-row>
						</div>
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12" style="white-space: pre-wrap;">错误信息：
									<div style="color: #ff0000;margin-left: 40px;">{{scope.row.errorMessage}}</div>
								</el-col>
							</el-row>
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
	import { recovery, deleteRecovery, interruptRecovery } from "@/api/api";
	import {
		BACKUP_GROUP_TYPE,
		RECORD_STATE,
		RECORD_STATE_COLOR
	} from "@/utils/type";
	import { intToip, formatDate } from "@/utils/validate";
	export default {
		data() {
			return {
				tableData: [],
				isCategory: null,
				isAddDialog: false,
				currentPages: 1,
				placeholder: "请选择筛选字段",
				clientList: [],
				input3: "",
				select: "",
				maxHeight: document.documentElement.clientHeight - 220,
				total: 0,
				size: 10,
				sort: "",
				order: "",
				backupFilters: []
			};
		},

		methods: {
			runOrStop(item) {
				console.log(item);
				this.tableData.findIndex(ele => {
					if (ele.id === item.id) {
						if (ele.status == "stop") {
							console.log(2);
							// this.$set(this.tableData,"status","run")
							ele.status = "run";
							console.log(2, ele.status);
						} else {
							// this.$set(this.tableData, "status", "stop");
							ele.status = "stop";
							console.log(3, ele.status);
						}
					}
				});
			},
			getRecoery(page, field, value, sort, order) {
				if (field === "client") {
					value = btoa(value);
				}
				let objData =
					field && value
						? {
								page: page,
								size: this.size,
								[field]: value
						  }
						: {
								page,
								size: this.size
						  };
				recovery({
					...objData,
					sort,
					order
				}).then(res => {
					this.tableData = res.content.map(item => {
						return {
							...item,
							backupRecordId: item.backupRecord.id,
							username: item.backupRecord.backupDetail.tenant.username,
							backupName: item.backupRecord.backupDetail.backupName,
							recovertype:
								BACKUP_GROUP_TYPE[item.backupRecord.backupDetail.backupGroup],
							client: intToip(item.client.ipv4),
							bucket: item.backupRecord.backupDetail.bucket,
							address: item.backupRecord.backupDetail.tenant.endpoint.address,
							displayName:
								item.backupRecord.backupDetail.tenant.endpoint.displayName,
							state: RECORD_STATE[item.state],
							color: RECORD_STATE_COLOR[item.state],
							endTime: formatDate(item.endTime),
							startTime: formatDate(item.startTime),
							input3: "",
							maxHeight: document.documentElement.clientHeight - 220
						};
					});
					this.total = res.totalElements;
				});
			},
			removeRecovery(item) {
				this.$confirm(
					"此操作将永久删除id为 " + item.id + " 的恢复历史,是否继续?",
					"提示",
					{ type: "warning" }
				)
					.then(() => {
						deleteRecovery(item.id).then(res => {
							this.$message.success("删除成功");
							this.getRecoery(
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
			handleCurrentChange(val) {
				this.currentPages = val;
				this.getRecoery(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			interRecovery(item) {
				this.$confirm(`此操作将中断ID为${item.id}的恢复任务, 是否继续?`, "提示", {
					type: "warning"
				})
					.then(() => {
						interruptRecovery(item.id, {
							option: "interrupt"
						}).then(res => {
							this.getRecoery(
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
			tableRowClick(row) {
				// console.log(row)
				if (row.data && row.data !== '""') {
					if (typeof row.data === "string") {
						row.data = JSON.parse(row.data);
						// if (row.recovertype === '文件') {
						// 	// row.data.exclude = row.data.data.join(", ");
						// 	// row.data.mountPoint = row.data.mountPoint.join(", ");
						// }
					}
				}
				this.tableData.forEach(item => {
					if (item.uuid !== row.uuid) {
						this.$refs.backTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.backTable.toggleRowExpansion(row);
			},
			searchChange(val) {
				this.placeholder = `请输入${
					val === "backupName"
						? "备份名称"
						: val === "recovertype"
						? "类型"
						: "恢复客户端IP"
				}`;
			},
			searchclick() {
				this.getRecoery(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			tableSortChange({ column, prop, order }) {
				console.log(column, prop, order);
				this.sort = prop;
				this.order =
					order === "ascending" ? "asc" : order === "descending" ? "desc" : " ";
				this.getRecoery(
					this.currentPage,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			hanldleSizeChange(sizes) {
				this.size = sizes;
				this.getRecoery(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			tableFilter(filters) {
				console.log(Object.values(filters).flat(), Object.keys(filters));
				this.getRecoery(
					this.currentPages,
					"type",
					Object.values(filters).flat()[0],
					this.sort,
					this.order
				);
			}
		},
		mounted() {
			this.getRecoery(
				this.currentPages,
				this.select,
				this.input3,
				this.sort,
				this.order
			);
			for (let k in BACKUP_GROUP_TYPE) {
				this.backupFilters.push({
					text: BACKUP_GROUP_TYPE[k],
					value: k
				});
			}
		}
	};
</script>

<style lang="less" scoped>
@import url("../../assets/css/reset.css");

.recover {
	width: 100%;
	height: 100%;
	.container-content {
		// height: 600px;
		background-color: #fff;
		border-radius: 10px;
		padding: 10px;
		.el-table--scrollable-x .el-table__body-wrapper {
			overflow-x: none;
		}
	}
}
.btn-size .el-button {
	padding: 8px 12px;
}

.tiggerbtn {
	background-color: rgb(255, 201, 0);
	border: none;
	color: #fff;
}
.tiggerbtn.is-disabled {
	color: #fff;
	background-color: rgba(255, 201, 0, 0.4);
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
.block {
	margin-top: 10px;
}
</style>