<template>
	<div class="cityList">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="城市搜索:">
				<el-input v-model="searchform.city" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="城市id" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="城市名称" prop="name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="身份证前三位" prop="idcard" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="合伙人名称" prop="hehuoren_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="modifyClick(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show1">
			<div class="mark-content">
				<div class="hytj">修改</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">身份证号前三位:</td>
							<td style="text-align: center;">
								<el-input v-model="submitform.idcard" size="small" clearable></el-input>
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
				tabletwoData:[],
				show1:false,
				submitform:{
					idcard:''
				},
				id:'',
				searchform:{
					city:''
				}
			}
		},
		async created() {
			this.cityXinxilist()
		},
		methods: {
			//列表
			async cityXinxilist(){
				const cityXinxilist = await service.cityXinxilist({
					city_name:this.searchform.city
				});
				if(cityXinxilist.data.status == 1){
					this.tabletwoData = cityXinxilist.data.data
					this.$message.success(cityXinxilist.data.info);
				}else{
					this.tabletwoData = cityXinxilist.data.data
					this.$message.error(cityXinxilist.data.info);
				}
			},
			//修改
			modifyClick(row){
				this.show1 = true
				this.id = row.id
				this.submitform.idcard = row.idcard
			},
			//提交
			async onSubmitClick(){
				const updateCity = await service.updateCity({
					id:this.id,
					idcard:this.submitform.idcard
				})
				if(updateCity.data.status == 1){
					this.show1 = false
					this.$message.success(updateCity.data.info);
					this.cityXinxilist()
				}else{
					this.$message.error(updateCity.data.info);
				}
			},
			//搜索
			onSearchClick(){
				this.cityXinxilist()
			},
			//返回
			clone(){
				this.show1 = false
			},
		},
	}
</script>

<style>
</style>
