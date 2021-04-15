<template>
	<div class="Screeningconditions">
		<el-button type="primary" @click="addMerberClick()">添加转换中心筛选条件</el-button>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="条件ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="搜索范围(小)" prop="xiao" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="搜索范围(大)" prop="da" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="xg">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;" >修改</el-button>
					<el-button type="primary" @click="lookClick(scope.row)" size="small" style="margin-left:10px;" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="is_show">
			<div class="mark-content">
				<div class="hytj" v-if="sjhjy ==0">添加转换中心筛选条件</div>
				<div class="hytj" v-if="sjhjy ==1">修改转换中心筛选条件</div>
		
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">搜索范围(大):</td>
							<td class="td2">
								<el-input v-model="submitform.big" size="small" clearable ></el-input>
								<!-- <el-input v-model="submitform.telphone" size="small" clearable v-if="sjhjy ==1" :disabled="true"></el-input> -->
		
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">搜索范围(小):</td>
							<td class="td2">
								<el-input v-model="submitform.small" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				is_show:false,
				sjhjy:0,
				submitform:{
					big:'',
					small:''
				},
				tabletwoData:[],
				type:1,
				id:''
			}
		},
		async created() {
			this.screen()
		},
		methods: {
			async screen(){
				const screen = await service.screen();
				if(screen.data.status==1){
					this.tabletwoData = screen.data.data
				}
			},
			//添加
			async addMerberClick(row){
				this.is_show = true
				this.type = 1
				this.sjhjy = 0
			},
			//修改
			modifyClick(row){
				this.is_show = true
				this.submitform.big = row.da
				this.submitform.small = row.xiao
				this.id =row.id
				this.type = 2
				this.sjhjy = 1
			},
			//删除
			lookClick(row){
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const delScreen = await service.delScreen({
						id: row.id,
					})
					if (delScreen.data.status == 1) {
						this.$message.success('删除成功');
						this.screen()
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//提交
			async onSubmitClick(row){
				if(this.type==1){
					if (this.submitform.big == '') {
						this.$message.error('请填写搜索范围(大)');
						return
					}
					if (this.submitform.small == '') {
						this.$message.error('请填写搜索范围(小)');
						return
					}
					const updateScreen =await service.updateScreen({
						id:"",
						xiao:this.submitform.small,
						da:this.submitform.big
					})
					if(updateScreen.data.status==1){
						this.$message.success('添加成功');
						this.is_show = false
						this.screen()
						this.submitform.big =""
						this.submitform.small = ''
					}else{
						this.$message.error(updateScreen.data.info);
					}
				}else if(this.type == 2){
					
					const updateScreen =await service.updateScreen({
						id:this.id,
						xiao:this.submitform.small,
						da:this.submitform.big
					})
					if(updateScreen.data.status==1){
						this.$message.success('添加成功');
						this.is_show = false
						this.screen()
					}else{
						this.$message.error(updateScreen.data.info);
					}
				}
			},
			//返回
			clone(){
				this.is_show = false
			},
		},
	}
</script>

<style>
</style>
