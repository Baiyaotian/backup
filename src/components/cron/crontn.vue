<template>
	<div id="crontn">
		<el-form :model="form" label-width="80px" style=" margin-bottom:0px;margin-left: -80px">
			<el-form-item>
				<cron v-model="criondata"></cron>
				<span style="color: #E6A23C; font-size: 12px;">cron从左到右（用空格隔开）：秒 分 小时 月份中的日期 月份 星期中的日期 年份</span>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import cron from "./cron";

	export default {
    props: {
      value:{
        type: String
      }
    },
		name: "App",
		components: {
			cron
		},
		watch: {
			criondata: {
				doop: true,
				handler(newVal) {
					if (newVal) {
						this.$emit("input", Object.values(newVal).join(" "));
					}
				}
      }
		},
		data() {
			return {
				showCronBox: false,
				criondata: {},
				form: {
					cronExpression: ""
				}
			};
    },
    mounted () {
      // console.log(this.cronVal)
    }
	};
</script>
