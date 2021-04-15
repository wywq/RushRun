<template>
	<div class="urban_Information">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="城市名称:">
				<el-input v-model="searchform.cityname" placeholder="城市名称"></el-input>
			</el-form-item>
			<el-form-item label="城市活跃度:">
				<el-select v-model="searchform.sou" placeholder="请选择" style="width:150px"  :disabled='disabled1' @change="zhflclick">
					<el-option key="" label="全部" :value="qb"></el-option>
					<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="城市实名量:">
				<el-select v-model="searchform.sousuo" placeholder="请选择" style="width:150px" :disabled='disabled2' @change="smlclick">
					<el-option key="" label="全部" :value="qw"></el-option>
					<el-option v-for="item in sml" :key="item.value" :label="item.name" :value="item.id" >
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<!--表格 -->
		<el-table v-loading="loading" :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'} "
		 border style="margin-top:10px">
			<el-table-column label="城市名称" prop="chengshi_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="注册人数" prop="zhuce_num" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="实名认证人数" prop="shiming_num" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="总加成" prop="zongjiacheng" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="城市总活跃度" prop="huoyuedu_all" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="admin">
					<el-button type="primary" @click="lookClick(scope.row)" size="small" style="margin-left:10px;">查看活跃度(人)</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">查看活跃度(人)</div>
				<el-table  :data="list" :header-cell-style="{background:'#F9F9F9',color:'#606266'}"
				 border style="margin-top:10px">
					<el-table-column label="账号" prop="mobile" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="名字" prop="realname" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="基础活跃度" prop="jichuhuoyue" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="活跃度" prop="account_type_4" :resizable="false" align="center">
					</el-table-column>
				</el-table>
				<el-button type="primary" @click="clone" size="small" style="margin:20px 0 0 48%;">返回</el-button>
			</div>
		</div>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="Number(shujuData)"
			 :page-size="15">
			</el-pagination>
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
				show:false,
				submitform:{
					user:'',
					name:'',
					jhy:'',
					hy:''
				},
				list:[],
				shujuData:'',
				loading:true,
				searchform:{
					cityname:'',
					sou:'',
					sousuo:''
				},
				zhfl:[
					{
						value: '1',
						name: '顺序',
						id: 1
					},
					{
						value: '2',
						name: '倒序',
						id: 2
					},
				],
				sml:[
					{
						value: '1',
						name: '顺序',
						id: 1
					},
					{
						value: '2',
						name: '倒序',
						id: 2
					},
				],
				qb:'',
				qw:'',
				disabled1:false,
				disabled2:false,
			}
		},
		created() {
			this.cityxinxi(1)
			
		},
		methods: {
			zhflclick(){
				this.disabled1 = false
				this.disabled2 = true
			},
			smlclick(){
				this.disabled1 = true
				this.disabled2 = false
			},
			async cityxinxi(page){
				const cityxinxi = await service.cityxinxi({
					page:page,
					chengshi:this.searchform.cityname,
					huoquedu:this.searchform.sou,
					shiming:this.searchform.sousuo
				});
				if(cityxinxi.data.status == 1){
					this.loading = true
					this.shujuData = cityxinxi.data.data.num
					this.tabletwoData = cityxinxi.data.data.list
					this.loading = false
				}else{
					this.loading = false   
					this.$message.error(cityxinxi.data.info); 
				}
			},
			clone(){
				this.show = false
			},
			async lookClick(row){
				this.show = true
				// this.list = row.user
				const cityMemeber = await service.cityMemeber({
					city:row.chengshi_name
				})
				if(cityMemeber.data.status == 1){
					this.list = cityMemeber.data.data
				}
			},
			//搜索
			onSearchClick(){
				this.cityxinxi(1)
			},
			// 分页
			handleCurrentChange(val) {
				this.cityxinxi(val)
			},
		}
	}
</script>

<style>
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
