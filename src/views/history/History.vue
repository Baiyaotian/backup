<template>
	<div class="history" height="100%">
		<div class="container-content">
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
									style="width:150px"
								>
									<!-- <el-option label="备份历史ID" value="backupRecordId"></el-option> -->
									<el-option label="备份名称" value="backupName"></el-option>
									<el-option label="备份客户端Ip" value="ip"></el-option>
								</el-select>
								<el-button slot="append" icon="el-icon-search" @click.native="searchclick"></el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
			</div>
			<!-- 序号	备份名称	备份客户IP	执行时间	类型	备份路径/脚本	排除文件列表	完成状态	操作 -->
			<el-table
				border="border"
				header-row-class-name="table-header-class"
				:data="tableData"
				style="width: 100%"
				ref="HistoryTable"
				@row-click="tableRowClick"
				@sort-change="tableSortChange"
				@filter-change="tableFilter"
			>
				<!-- <el-table-column label="序号" type="index" align="center" width="60px"></el-table-column> -->
				<el-table-column label="Id" prop="id" align="center" width="60px" sortable="custom" fixed="left"></el-table-column>
				<el-table-column
					prop="backupName"
					align="center"
					min-width="120px"
					sortable="custom"
					label="备份名称"
				></el-table-column>
				<el-table-column
					prop="recovertype"
					column-key="recovertype"
					align="center"
					min-width="80px"
					label="类型"
					:filters="backupFilters"
					:filter-multiple="false"
				></el-table-column>
				<el-table-column prop="ip" align="center" min-width="150px" label="备份客户端IP"></el-table-column>
				<el-table-column prop="username" align="center" min-width="80px" label="租户"></el-table-column>
				<el-table-column prop="address" align="center" min-width="150px" label="对象存储地址">
					<template slot-scope="scope">
						<el-tooltip effect="dark" :content="scope.row.address" placement="top-start">
							<span>{{scope.row.displayName}}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="bucket" align="center" min-width="80px" label="桶"></el-table-column>
				<el-table-column prop="startTime" align="center" min-width="140px" label="开始时间"></el-table-column>
				<el-table-column prop="endTime" align="center" min-width="140px" label="结束时间"></el-table-column>
				<el-table-column prop="holdTime" align="center" min-width="140px" label="保留时间">
					<template slot-scope="scope">
						<span :style="{color: (new Date(scope.row.holdTime) - new Date()) <= 259200000 &&  (new Date(scope.row.holdTime) - new Date()) >= 0 ? '#f40' : ''}">{{scope.row.holdTime}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="state" align="center" min-width="80" label="完成状态">
					<template slot-scope="scope">
						<el-tag size="small" :type="scope.row.color" effect="dark">{{scope.row.state}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="prop" align="center" width="110px" label="操作" fixed="right">
					<template slot-scope="scope">
						<div class="btn-size">
							<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
								<el-button
									:disabled="scope.row.state === '等待中' ||  scope.row.state === '运行中'? true : false"
									size="small"
									type="danger"
									icon="el-icon-delete"
									@click="removeBackupRecord(scope.row)"
									style="margin-right: 10px"
								></el-button>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="恢复" placement="top-start">
								<el-button
									@click="recordBackup(scope.row)"
									:disabled="scope.row.state !== '完成' ? true : false"
									size="small"
									type="success"
									icon="el-icon-refresh-left"
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
								<el-col :span="12">备份类型: {{scope.row.recovertype}}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">客户端信息</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">备份客户端IP: {{scope.row.ip}}</el-col>
								<el-col :span="12">对象存储用户: {{scope.row.username}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">桶: {{scope.row.bucket}}</el-col>
							</el-row>
						</div>
						<div class="this-backgroundcol" :span="24">
							<el-row>
								<el-col :span="12">开始时间: {{scope.row.startTime}}</el-col>
								<el-col :span="12">结束时间: {{scope.row.endTime}}</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">保留时间: {{scope.row.holdTime }}</el-col>
							</el-row>
						</div>
						<div class="other-backgroundcol" :span="24">
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
		<el-dialog :visible.sync="recordVisible" title="备份恢复">
			<el-form :model="recordForm" label-position="right" label-width="120px">
				<el-form-item label="备份记录Id:" prop="backupRecordId">
					<el-input type="input" v-model="recordForm.backupRecordId" disabled></el-input>
				</el-form-item>
				<el-form-item label="恢复客户端:" prop="client">
					<el-select v-model="recordForm.client">
						<el-option :label="item.ip" :value="item.ip" v-for="(item, index) in clientList" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="backupGroup === 1 ? '恢复目标路径:' : '恢复脚本:'" prop="destingationOrScript">
					<el-input type="textarea" v-model="recordForm.destingationOrScript"></el-input>
				</el-form-item>
				<el-form-item label="挂载点:" prop="mountPoint">
					<el-input type="input" v-model="recordForm.mountPoint"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { record, deleteRecord, client, recoveryId } from "@/api/api";
	import {
		BACKUP_GROUP_TYPE,
		RECORD_STATE,
		RECORD_STATE_COLOR
	} from "@/utils/type";
	import { intToip, ipToint, formatDate } from "@/utils/validate";
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				tableData: [],
				isCategory: null,
				isAddDialog: false,
				total: 0,
				currentPages: 1,
				size: 10,
				recordVisible: false,
				recordForm: {
					backupRecordId: "",
					client: "",
					destingationOrScript: "/root/test",
					mountPoint: "/mnt/s3fs"
				},
				backupGroup: 1,
				input3: "",
				select: "",
				maxHeight: document.documentElement.clientHeight - 220,
				placeholder: "请选择筛选字段",
				sort: "",
        order: "",
        backupFilters: []
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.currentPages = val;
				this.getRecord(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			getRecord(page, field, value, sort, order) {
				if (field === "ip") {
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
				record({
					...objData,
					sort,
					order
				}).then(res => {
					this.tableData = res.content.map(item => {
						return {
							...item.backupDetail,
							...item,
							state: RECORD_STATE[item.state],
							ip: intToip(item.backupDetail.client.ipv4),
							recovertype: BACKUP_GROUP_TYPE[item.backupDetail.backupGroup],
							username: item.backupDetail.tenant.username,
							address: item.backupDetail.tenant.endpoint.address,
							displayName: item.backupDetail.tenant.endpoint.displayName,
							state: RECORD_STATE[item.state],
							color: RECORD_STATE_COLOR[item.state],
							endTime: formatDate(item.endTime),
							startTime: formatDate(item.startTime),
							holdTime: formatDate(item.holdTime)
							//errorMessage: item.errorMessage === null ? null : item.errorMessage.replace(/\n/g,'<br></br>')
						};
					});
					this.total = res.totalElements;
				});
			},
			removeBackupRecord(item) {
				this.$confirm(
					"此操作将永久删除id为 " + item.id + " 的备份历史,是否继续?",
					"提示",
					{ type: "warning" }
				)
					.then(() => {
						deleteRecord(item.id).then(res => {
							this.$message.success("删除成功");
							this.getRecord(
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
			recordBackup(item) {
				console.log(item);
				this.recordVisible = true;
				this.recordForm.backupRecordId = item.id;
				this.backupGroup = item.backupGroup;
			},
			confirm() {
				recoveryId({
					backupRecordId: this.recordForm.backupRecordId,
					client: {
						ipv4: ipToint(this.recordForm.client)
					},
					recoveryData: JSON.stringify({
						data: this.recordForm.destingationOrScript,
						mountPoint: this.recordForm.mountPoint
					})
				}).then(res => {
					this.getRecord(
						this.currentPages,
						this.select,
						this.input3,
						this.sort,
						this.order
					);
					this.recordVisible = false;
				});
			},
			tableRowClick(row) {
				if (row.backupData && row.backupData !== '""') {
					if (typeof row.backupData === "string") {
						row.backupData = JSON.parse(row.backupData);
						if (row.backupGroup === '文件') {
							row.backupData.exclude = row.backupData.exclude.join(", ");
							row.backupData.include = row.backupData.include.join(", ");
						}
					}
				}
				this.tableData.forEach(item => {
					if (item.id !== row.id) {
						this.$refs.HistoryTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.HistoryTable.toggleRowExpansion(row);
			},
			searchChange(val) {
				this.placeholder = `请输入${
					val === "backupRecordId"
						? "备份历史ID"
						: val === "backupName"
						? "备份名称"
						: "备份客户端IP"
				}`;
			},
			searchclick() {
				this.getRecord(
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
				this.getRecord(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			hanldleSizeChange(sizes) {
				this.size = sizes;
				this.getRecord(
					this.currentPages,
					this.select,
					this.input3,
					this.sort,
					this.order
				);
			},
			tableFilter(filters) {
				this.getRecord(
					this.currentPages,
					"type",
					Object.values(filters).flat()[0],
					this.sort,
					this.order
				);
			}
		},
		mounted() {
			this.getRecord(this.currentPages, this.select, this.input3);
			// client().then(res => {
			// 	this.clientList = res.map(item => intToip(item.ipv4));
      // });
      for (let k in BACKUP_GROUP_TYPE) {
				this.backupFilters.push({
					text: BACKUP_GROUP_TYPE[k],
					value: k
				});
			}
		},
		computed: {
			...mapState({
				clientList: 'clientList'
			})
		}
	};
</script>

<style lang="less" scoped>
.history {
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

.el-button + .el-button {
	margin-left: 0px;
	margin-top: 10px;
}
.btn-size .el-button {
	padding: 8px 12px;
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
.el-table {
	// display: table-cell !important;
}
</style>