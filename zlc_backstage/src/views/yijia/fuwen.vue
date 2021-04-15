<template>
	<div class="wenben">
		<el-card>
				<myQuillEditor :con="content" @getContent="getContent"></myQuillEditor>
				<el-button type="primary"  @click="sure">提交</el-button>
		</el-card>
		
	</div>
</template>

<script>
	import myQuillEditor from '@/components/myQuillEditor.vue'
	export default {
		data() {
			return {
				content:''
			}
		},
		components: {
			myQuillEditor,
			
		},
		created() {
			this.getlist()
		},
		methods: {
			async getlist() {
				let res = await this.$zcy.onePlusWriter()
				if (res.status == 1) {
					this.content = res.data

				}
			},
			getContent(val){
				this.content = val
			},
			async sure(){
				let res = await this.$zcy.updateWriter({content:this.content})
				if (res.status == 1) {
					this.$message.success('修改成功')
				}
			}
		}
	};
</script>

<style>
</style>
