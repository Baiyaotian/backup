<template>
	<div class="table" style="width:100%;height:100%">
		<!-- 上半部分 -->
		<!-- 对象储存集群 -->
		<h3>对象储存集群</h3>
		<el-table
			ref="multiplepointTable"
			:data="pointData"
			tooltip-effect="dark"
			style="width: 100% ;"
			@row-click="pointRowClcik"
		>
			<el-table-column prop="address" align="center" width="134px" label="地址" show-overflow-tooltip></el-table-column>
			<el-table-column prop="storageType" align="center" width="60px" label="类型" show-overflow-tooltip></el-table-column>
			<el-table-column align="center">
				<template slot="header" slot-scope="scope">
					<el-button
						size="small"
						type="primary"
						icon="el-icon-plus"
						@click="dialogFormVisiblebtm = true"
					></el-button>
				</template>
				<template slot-scope="scope">
					<el-button
						size="small"
						type="danger"
						icon="el-icon-delete"
						@click.native="removePoint(scope.row)"
					></el-button>
				</template>
			</el-table-column>
			<el-table-column width="1" type="expand">
				<template slot-scope="props">
					<el-row class="this-backgroundcol">
						<el-col>地址: {{ props.row.address }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>https: {{ props.row.https }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>名称: {{ props.row.displayName }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>类型: {{ props.row.storageType }}</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="增加对象存储集群" :visible.sync="dialogFormVisiblebtm">
			<addtablebuttom @resflesh-point="resClickbtm" v-model="dialogFormVisiblebtm"></addtablebuttom>
		</el-dialog>
		<h3>对象存储用户</h3>
		<el-table
			:data="tableData"
			tooltip-effect="dark"
			style="width: 100% ; "
			@row-click="tableRowClcik"
			ref="tableTable"
		>
			<el-table-column prop="username" align="center" label="用户名" width="59px"></el-table-column>
			<el-table-column prop="address" align="center" label="地址" show-overflow-tooltip width="134px"></el-table-column>
			<el-table-column align="center">
				<template slot="header" slot-scope="scope">
					<el-button
						size="small"
						type="primary"
						icon="el-icon-plus"
						@click="dialogFormVisiblemid = true"
					></el-button>
				</template>
				<template slot-scope="scope">
					<el-button
						size="small"
						type="danger"
						icon="el-icon-delete"
						@click.native="removeTenant(scope.row)"
					></el-button>
				</template>
			</el-table-column>
			<el-table-column width="1" type="expand">
				<template slot-scope="props">
					<el-row class="this-backgroundcol">
						<el-col>用户名: {{ props.row.username }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>accessKey: {{ props.row.accessKey }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>地址: {{ props.row.address }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>类型: {{ props.row.storageType===1 ? 'Ceph' : 'OBS' }}</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="增加对象存储用户" :visible.sync="dialogFormVisiblemid">
			<addtablemiddle @resflesh-tenant="resCickmid" v-model="dialogFormVisiblemid"></addtablemiddle>
		</el-dialog>
		<h3>备份客户端</h3>
		<el-dialog title="增加备份客户端" :visible.sync="dialogFormVisible">
			<addtabletop @resflesh-client="resClick" v-model="dialogFormVisible"></addtabletop>
		</el-dialog>
		<!-- 客户端 -->
		<el-table :data="clientData" style="width: 100%" @row-click="clientRowClcik" ref="clientTable">
			<el-table-column label="IP" prop="ip" align="center" width="130px"></el-table-column>
			<el-table-column label="主机名" prop="hostname" width="60px" show-overflow-tooltip></el-table-column>
			<el-table-column align="center">
				<template slot="header" slot-scope="scope">
					<el-button size="small" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
				</template>
				<template slot-scope="scope">
					<el-button
						size="small"
						type="danger"
						icon="el-icon-delete"
						@click.native="removeClient(scope.row)"
					></el-button>
				</template>
			</el-table-column>
			<el-table-column width="1" type="expand">
				<template slot-scope="props">
					<el-row class="this-backgroundcol">
						<el-col>主机名: {{ props.row.hostname }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>ip: {{ props.row.ip }}</el-col>
					</el-row>
					<el-row class="this-backgroundcol">
						<el-col>用户名: {{ props.row.username }}</el-col>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		endPoint,
		tenant,
		client,
		deleteClient,
		deletePonit,
		deleteTenant,
		usage
	} from "@/api/api";
	import { POINT_TYPE } from "@/utils/type";
	import addtabletop from "../components/addtabletop";
	import addtablemiddle from "../components/addtablemiddle";
	import addtablebuttom from "../components/addtablebuttom";
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				operateType: "add",
				tableData: [],
				pointData: [],
				multipleSelection: [],
				dialogFormVisible: false,
				dialogFormVisiblemid: false,
				dialogFormVisiblebtm: false,
				clientData: []
			};
		},
		components: { addtabletop, addtablemiddle, addtablebuttom },
		methods: {
      ...mapMutations([
        'setClient',
        'setPonint',
				'setTenant',
				'setUsages'
      ]),
			// 删除对象储存集群
			removePoint(item) {
				this.$confirm(
					"此操作将永久删除地址为 " + item.address + " 的集群, 是否继续?",
					"提示",
					{ type: "warning" }
				)
					.then(() => {
						deletePonit(btoa(item.address)).then(res => {
							this.getPoint();
						});
					})
					.catch(() => {
						this.$message.info("已取消操作!");
					});
			},
			// 删除备份客户端
			removeClient(item) {
				this.$confirm(
					"此操作将永久删除地址为 " + item.ip + " 的客户端, 是否继续?",
					"提示",
					{ confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"}
				).then(() => {
						deleteClient(item.ipv4)
							.then(res => {
								this.getClient();
							})
							.catch(err => {
								this.$message.error(err.message);
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
      },
      // 删除对象存储用户
			removeTenant(item) {
				this.$confirm(
					"此操作将永久删除用户名为 " +
						item.username +
						" 地址为" +
						item.address +
						" 的用户, 是否继续?",
					"提示",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
					.then(() => {
						deleteTenant(item.username, {
							endpoint: item.endpoint.address
						})
							.then(res => {
								this.getTenant();
								usage().then(res => {
									this.setUsages(res)
								}).catch(err => {
									this.$message.error(err.message)
								})
							})
							.catch(err => {
								this.$message.error(err.message);
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			//刷新Client信息表单
			resClick(status) {
				if (status) this.getClient();
			},
			resCickmid(status) {
				if (status) {
					this.getTenant();
					usage().then(res => {
					this.setUsages(res)
				}).catch(err => {
					this.$message.error(err.message)
				})
				}
			},
			resClickbtm(status) {
				if (status) this.getPoint();
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
			getClient() {
				client().then(res => {
					this.clientData = res.map(item => {
						return {
							...item,
							ip: this.intToip(item.ipv4)
						};
          });
          this.setClient(this.clientData)
				}).catch(err => {
          this.$message.error(err.message)
        })
			},
			getPoint() {
				endPoint().then(res => {
					this.pointData = res.map(item => {
						return {
							...item,
							storageType: POINT_TYPE[item.storageType]
						};
          });
          this.setPonint(this.pointData)
				});
			},
			getTenant() {
				tenant().then(res => {
					this.tableData = res.map(item => {
						return {
							...item,
							...item.endpoint,
							address: item.endpoint.address
						};
          });
          this.setTenant(this.tableData)
				});
			},
			clientRowClcik(row) {
				this.clientData.forEach(item => {
					if (row.ipv4 !== item.ipv4) {
						this.$refs.clientTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.clientTable.toggleRowExpansion(row);
			},
			tableRowClcik(row) {
				this.tableData.forEach(item => {
					if (row.index !== item.index) {
						this.$refs.tableTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.tableTable.toggleRowExpansion(row);
			},
			pointRowClcik(row) {
				this.pointData.forEach(item => {
					// console.log(item)
					if (row.index !== item.index) {
						this.$refs.multiplepointTable.toggleRowExpansion(item, false);
					}
				});
				this.$refs.multiplepointTable.toggleRowExpansion(row);
			}
		},

		mounted() {
			this.getClient();
			this.getPoint();
			this.getTenant();
		}
	};
</script>

<style lang="less" scoped>
.el-button--small,
.el-button--small.is-round {
	padding: 6px 6px;
}
.el-icon-info {
	font-size: 25px;
	color: #67c23a;
}
h3 {
	height: 40px;
	line-height: 40px;
	background-color: #e4e7ed;
	text-align: center;
}

</style>