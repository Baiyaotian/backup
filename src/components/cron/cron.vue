<template >
	<div class="cron" :val="value_">
		<el-tabs v-model="activeName">
			<el-tab-pane label="秒" name="s">
				<second-and-minute v-model="sVal" lable="秒"></second-and-minute>
			</el-tab-pane>
			<el-tab-pane label="分" name="m">
				<second-and-minute v-model="mVal" lable="分"></second-and-minute>
			</el-tab-pane>
			<el-tab-pane label="时" name="h">
				<hour v-model="hVal" lable="时"></hour>
			</el-tab-pane>
			<el-tab-pane label="日" name="d">
				<day v-model="dVal" lable="日"></day>
			</el-tab-pane>
			<el-tab-pane label="月" name="month">
				<month v-model="monthVal" lable="月"></month>
			</el-tab-pane>
			<el-tab-pane label="周" name="week">
				<week v-model="weekVal" lable="周"></week>
			</el-tab-pane>
			<el-tab-pane label="年" name="year">
				<year v-model="yearVal" lable="年"></year>
			</el-tab-pane>
		</el-tabs>
		<!-- table -->
		<el-table :data="tableData" size="mini" border style="width: 100%;">
			<el-table-column prop="sVal" label="秒" width="70"></el-table-column>
			<el-table-column prop="mVal" label="分" width="70"></el-table-column>
			<el-table-column prop="hVal" label="时" width="70"></el-table-column>
			<el-table-column prop="dVal" label="日" width="70"></el-table-column>
			<el-table-column prop="monthVal" label="月" width="70"></el-table-column>
			<el-table-column prop="weekVal" label="周" width="70"></el-table-column>
			<el-table-column prop="yearVal" label="年"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	import SecondAndMinute from "./components/secondAndMinute";
	import hour from "./components/hour";
	import day from "./components/day";
	import month from "./components/month";
	import week from "./components/week";
	import year from "./components/year";
	export default {
		props: {
			value: {
				type: Object
			}
		},
		data() {
			return {
				activeName: "s",
				sVal: "0",
				mVal: "0",
				hVal: "0/1",
				dVal: "*",
				monthVal: "*",
				weekVal: "?",
				yearVal: "*"
			};
		},
		watch: {
			tableData: {
				doop: true,
				handler(newVal) {
					// console.log(newVal[0]);
					this.$emit("input", newVal[0]);
				}
			}
		},
		computed: {
			tableData() {
				return [
					{
						sVal: this.sVal ? this.sVal : "*",
						mVal: this.mVal ? this.mVal : "*",
						hVal: this.hVal ? this.hVal : "*",
						dVal: this.dVal ? this.dVal : "*",
						monthVal: this.monthVal ? this.monthVal : "*",
						weekVal: this.weekVal ? this.weekVal : "?",
						yearVal: this.yearVal ? this.yearVal : "*"
					}
				];
			},
			value_() {
				if (!this.dVal && !this.weekVal) {
					return "";
				}
				if (this.dVal === "?" && this.weekVal === "?") {
					this.$message.error("日期与星期不可以同时为“不指定”");
				}
				if (this.dVal !== "?" && this.weekVal !== "?") {
					this.$message.error("日期与星期必须有一个为“不指定”");
				}
				let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${
					this.monthVal
				} ${this.weekVal} ${this.yearVal}`;
				if (v !== this.value) {
					this.$emit("input");
				}
				return v;
			}
		},
		methods: {},
		components: {
			SecondAndMinute,
			hour,
			day,
			month,
			week,
			year
		}
	};
</script>

<style lang="css">
.cron {
	text-align: left;
	padding: 10px;
	background: #fff;
	border: 1px solid #dcdfe6;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>