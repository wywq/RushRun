<template>
	<div>
		<el-card>
			<el-button type="success" size="small" @click="$emit('close')">返回</el-button>
		</el-card>
		<el-card>
			<el-steps :active="2" align-center  finish-status="success">
			  <el-step title="买家下单" description="这是一段很长很长很长的描述性文字" ></el-step>
			  <el-step title="卖家付款" description="这是一段很长很长很长的描述性文字"></el-step>
			  <el-step title="商家发货" description="这是一段很长很长很长的描述性文字"></el-step>
			  <el-step title="交易完成" description="这是一段很长很长很长的描述性文字"></el-step>
			</el-steps>
		</el-card>
	</div>
</template>

<script>
	export default {
		props:['order_id'],
		data() {
			return {
				
			}
		},
		components: {
		},
		async created() {
			let res = await this.$zcy.logisticsView({order_id:this.order_id})
			console.log(res)
			// if(res.)
		},
		methods: {
			
		}
	};
</script>

<style>
</style>
