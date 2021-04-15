<template>
	<div class="team">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="会员账号:">
				<el-input v-model="formInline.user" placeholder="会员编号"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">搜索</el-button>
			</el-form-item>
		</el-form>
		<div class="content">
			<el-tree :load="onLoads" :data="data" :lazy="true" :props="defaultProps" node-key="id" ref="tree">
			</el-tree>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				data: null,
				defaultProps: {
					children: 'tuijian',
					label: 'phone_str'
				},
				formInline: {
					user: '',
					region: '',
				},
				teamtuijian: '',
				filterText: '',
				is_show: 0,
				isn_show: 0,
				teamtuijianren: '',
				resolve: null,
				tree_node: null,
			}
		},
		components: {},
		async created() {
			const that = this
			const teamtuijian = await service.teamtuijian({
				phone: ""
			})
			if (teamtuijian.data.status == 1) {
				teamtuijian.data.user.phone = teamtuijian.data.user.loginName;
				this.data = [teamtuijian.data.user]
				this.$message.success(teamtuijian.data.info);
			}else{
				this.$message.error(teamtuijian.data.info);
			}
		},
		watch: {

		},
		methods: {
			async onLoads(node, resolve) {
				if (node.level == 0) {
					const that = this
					const teamtuijian = await service.teamtuijian({
						phone: ""
					})
					if (teamtuijian.data.status == 1) {
						teamtuijian.data.user.phone = teamtuijian.data.user.loginName;
						this.data = [teamtuijian.data.user]
						this.$message.success(teamtuijian.data.info);
					}else{
						this.$message.error(teamtuijian.data.info);
					}
					
				} else {
					console.log(node)
					const teamtuijian = await service.teamtuijian({
						phone: node.data.mobile
					})
					if (teamtuijian.data.status == 1) {
						if (teamtuijian.data.user.tuijian == '') {
							console.log(111111)
						}
						teamtuijian.data.user.phone = teamtuijian.data.user.loginName;
						resolve(teamtuijian.data.user.tuijian);
						if(teamtuijian.data.user.tuijian == ''){
							this.$message({
								type: 'info',
								message: '暂无下线'
							});
						}
					} else {
						this.is_shown = 0
					}
				}
			},
			// 搜索
			async onSubmit() {
				this.data = []
				if(this.formInline.user){
					const teamtuijian = await service.teamtuijian({
						phone: this.formInline.user
					})
					if (teamtuijian.data.status == 1) {
						teamtuijian.data.user.phone = teamtuijian.data.user.loginName;
						this.data = [teamtuijian.data.user]
						this.$message.success(teamtuijian.data.info);
					}else{
						this.$message.error(teamtuijian.data.info);
					}
				}else{
					const teamtuijian = await service.teamtuijian({
						phone: ""
					})
					if (teamtuijian.data.status == 1) {
						teamtuijian.data.user.phone = teamtuijian.data.user.loginName;
						this.data = [teamtuijian.data.user]
						this.$message.success(teamtuijian.data.info);
					}else{
						this.$message.error(teamtuijian.data.info);
					}
					
				}
			},
		},

	}
</script>

<style scoped>
	.content {
		width: 100%;
		border: 1px solid #ccc;
		border-radius: 10px;
		background: #fff;
		padding:10px;
	}
</style>
